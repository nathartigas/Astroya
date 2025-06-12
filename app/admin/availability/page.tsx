
"use client";

import { useState, useEffect, useCallback } from "react";
import { AvailabilityForm } from "@/components/admin/availability-form";
import { AvailabilityList } from "@/components/admin/availability-list";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getDynamicAvailabilityRules, resetAllDataForPrototyping } from "@/app/actions/schedule-manager";
import type { DynamicAvailabilityRules, RuleDetails } from "@/app/actions/schedule-manager";
import { RefreshCcw, AlertTriangle, Loader2, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';


export default function AdminAvailabilityPage() {
  const [rules, setRules] = useState<DynamicAvailabilityRules>({});
  const [isLoadingRules, setIsLoadingRules] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [editingRuleData, setEditingRuleData] = useState<{ dateISO: string; ruleDetails: RuleDetails } | undefined>(undefined);
  const { toast } = useToast();
  const { userEmail, userName, logout, isLoading: authIsLoading } = useAuth();




  const fetchRules = useCallback(async () => {
    console.log("[AdminAvailabilityPage CLIENT LOG] fetchRules CALLED");
    setIsLoadingRules(true);
    try {
      const currentRules = await getDynamicAvailabilityRules();
      console.log("[AdminAvailabilityPage CLIENT LOG] fetchRules - Received rules:", currentRules);
      setRules(currentRules);
    } catch (error) {
      console.error("[AdminAvailabilityPage CLIENT LOG] Erro ao buscar regras:", error);
      toast({ title: "Erro", description: "Não foi possível carregar as regras de disponibilidade.", variant: "destructive" });
    } finally {
      setIsLoadingRules(false);
      console.log("[AdminAvailabilityPage CLIENT LOG] fetchRules FINISHED");
    }
  }, [toast]);

  useEffect(() => {
    if (!authIsLoading && userEmail) {
      fetchRules();
    }
  }, [fetchRules, authIsLoading, userEmail]);

  const handleRuleChange = () => {
    console.log("[AdminAvailabilityPage CLIENT LOG] handleRuleChange CALLED");
    fetchRules();
    setEditingRuleData(undefined);
  };

  const handleEditRule = (dateISO: string, ruleDetails: RuleDetails) => {
    console.log("[AdminAvailabilityPage CLIENT LOG] handleEditRule CALLED for date:", dateISO);
    setEditingRuleData({ dateISO, ruleDetails });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetRules = async () => {
    console.log("[AdminAvailabilityPage CLIENT LOG] handleResetRules CALLED");
    setIsResetting(true);
    if (confirm("Tem certeza que deseja resetar TODAS as regras dinâmicas e horários agendados para o estado inicial (definido em availability-rules.json)? Esta ação não pode ser desfeita.")) {
      try {
        await resetAllDataForPrototyping();
        toast({ title: "Sucesso", description: "Regras e agendamentos resetados para o estado inicial do JSON." });
        fetchRules();
      } catch (error) {
        console.error("[AdminAvailabilityPage CLIENT LOG] Erro ao resetar regras:", error);
        toast({ title: "Erro", description: "Não foi possível resetar as regras.", variant: "destructive" });
      }
    }
    setIsResetting(false);
  };

  if (authIsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-background">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-primary gradient-text-animated">Gerenciamento de Disponibilidade</h1>
            {userName && <p className="text-xl text-muted-foreground mt-1">Olá, {userName.includes('@') ? userName.split('@')[0] : userName.split(' ')[0]}!</p>}
          </div>
          <Button variant="outline" onClick={logout} size="sm" className="border-border hover:bg-muted self-start sm:self-center">
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Configure dias indisponíveis ou horários específicos de atendimento.
          {userEmail && <span className="block sm:inline mt-1 sm:mt-0">Logado como: <span className="font-medium">{userEmail}</span></span>}
        </p>
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md text-destructive flex items-start">
          <AlertTriangle className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h2 className="font-semibold">Atenção: Modo de Prototipagem</h2>
            <p className="text-sm">
              As regras configuradas aqui são armazenadas <strong>em memória</strong> e serão perdidas se o servidor reiniciar.
              O arquivo <code>src/config/availability-rules.json</code> define o estado inicial das regras.
            </p>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-1">
          <AvailabilityForm
            key={editingRuleData ? editingRuleData.dateISO : 'new'}
            onRuleAddedOrUpdated={handleRuleChange}
            initialData={editingRuleData}
            adminEmail={userEmail}
          />
          {editingRuleData && (
            <Button variant="outline" onClick={() => setEditingRuleData(undefined)} className="mt-4 w-full">
              Cancelar Edição / Adicionar Nova Regra
            </Button>
          )}
        </section>

        <section className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Regras Atuais</h2>
            <Button onClick={handleResetRules} variant="outline" size="sm" disabled={isResetting || isLoadingRules} className="border-destructive text-destructive hover:bg-destructive/10">
              {isResetting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
              Resetar para JSON Inicial
            </Button>
          </div>
          <AvailabilityList rules={rules} onRuleDeleted={handleRuleChange} onEditRule={handleEditRule} isLoading={isLoadingRules} />
        </section>
      </main>
    </div>
  );
}