
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Loader2, CalendarX2, CalendarCheck2, UserCircle, Clock } from "lucide-react";
import type { DynamicAvailabilityRules, RuleDetails } from "@/app/actions/schedule-manager";
import { deleteDynamicAvailabilityRule } from "@/app/actions/schedule-manager";
import { useState } from "react";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AvailabilityListProps {
  rules: DynamicAvailabilityRules;
  onRuleDeleted: () => void;
  onEditRule: (dateISO: string, ruleDetails: RuleDetails) => void;
  isLoading: boolean;
}

export function AvailabilityList({ rules, onRuleDeleted, onEditRule, isLoading }: AvailabilityListProps) {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (dateISO: string) => {
    setDeletingId(dateISO);
    const result = await deleteDynamicAvailabilityRule(dateISO);
    if (result.success) {
      toast({ title: "Sucesso", description: result.message });
      onRuleDeleted();
    } else {
      toast({ title: "Erro", description: result.message, variant: "destructive" });
    }
    setDeletingId(null);
  };

  const sortedDates = Object.keys(rules).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Carregando regras...</p>
      </div>
    );
  }

  if (sortedDates.length === 0) {
    return <p className="text-muted-foreground mt-4 text-center">Nenhuma regra de disponibilidade dinâmica definida.</p>;
  }

  return (
    <div className="space-y-4">
      {sortedDates.map((dateISO) => {
        const ruleDetails = rules[dateISO];
        const isUnavailable = ruleDetails.rule === 'UNAVAILABLE';
        const formattedDate = format(parseISO(dateISO), "PPP", { locale: ptBR });

        let formattedUpdatedAt = "N/A";
        if (ruleDetails.updatedAt) {
          try {
            formattedUpdatedAt = format(parseISO(ruleDetails.updatedAt), "dd/MM/yyyy HH:mm", { locale: ptBR });
          } catch (e) {
            console.warn(`Invalid updatedAt for ${dateISO}: ${ruleDetails.updatedAt}`);
          }
        }


        return (
          <Card key={dateISO} className="bg-card/70">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  {isUnavailable ? <CalendarX2 className="mr-2 h-5 w-5 text-destructive" /> : <CalendarCheck2 className="mr-2 h-5 w-5 text-green-500" />}
                  {formattedDate}
                </CardTitle>
                <div className="flex gap-2 self-start sm:self-center">
                  <Button variant="outline" size="sm" onClick={() => onEditRule(dateISO, ruleDetails)} disabled={deletingId === dateISO}>
                    <Edit className="mr-1 h-4 w-4" /> Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(dateISO)} disabled={deletingId === dateISO}>
                    {deletingId === dateISO ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Trash2 className="mr-1 h-4 w-4" />}
                    Remover
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {isUnavailable ? (
                <p className="text-sm text-destructive">Dia inteiro indisponível.</p>
              ) : (
                <div className="text-sm text-foreground/80">
                  <p className="font-medium">Horários disponíveis específicos:</p>
                  <ul className="list-disc list-inside pl-1">
                    {(ruleDetails.rule as string[]).map(time => <li key={time}>{time}</li>)}
                  </ul>
                </div>
              )}
              <CardDescription className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
                {ruleDetails.updatedBy && (
                  <span className="flex items-center mr-3">
                    <UserCircle className="h-3 w-3 mr-1" />
                    Modificado por: {ruleDetails.updatedBy}
                  </span>
                )}
                {ruleDetails.updatedAt && (
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Em: {formattedUpdatedAt}
                  </span>
                )}
                {(!ruleDetails.updatedBy && !ruleDetails.updatedAt) && (
                  <span>Regra não modificada desde a carga inicial.</span>
                )}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
