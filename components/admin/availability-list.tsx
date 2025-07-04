"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Loader2, CalendarX2, CalendarCheck2 } from "lucide-react";
import { useState } from "react";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Tipos locais
export type RuleDetails = {
  available: boolean;
  horariosDisponiveis: string[];
};

export type DynamicAvailabilityRules = {
  [date: string]: RuleDetails;
};

interface AvailabilityListProps {
  rules: DynamicAvailabilityRules;
  onRuleDeleted: (date: string) => void;
  onEditRule: (dateISO: string, ruleDetails: RuleDetails) => void;
  isLoading: boolean;
}

export function AvailabilityList({ rules, onRuleDeleted, onEditRule, isLoading }: AvailabilityListProps) {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (dateISO: string) => {
    setDeletingId(dateISO);
    try {
      await fetch("/api/admin/availability", {
        method: "DELETE",
        body: JSON.stringify({ date: dateISO }),
        headers: { "Content-Type": "application/json" },
      });
      toast({ title: "Sucesso", description: "Regra excluída com sucesso!" });
      onRuleDeleted(dateISO);
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível excluir a regra.", variant: "destructive" });
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
    return <p className="text-muted-foreground mt-4 text-center">Nenhuma regra de disponibilidade definida.</p>;
  }

  return (
    <div className="space-y-4">
      {sortedDates.map((dateISO) => {
        const ruleDetails = rules[dateISO];
        const isUnavailable = !ruleDetails.available;
        const formattedDate = format(parseISO(dateISO), "PPP", { locale: ptBR });

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
                    {ruleDetails.horariosDisponiveis.map(time => <li key={time}>{time}</li>)}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
