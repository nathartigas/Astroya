
'use server';

import initialAvailabilityRulesData from '@/config/availability-rules.json';
import { formatISO, parseISO, format, startOfMonth, getDaysInMonth, addDays, getYear, getMonth } from 'date-fns';

console.log('--- [ScheduleManager MODULE LOAD] schedule-manager.ts module is being loaded ---');

export interface RuleDetails {
  rule: string[] | 'UNAVAILABLE';
  updatedBy?: string; // email of the admin
  updatedAt?: string; // ISO string timestamp
}

export interface DynamicAvailabilityRules {
  [dateISO: string]: RuleDetails;
}

const BASE_AVAILABLE_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

// --- HMR Resilient Storage for Development ---
interface GlobalWithSchedulerState {
  _astroyaDynamicAvailabilityRulesStore?: DynamicAvailabilityRules;
  _astroyaBookedSlotsStore?: Record<string, string[]>;
}
const g = globalThis as unknown as GlobalWithSchedulerState;

let dynamicAvailabilityRules: DynamicAvailabilityRules;
let bookedSlots: Record<string, string[]>;

// Function to initialize/reset dynamic rules from the JSON file
function initializeRulesFromJSON() {
  console.log('[ScheduleManager initializeRulesFromJSON] CALLED. Populating from availability-rules.json...');
  let initializedRules: DynamicAvailabilityRules = {};
  try {
    const rulesFromFile = (initialAvailabilityRulesData as any).PREDEFINED_AVAILABILITY_RULES || {};
    for (const dateISO in rulesFromFile) {
      if (Object.prototype.hasOwnProperty.call(rulesFromFile, dateISO)) {
        const ruleValue = rulesFromFile[dateISO];
        if (ruleValue === 'UNAVAILABLE' || (Array.isArray(ruleValue) && ruleValue.every(item => typeof item === 'string'))) {
          initializedRules[dateISO] = {
            rule: ruleValue,
            updatedBy: 'system (json_init)',
            updatedAt: formatISO(new Date()),
          };
        } else {
            console.warn(`[ScheduleManager initializeRulesFromJSON] WARN: Invalid rule format for date ${dateISO} in JSON. Skipping. Rule:`, ruleValue);
        }
      }
    }
  } catch (error) {
    console.error('[ScheduleManager initializeRulesFromJSON] ERROR parsing availability-rules.json or initializing:', error);
    initializedRules = {}; // Fallback to empty if JSON is malformed
  }
  dynamicAvailabilityRules = initializedRules;
  console.log('[ScheduleManager initializeRulesFromJSON] FINISHED. Current dynamicAvailabilityRules count:', Object.keys(dynamicAvailabilityRules).length);
}

if (process.env.NODE_ENV === 'production') {
  console.log('[ScheduleManager PROD_MODE] Initializing stores for production.');
  dynamicAvailabilityRules = {};
  bookedSlots = {};
  initializeRulesFromJSON();
} else {
  if (!g._astroyaDynamicAvailabilityRulesStore) {
    console.log('[ScheduleManager DEV_HMR] Initializing _astroyaDynamicAvailabilityRulesStore on globalThis for the first time.');
    dynamicAvailabilityRules = {}; 
    initializeRulesFromJSON();    
    g._astroyaDynamicAvailabilityRulesStore = dynamicAvailabilityRules; 
  } else {
    console.log('[ScheduleManager DEV_HMR] Reusing _astroyaDynamicAvailabilityRulesStore from globalThis.');
    dynamicAvailabilityRules = g._astroyaDynamicAvailabilityRulesStore;
  }

  if (!g._astroyaBookedSlotsStore) {
    console.log('[ScheduleManager DEV_HMR] Initializing _astroyaBookedSlotsStore on globalThis.');
    bookedSlots = {};
    g._astroyaBookedSlotsStore = bookedSlots; 
  } else {
    console.log('[ScheduleManager DEV_HMR] Reusing _astroyaBookedSlotsStore from globalThis.');
    bookedSlots = g._astroyaBookedSlotsStore;
  }
}

export async function getDynamicAvailabilityRules(): Promise<DynamicAvailabilityRules> {
  console.log('[ScheduleManager getDynamicAvailabilityRules] CALLED.');
  console.log('[ScheduleManager getDynamicAvailabilityRules] INFO: Returning current rules. Count:', Object.keys(dynamicAvailabilityRules).length);
  return JSON.parse(JSON.stringify(dynamicAvailabilityRules));
}

export async function updateDynamicAvailabilityRule(
  dateISO: string,
  rule: string[] | 'UNAVAILABLE',
  adminEmail: string | null
): Promise<{ success: boolean; message: string }> {
  console.log(`[ScheduleManager updateDynamicAvailabilityRule] CALLED for date: ${dateISO}, rule:`, rule, `by admin: ${adminEmail}`);
  try {
    if (!dateISO || rule === undefined) {
      console.warn('[ScheduleManager updateDynamicAvailabilityRule] WARN: Date or rule is missing.');
      return { success: false, message: 'Data e regra são obrigatórias.' };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) {
      console.warn(`[ScheduleManager updateDynamicAvailabilityRule] WARN: Invalid date format for ${dateISO}.`);
      return { success: false, message: 'Formato de data inválido. Use YYYY-MM-DD.' };
    }
    if (!adminEmail) {
      console.warn('[ScheduleManager updateDynamicAvailabilityRule] WARN: Admin email is missing. Rule not saved.');
      return { success: false, message: 'Usuário administrador não identificado. Regra não salva.' };
    }

    const newRuleDetails: RuleDetails = {
        rule: rule,
        updatedBy: adminEmail,
        updatedAt: formatISO(new Date()),
    };
    dynamicAvailabilityRules[dateISO] = newRuleDetails;
    
    if (process.env.NODE_ENV !== 'production' && g._astroyaDynamicAvailabilityRulesStore) {
         g._astroyaDynamicAvailabilityRulesStore[dateISO] = newRuleDetails;
    }

    console.log(`[ScheduleManager updateDynamicAvailabilityRule] SUCCESS: Rule for ${dateISO} updated by ${adminEmail}.`);
    console.log(`[ScheduleManager updateDynamicAvailabilityRule] INFO: dynamicAvailabilityRules state for ${dateISO} after update:`, dynamicAvailabilityRules[dateISO]);
    return { success: true, message: `Regra para ${dateISO} atualizada.` };
  } catch (error) {
    console.error('[ScheduleManager updateDynamicAvailabilityRule] ERROR:', error);
    return { success: false, message: 'Erro interno ao atualizar regra.' };
  }
}

export async function deleteDynamicAvailabilityRule(dateISO: string): Promise<{ success: boolean; message: string }> {
  console.log(`[ScheduleManager deleteDynamicAvailabilityRule] CALLED for date: ${dateISO}`);
  try {
    if (dynamicAvailabilityRules.hasOwnProperty(dateISO)) {
      delete dynamicAvailabilityRules[dateISO];
      if (process.env.NODE_ENV !== 'production' && g._astroyaDynamicAvailabilityRulesStore && g._astroyaDynamicAvailabilityRulesStore.hasOwnProperty(dateISO)) {
        delete g._astroyaDynamicAvailabilityRulesStore[dateISO];
      }
      console.log(`[ScheduleManager deleteDynamicAvailabilityRule] SUCCESS: Rule for ${dateISO} deleted.`);
      return { success: true, message: `Regra para ${dateISO} removida.` };
    }
    console.warn(`[ScheduleManager deleteDynamicAvailabilityRule] WARN: No rule found to delete for ${dateISO}.`);
    return { success: false, message: `Nenhuma regra encontrada para ${dateISO}.` };
  } catch (error) {
    console.error('[ScheduleManager deleteDynamicAvailabilityRule] ERROR:', error);
    return { success: false, message: 'Erro interno ao deletar regra.' };
  }
}

export async function getUnavailableSlotsForDate(dateISO: string): Promise<string[]> {
  console.log(`[ScheduleManager getUnavailableSlotsForDate] CALLED for dateISO: ${dateISO}`);
  let unavailableDueToRule: string[] = [];
  const alreadyBookedForDate: string[] = bookedSlots[dateISO] || [];
  
  try {
    const ruleDetailsForDate = dynamicAvailabilityRules[dateISO];

    if (ruleDetailsForDate) {
      console.log(`[ScheduleManager getUnavailableSlotsForDate] INFO: Rule details FOUND for ${dateISO}:`, ruleDetailsForDate);
      const { rule: currentRuleValue } = ruleDetailsForDate;

      if (currentRuleValue === 'UNAVAILABLE') {
        unavailableDueToRule = [...BASE_AVAILABLE_TIMES];
        console.log(`[ScheduleManager getUnavailableSlotsForDate] INFO: Rule is UNAVAILABLE for ${dateISO}. All base times are unavailable due to rule.`);
      } else if (Array.isArray(currentRuleValue) && currentRuleValue.every(item => typeof item === 'string')) {
        unavailableDueToRule = BASE_AVAILABLE_TIMES.filter(time => !currentRuleValue.includes(time));
        console.log(`[ScheduleManager getUnavailableSlotsForDate] INFO: Specific times rule for ${dateISO}: ${currentRuleValue.join(', ')}. Unavailable due to this rule: ${unavailableDueToRule.join(', ')}`);
      } else {
          console.warn(`[ScheduleManager getUnavailableSlotsForDate] WARN: Unexpected rule format for date ${dateISO}. Rule:`, currentRuleValue, ". Treating as no specific rule restrictions.");
      }
    } else {
      console.log(`[ScheduleManager getUnavailableSlotsForDate] INFO: No specific dynamic rule FOUND for ${dateISO}. Only booked slots will make times unavailable.`);
    }
    
    const allUnavailableSlots = Array.from(new Set([...unavailableDueToRule, ...alreadyBookedForDate]));
    allUnavailableSlots.sort(); 

    console.log(`[ScheduleManager getUnavailableSlotsForDate] SUCCESS: Final allUnavailableSlots for ${dateISO} before returning:`, allUnavailableSlots);
    return allUnavailableSlots;
  } catch (error) {
    console.error(`[ScheduleManager getUnavailableSlotsForDate] ERROR for dateISO ${dateISO}:`, error);
    return [...BASE_AVAILABLE_TIMES]; 
  }
}

export async function attemptToBookSlot(dateISO: string, time: string): Promise<boolean> {
  console.log(`[ScheduleManager attemptToBookSlot] CALLED for dateISO: ${dateISO}, time: ${time}`);
  try {
    const unavailableSlots = await getUnavailableSlotsForDate(dateISO); 

    if (unavailableSlots.includes(time)) {
      console.warn(`[ScheduleManager attemptToBookSlot] WARN: Slot ${time} on ${dateISO} is unavailable. Cannot book.`);
      return false;
    }

    if (bookedSlots[dateISO] && bookedSlots[dateISO].includes(time)) {
       console.warn(`[ScheduleManager attemptToBookSlot] WARN: Slot ${time} on ${dateISO} is already in bookedSlots. Cannot book again.`);
       return false;
    }

    if (!bookedSlots[dateISO]) {
      bookedSlots[dateISO] = [];
    }
    
    bookedSlots[dateISO].push(time);
    bookedSlots[dateISO].sort();
    
    if (process.env.NODE_ENV !== 'production' && g._astroyaBookedSlotsStore) {
        g._astroyaBookedSlotsStore[dateISO] = bookedSlots[dateISO];
    }
    console.log(`[ScheduleManager attemptToBookSlot] SUCCESS: Booked ${time} for ${dateISO}. Current bookedSlots for date:`, bookedSlots[dateISO]);
    return true;
  } catch (error) {
    console.error(`[ScheduleManager attemptToBookSlot] ERROR for dateISO ${dateISO}, time ${time}:`, error);
    return false;
  }
}

export async function resetAllDataForPrototyping(): Promise<void> {
  console.log('[ScheduleManager resetAllDataForPrototyping] CALLED. Resetting all booked slots and re-initializing rules from JSON...');
  try {
    bookedSlots = {};
    dynamicAvailabilityRules = {}; 

    initializeRulesFromJSON(); 

    if (process.env.NODE_ENV !== 'production') {
      g._astroyaBookedSlotsStore = bookedSlots; 
      g._astroyaDynamicAvailabilityRulesStore = dynamicAvailabilityRules; 
      console.log('[ScheduleManager resetAllDataForPrototyping] DEV_HMR: Stores reset on globalThis.');
    }
    console.log('[ScheduleManager resetAllDataForPrototyping] SUCCESS: Reset complete.');
  } catch (error) {
    console.error('[ScheduleManager resetAllDataForPrototyping] ERROR:', error);
  }
}

export async function getMonthlyAvailabilitySummary(year: number, month: number): Promise<string[]> {
  console.log(`[ScheduleManager getMonthlyAvailabilitySummary] CALLED for Year: ${year}, Month: ${month} (1-indexed)`);
  const fullyUnavailableDateISOStrings: string[] = [];
  
  // Ensure month is 0-indexed for Date constructor
  const startDate = startOfMonth(new Date(year, month - 1, 1));
  const daysInMonth = getDaysInMonth(startDate);

  console.log(`[ScheduleManager getMonthlyAvailabilitySummary] Processing ${daysInMonth} days for ${format(startDate, 'MMMM yyyy')}`);

  for (let i = 0; i < daysInMonth; i++) {
    const currentDate = addDays(startDate, i);
    const dateISO = format(currentDate, 'yyyy-MM-dd');
    
    // console.log(`[ScheduleManager getMonthlyAvailabilitySummary] Checking day: ${dateISO}`);
    const unavailableSlotsForDay = await getUnavailableSlotsForDate(dateISO);
    
    if (unavailableSlotsForDay.length >= BASE_AVAILABLE_TIMES.length) {
      // Check if all base times are in the unavailable list
      const allBaseTimesUnavailable = BASE_AVAILABLE_TIMES.every(baseTime => unavailableSlotsForDay.includes(baseTime));
      if (allBaseTimesUnavailable) {
        // console.log(`[ScheduleManager getMonthlyAvailabilitySummary] Day ${dateISO} is fully unavailable.`);
        fullyUnavailableDateISOStrings.push(dateISO);
      }
    }
  }
  console.log(`[ScheduleManager getMonthlyAvailabilitySummary] SUCCESS: Found ${fullyUnavailableDateISOStrings.length} fully unavailable days in ${format(startDate, 'MMMM yyyy')}.`);
  return fullyUnavailableDateISOStrings;
}
