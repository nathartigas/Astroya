
'use client';
import { useState, useEffect } from 'react'; // Adicionado useEffect
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// useToast não é mais necessário aqui, pois é tratado no AuthContext
import { LogIn, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const { login, isAuthenticated, isLoading: authIsLoading } = useAuth(); // Renomeado isLoading para authIsLoading
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado local para o envio do formulário

    // Redireciona se já estiver autenticado
    useEffect(() => {
        if (!authIsLoading && isAuthenticated) {
            router.replace('/admin/availability');
        }
    }, [isAuthenticated, authIsLoading, router]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await login(email, password); 
        if (success) {
            router.push('/admin/availability'); // O onAuthStateChanged deve redirecionar, mas fazemos aqui também.
        }
        // A mensagem de erro ou sucesso é mostrada pelo toast no AuthContext
        setIsSubmitting(false);
    };
    
    // Mostra loading se o AuthContext estiver verificando ou se já estiver logado e redirecionando
    if (authIsLoading || (!authIsLoading && isAuthenticated)) {
      return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md shadow-xl glassmorphism-card">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold gradient-text-animated">Acesso Administrativo</CardTitle>
                    <CardDescription className="text-foreground/80">
                        Entre com suas credenciais Firebase para gerenciar a disponibilidade.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground/90">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-foreground/90">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"
                                disabled={isSubmitting}
                            />
                        </div>
                        <Button type="submit" className="w-full gradient-bg text-primary-foreground font-semibold" disabled={isSubmitting || authIsLoading}>
                            {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
                            {isSubmitting ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
