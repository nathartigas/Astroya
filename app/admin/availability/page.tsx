"use client";

import { useState, useEffect, useCallback } from "react";
import { AvailabilityForm } from "@/components/admin/availability-form";
import { AvailabilityList } from "@/components/admin/availability-list";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from "next/navigation";

type RuleDetails = {
  available: boolean;
  horariosDisponiveis: string[];
};

type DynamicAvailabilityRules = {
  [date: string]: RuleDetails;
};

export default function AdminAvailabilityPage() {
  const [rules, setRules] = useState<DynamicAvailabilityRules>({});
  const [isLoadingRules, setIsLoadingRules] = useState(true);
  const [editingRuleData, setEditingRuleData] = useState<{ dateISO: string; ruleDetails: RuleDetails } | undefined>(undefined);
  const { toast } = useToast();
  const router = useRouter();

  const { userEmail, userName, logout, isLoading: authIsLoading, isAuthenticated, isAuthChecked } = useAuth();

  const fetchRules = useCallback(async () => {
    setIsLoadingRules(true);
    try {
      const response = await fetch("/api/admin/availability");
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const currentRulesArr = await response.json();
      
      const currentRules: DynamicAvailabilityRules = {};
      for (const rule of currentRulesArr) {
        currentRules[rule.date] = {
          available: rule.available,
          horariosDisponiveis: rule.horariosDisponiveis || [],
        };
      }
      setRules(currentRules);
    } catch (error) {
      console.error("Erro ao buscar regras:", error);
      toast({ 
        title: "Erro", 
        description: "Não foi possível carregar as regras de disponibilidade.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoadingRules(false);
    }
  }, [toast]);

  const handleRuleChange = useCallback(() => {
    fetchRules();
    setEditingRuleData(undefined);
  }, [fetchRules]);

  const handleEditRule = useCallback((dateISO: string, ruleDetails: RuleDetails) => {
    setEditingRuleData({ dateISO, ruleDetails });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSaveRule = useCallback(async (date: string, available: boolean, horariosDisponiveis: string[]) => {
    try {
      const response = await fetch("/api/admin/availability", {
        method: "POST",
        body: JSON.stringify({ date, available, horariosDisponiveis }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      toast({ title: "Sucesso", description: "Regra salva com sucesso!" });
      handleRuleChange();
    } catch (error) {
      console.error("Erro ao salvar regra:", error);
      toast({ 
        title: "Erro", 
        description: "Não foi possível salvar a regra.", 
        variant: "destructive" 
      });
    }
  }, [toast, handleRuleChange]);

  const handleDeleteRule = useCallback(async (date: string) => {
    try {
      const response = await fetch("/api/admin/availability", {
        method: "DELETE",
        body: JSON.stringify({ date }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      toast({ title: "Sucesso", description: "Regra excluída com sucesso!" });
      handleRuleChange();
    } catch (error) {
      console.error("Erro ao excluir regra:", error);
      toast({ 
        title: "Erro", 
        description: "Não foi possível excluir a regra.", 
        variant: "destructive" 
      });
    }
  }, [toast, handleRuleChange]);

  useEffect(() => {
    console.log("AdminAvailabilityPage: useEffect triggered - authIsLoading:", authIsLoading, "isAuthenticated:", isAuthenticated, "isAuthChecked:", isAuthChecked);
    if (!isAuthChecked) {
      return; // Aguarda a verificação inicial de autenticação
    }

    if (!isAuthenticated) {
      console.log("AdminAvailabilityPage: Usuário não autenticado, redirecionando para login...");
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.replace(`/login?returnUrl=${returnUrl}`);
    } else {
      console.log("AdminAvailabilityPage: Usuário autenticado, buscando regras...");
      fetchRules();
    }
  }, [isAuthChecked, isAuthenticated, fetchRules, router]);

  // Agora sim, as condicionais de renderização
  if (!isAuthChecked) {
    console.log("AdminAvailabilityPage: Mostrando loader (isAuthChecked false)");
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("AdminAvailabilityPage: Não autenticado (isAuthenticated false)");
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-background">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-primary gradient-text-animated">
              Gerenciamento de Disponibilidade
            </h1>
            {userName && (
              <p className="text-xl text-muted-foreground mt-1">
                Olá, {userName.includes('@') 
                  ? userName.split('@')[0] 
                  : userName.split(' ')[0]}!
              </p>
            )}
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              logout();
              router.push('/login');
            }}
            size="sm" 
            className="border-border hover:bg-muted self-start sm:self-center"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Configure dias indisponíveis ou horários específicos de atendimento.
          {userEmail && (
            <span className="block sm:inline mt-1 sm:mt-0">
              Logado como: <span className="font-medium">{userEmail}</span>
            </span>
          )}
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-1">
          <AvailabilityForm
            key={editingRuleData ? editingRuleData.dateISO : 'new'}
            onRuleAddedOrUpdated={handleRuleChange}
            initialData={editingRuleData}
            adminEmail={userEmail}
            onSaveRule={handleSaveRule}
          />
          {editingRuleData && (
            <Button 
              variant="outline" 
              onClick={() => setEditingRuleData(undefined)} 
              className="mt-4 w-full"
            >
              Cancelar Edição / Adicionar Nova Regra
            </Button>
          )}
        </section>

        <section className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Regras Atuais</h2>
          <AvailabilityList
            rules={rules}
            onRuleDeleted={handleDeleteRule}
            onEditRule={handleEditRule}
            isLoading={isLoadingRules}
          />
        </section>
      </main>
    </div>
  );
}