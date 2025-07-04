
'use server';

import { formatISO, parseISO, format, startOfMonth, getDaysInMonth, addDays, getYear, getMonth } from 'date-fns';
import { db } from '@/lib/firebase-admin-init';
import { FieldValue } from 'firebase-admin/firestore';

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

export async function getDynamicAvailabilityRules(): Promise<DynamicAvailabilityRules> {
  console.log('[ScheduleManager getDynamicAvailabilityRules] CALLED.');
  try {
    const snapshot = await db.collection("availability_rules").get();
    const rules: DynamicAvailabilityRules = {};
    snapshot.docs.forEach(doc => {
      rules[doc.id] = doc.data() as RuleDetails;
    });
    console.log('[ScheduleManager getDynamicAvailabilityRules] INFO: Returning current rules. Count:', Object.keys(rules).length);
    return rules;
  } catch (error) {
    console.error('[ScheduleManager getDynamicAvailabilityRules] ERROR fetching rules:', error);
    return {};
  }
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
    await db.collection("availability_rules").doc(dateISO).set(newRuleDetails);

    console.log(`[ScheduleManager updateDynamicAvailabilityRule] SUCCESS: Rule for ${dateISO} updated by ${adminEmail}.`);
    return { success: true, message: `Regra para ${dateISO} atualizada.` };
  } catch (error) {
    console.error('[ScheduleManager updateDynamicAvailabilityRule] ERROR:', error);
    return { success: false, message: 'Erro interno ao atualizar regra.' };
  }
}

export async function deleteDynamicAvailabilityRule(dateISO: string): Promise<{ success: boolean; message: string }> {
  console.log(`[ScheduleManager deleteDynamicAvailabilityRule] CALLED for date: ${dateISO}`);
  try {
    await db.collection("availability_rules").doc(dateISO).delete();
    console.log(`[ScheduleManager deleteDynamicAvailabilityRule] SUCCESS: Rule for ${dateISO} deleted.`);
    return { success: true, message: `Regra para ${dateISO} removida.` };
  } catch (error) {
    console.error('[ScheduleManager deleteDynamicAvailabilityRule] ERROR:', error);
    return { success: false, message: 'Erro interno ao deletar regra.' };
  }
}

export async function getUnavailableSlotsForDate(dateISO: string): Promise<string[]> {
  console.log(`[ScheduleManager getUnavailableSlotsForDate] CALLED for dateISO: ${dateISO}`);
  let unavailableDueToRule: string[] = [];
  let alreadyBookedForDate: string[] = [];
  
  try {
    const ruleDoc = await db.collection("availability_rules").doc(dateISO).get();
    const ruleDetailsForDate = ruleDoc.data() as RuleDetails | undefined;
    console.log(`[ScheduleManager getUnavailableSlotsForDate] Firestore ruleDoc for ${dateISO}:`, ruleDetailsForDate);

    const bookedDoc = await db.collection("booked_slots").doc(dateISO).get();
    if (bookedDoc.exists) {
      alreadyBookedForDate = bookedDoc.data()?.times || [];
    }
    console.log(`[ScheduleManager getUnavailableSlotsForDate] Firestore bookedDoc for ${dateISO}:`, alreadyBookedForDate);

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

    await db.collection("booked_slots").doc(dateISO).set({
      times: FieldValue.arrayUnion(time)
    }, { merge: true });
    
    console.log(`[ScheduleManager attemptToBookSlot] SUCCESS: Booked ${time} for ${dateISO}.`);
    return true;
  } catch (error) {
    console.error(`[ScheduleManager attemptToBookSlot] ERROR for dateISO ${dateISO}, time ${time}:`, error);
    return false;
  }
}

export async function resetAllDataForPrototyping(): Promise<void> {
  console.log('[ScheduleManager resetAllDataForPrototyping] CALLED. Resetting all booked slots and re-initializing rules from JSON...');
  try {
    // Em produção, isso limparia as coleções. Em desenvolvimento, limparia o globalThis.
    // Para prototipagem, podemos limpar as coleções de teste.
    if (process.env.NODE_ENV === 'development') {
      // Limpar globalThis para desenvolvimento
      const g = globalThis as any;
      if (g._astroyaDynamicAvailabilityRulesStore) delete g._astroyaDynamicAvailabilityRulesStore;
      if (g._astroyaBookedSlotsStore) delete g._astroyaBookedSlotsStore;
    }
    // Em produção, você precisaria de uma função de admin para limpar o Firestore
    console.log('[ScheduleManager resetAllDataForPrototyping] SUCCESS: Reset complete (Firestore not cleared by this function in production).');
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
    
    console.log(`[ScheduleManager getMonthlyAvailabilitySummary] Checking day: ${dateISO}`);
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
