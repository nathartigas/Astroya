
"use client";

import { useState, type ReactNode, useEffect, useCallback } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, getMonth, getYear } from "date-fns";
import { ptBR } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, CalendarIcon, Building, Globe, Target, CheckSquare, Rocket, Clock, Mail, User, Loader2 } from "lucide-react";
import { cn } from '@/lib/utils';
import { sendConsultationEmailAction } from '@/app/actions/send-consultation-email';
import { getUnavailableSlotsForDate, getMonthlyAvailabilitySummary } from '@/app/actions/schedule-manager';

const availableTimesBase = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
];

const consultationFormSchema = z.object({
  clientName: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  companyName: z.string().min(2, { message: "Nome da empresa deve ter pelo menos 2 caracteres." }),
  clientEmail: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  companyWebsite: z.string().url({ message: "Por favor, insira uma URL válida." }).optional().or(z.literal("")),
  mainChallenge: z.string().min(10, { message: "Descreva o desafio em pelo menos 10 caracteres." }).max(300, { message: "Máximo de 300 caracteres."}),
  targetAudience: z.string().min(5, { message: "Descreva o público-alvo em pelo menos 5 caracteres." }).max(200, { message: "Máximo de 200 caracteres."}),
  serviceLandingPage: z.boolean().optional(),
  serviceSEO: z.boolean().optional(),
  serviceMaintenance: z.boolean().optional(),
  preferredDate: z.date({ required_error: "Por favor, selecione uma data." }),
  preferredTime: z.string({ required_error: "Por favor, selecione um horário."}),
}).refine(data => data.serviceLandingPage || data.serviceSEO || data.serviceMaintenance, {
  message: "Selecione ao menos um serviço de interesse.",
  path: ["serviceLandingPage"],
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

interface ConsultationModalProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConsultationModal({ children, open, onOpenChange }: ConsultationModalProps) {
  const { toast } = useToast();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [actuallyAvailableTimes, setActuallyAvailableTimes] = useState<string[]>([]);
  
  const [fullyUnavailableDatesISO, setFullyUnavailableDatesISO] = useState<Set<string>>(new Set());
  const [currentCalendarView, setCurrentCalendarView] = useState(new Date()); 
  const [loadingInitialAvailability, setLoadingInitialAvailability] = useState(false);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      clientName: "",
      companyName: "",
      clientEmail: "",
      companyWebsite: "",
      mainChallenge: "",
      targetAudience: "",
      serviceLandingPage: false,
      serviceSEO: false,
      serviceMaintenance: false,
      preferredTime: "",
    },
  });

  const selectedDate = form.watch("preferredDate");

  const fetchAndSetTimesForDate = useCallback(async () => {
    if (selectedDate) {
      setLoadingTimes(true);
      form.setValue('preferredTime', ''); 
      try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        console.log(`[ConsultationModal fetchAndSetTimesForDate] CALLED for date: ${dateStr}`);
        const unavailableSlots = await getUnavailableSlotsForDate(dateStr);
        console.log(`[ConsultationModal fetchAndSetTimesForDate] Received unavailableSlots for ${dateStr}:`, unavailableSlots);

        const currentAvailable = availableTimesBase.filter(time => !unavailableSlots.includes(time));
        setActuallyAvailableTimes(currentAvailable);
        console.log(`[ConsultationModal fetchAndSetTimesForDate] Calculated actuallyAvailableTimes for ${dateStr}:`, currentAvailable);

      } catch (error) {
        console.error("[ConsultationModal fetchAndSetTimesForDate] Erro ao buscar horários: ", error);
        setActuallyAvailableTimes([...availableTimesBase]);
        toast({
          title: "Erro ao carregar horários",
          description: "Não foi possível verificar os horários para esta data. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoadingTimes(false);
        console.log(`[ConsultationModal fetchAndSetTimesForDate] FINISHED for date: ${selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'null'}`);
      }
    } else {
      setActuallyAvailableTimes([]);
      form.setValue('preferredTime', '');
    }
  }, [selectedDate, toast, form]);

  useEffect(() => {
    fetchAndSetTimesForDate();
  }, [fetchAndSetTimesForDate]);

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      console.log(`[ConsultationModal fetchMonthlySummary] CALLED for month: ${getMonth(currentCalendarView) + 1}, year: ${getYear(currentCalendarView)}`);
      setLoadingInitialAvailability(true);
      try {
        const year = getYear(currentCalendarView);
        const month = getMonth(currentCalendarView) + 1; 
        const unavailableDates = await getMonthlyAvailabilitySummary(year, month);
        console.log(`[ConsultationModal fetchMonthlySummary] Received ${unavailableDates.length} fully unavailable dates for ${month}/${year}.`);
        setFullyUnavailableDatesISO(new Set(unavailableDates));
      } catch (error) {
        console.error("[ConsultationModal fetchMonthlySummary] Erro ao buscar resumo mensal de disponibilidade:", error);
        toast({
          title: "Erro ao carregar calendário",
          description: "Não foi possível carregar a disponibilidade completa do mês.",
          variant: "destructive",
        });
      } finally {
        setLoadingInitialAvailability(false);
        console.log(`[ConsultationModal fetchMonthlySummary] FINISHED for month: ${getMonth(currentCalendarView) + 1}, year: ${getYear(currentCalendarView)}`);
      }
    };
    if(open) { 
        fetchMonthlySummary();
    }
  }, [currentCalendarView, toast, open]);

  const handleMonthChange = (newMonthDate: Date) => {
    console.log("[ConsultationModal handleMonthChange] New month selected:", newMonthDate);
    setCurrentCalendarView(newMonthDate);
    if (selectedDate && (getYear(selectedDate) !== getYear(newMonthDate) || getMonth(selectedDate) !== getMonth(newMonthDate))) {
        form.resetField('preferredDate');
        form.resetField('preferredTime');
        setActuallyAvailableTimes([]);
    }
  };


  async function onSubmit(values: ConsultationFormValues) {
    try {
      const dateStr = format(values.preferredDate, 'yyyy-MM-dd');
      console.log(`[ConsultationModal onSubmit] Initial check for ${dateStr} ${values.preferredTime}`);
      const currentUnavailableSlotsCheck = await getUnavailableSlotsForDate(dateStr);
      if (currentUnavailableSlotsCheck.includes(values.preferredTime)) {
        toast({
          title: "Horário Indisponível",
          description: "Este horário foi reservado ou tornou-se indisponível enquanto você preenchia. Por favor, escolha outro.",
          variant: "destructive",
        });
        await fetchAndSetTimesForDate(); 
        return;
      }

      console.log(`[ConsultationModal onSubmit] Calling sendConsultationEmailAction with values:`, values);
      const result = await sendConsultationEmailAction(values);
      console.log(`[ConsultationModal onSubmit] Result from sendConsultationEmailAction:`, result);

      if (result.success) {
        toast({
          title: "Agendamento Solicitado!",
          description: result.message,
          variant: "default",
        });
        form.reset();
        setActuallyAvailableTimes([]); 
        setFullyUnavailableDatesISO(new Set()); 
        setCurrentCalendarView(new Date()); 
        onOpenChange(false);
      } else {
        toast({
          title: "Erro no Agendamento",
          description: result.message,
          variant: "destructive",
        });
        await fetchAndSetTimesForDate(); 
      }
    } catch (error) {
      console.error("[ConsultationModal onSubmit] Error submitting consultation:", error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  }
  
  const getSelectPlaceholder = () => {
    if (!selectedDate) return "Selecione uma data primeiro";
    if (loadingTimes) return "Carregando horários...";
    if (actuallyAvailableTimes.length === 0 && !loadingTimes) return "Nenhum horário disponível"; // Added !loadingTimes check
    return "Selecione um horário";
  };
  
  const isDateDisabled = (date: Date): boolean => {
    if (date < new Date(new Date().setDate(new Date().getDate() -1))) return true; 
    const dateISO = format(date, 'yyyy-MM-dd');
    return fullyUnavailableDatesISO.has(dateISO);
  };


  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) { 
            form.reset();
            setActuallyAvailableTimes([]);
            setFullyUnavailableDatesISO(new Set());
            setCurrentCalendarView(new Date());
            setCalendarOpen(false);
        } else { 
            setCurrentCalendarView(new Date()); 
        }
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 bg-card/80 rounded-t-lg">
          <DialogTitle className="text-2xl font-headline gradient-text-animated flex items-center">
            <Briefcase className="mr-3 h-7 w-7 text-primary" />
            Agende sua Consultoria Estratégica Gratuita
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
            Preencha o formulário abaixo para entendermos suas necessidades e agendarmos um horário.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <fieldset disabled={form.formState.isSubmitting || loadingTimes || loadingInitialAvailability} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground/90"><User className="mr-2 h-4 w-4 text-primary" />Seu Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome Completo" {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground/90"><Mail className="mr-2 h-4 w-4 text-primary" />Seu E-mail para Contato</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu.email@exemplo.com" {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground/90"><Building className="mr-2 h-4 w-4 text-primary" />Nome da Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Sua Empresa Inc." {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground/90"><Globe className="mr-2 h-4 w-4 text-primary" />Website da Empresa (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://suaempresa.com.br" {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mainChallenge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-foreground/90"><Rocket className="mr-2 h-4 w-4 text-primary" />Principal Desafio/Objetivo</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ex: Aumentar leads, melhorar conversões, nova presença online..." {...field} className="min-h-[80px] bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-foreground/90"><Target className="mr-2 h-4 w-4 text-primary" />Público-Alvo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Pequenas empresas de tecnologia, profissionais liberais..." {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="flex items-center text-foreground/90"><CheckSquare className="mr-2 h-4 w-4 text-primary" />Serviços de Interesse</FormLabel>
                <div className="space-y-2 pt-1">
                  {[
                    { id: "serviceLandingPage", label: "Criação de Landing Pages de Alta Conversão" },
                    { id: "serviceSEO", label: "Otimização SEO para Melhor Visibilidade" },
                    { id: "serviceMaintenance", label: "Manutenção Contínua e Suporte Técnico" },
                  ].map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name={item.id as keyof ConsultationFormValues}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value as boolean | undefined}
                              onCheckedChange={field.onChange}
                              className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-foreground/80">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                 <FormMessage>{form.formState.errors.serviceLandingPage?.message}</FormMessage>
              </FormItem>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center text-foreground/90"><CalendarIcon className="mr-2 h-4 w-4 text-primary" />Data Preferida</FormLabel>
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 hover:bg-accent/50 focus:border-primary",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ptBR })
                              ) : (
                                <span>Escolha uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          {loadingInitialAvailability && (
                             <div className="flex items-center justify-center p-10">
                               <Loader2 className="h-6 w-6 animate-spin text-primary" />
                               <span className="ml-2 text-sm">Carregando disponibilidade...</span>
                             </div>
                          )}
                          {!loadingInitialAvailability && (
                              <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date: Date | undefined) => {
                                  if (date) {
                                      field.onChange(date);
                                  }
                                  setCalendarOpen(false);
                              }}
                              disabled={isDateDisabled}
                              initialFocus
                              locale={ptBR}
                              month={currentCalendarView}
                              onMonthChange={handleMonthChange}
                              fromDate={new Date()}
                              />
                          )}
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground/90">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        Horário Preferido
                        {loadingTimes && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                      </FormLabel>
                      <Select
                        key={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'no-date-key'}
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedDate || loadingTimes || (actuallyAvailableTimes.length === 0 && !!selectedDate && !loadingTimes) }
                      >
                        <FormControl>
                          <SelectTrigger className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary">
                             <SelectValue placeholder={getSelectPlaceholder()} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover text-popover-foreground">
                          {actuallyAvailableTimes.length > 0 ? (
                              actuallyAvailableTimes.map(time => (
                                <SelectItem
                                  key={`${selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'no-date'}-${time}`} 
                                  value={time}
                                >
                                  {time}
                                </SelectItem>
                              ))
                            ) : (
                               selectedDate && !loadingTimes && 
                                  <SelectItem value="no-slots" disabled key="no-slots-item">
                                    {getSelectPlaceholder()}
                                  </SelectItem>
                            )
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full sm:w-auto" disabled={form.formState.isSubmitting || loadingTimes || loadingInitialAvailability}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full sm:w-auto gradient-bg text-primary-foreground font-semibold hover:opacity-90"
                disabled={form.formState.isSubmitting || loadingTimes || loadingInitialAvailability || !form.formState.isValid || !form.getValues("preferredTime") || (actuallyAvailableTimes.length === 0 && !!selectedDate && !loadingTimes)}
              >
                {(form.formState.isSubmitting || loadingTimes || loadingInitialAvailability) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {(loadingInitialAvailability || loadingTimes) ? "Verificando..." : "Enviando..."}
                  </>
                ) : (
                  "Solicitar Consultoria"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


