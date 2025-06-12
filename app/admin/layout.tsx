
'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth(); // Simplificado, o AuthContext lida com a lógica do usuário
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, router, isLoading]);

    if (isLoading || !isAuthenticated) { // Mostra loader se estiver carregando OU se não estiver autenticado (antes do redirect)
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    // Se chegou aqui, está autenticado e não está carregando
    return <>{children}</>;
}
