'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    type User
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

const ADMIN_NAME_MAP: Record<string, string> = {
    'nathartigasna@gmail.com': 'Nathalia Artigas',
    'lo.laskawski@gmail.com': 'Lorenzo Sorrentino',
};

interface AuthContextType {
    currentUser: User | null;
    userEmail: string | null;
    userName: string | null;
    isAuthenticated: boolean;
    login: (email: string, password_provided: string) => Promise<boolean>;
    logout: () => Promise<void>;
    isLoading: boolean;
    isAuthChecked: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        // Verificar se estamos no cliente e se o auth está disponível
        if (typeof window === 'undefined' || !auth) {
            setIsAuthChecked(true); // Marca como verificado se não puder verificar
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("AuthContext: onAuthStateChanged - user:", user ? user.email : "null");
            if (user) {
                setCurrentUser(user);
                const email = user.email;
                setUserEmail(email);

                if (email) {
                    const mappedName = ADMIN_NAME_MAP[email];
                    const firebaseDisplayName = user.displayName;
                    const emailUsernamePart = email.split('@')[0];

                    if (mappedName) {
                        setUserName(mappedName);
                    } else if (firebaseDisplayName) {
                        setUserName(firebaseDisplayName);
                    } else {
                        setUserName(emailUsernamePart);
                    }
                } else {
                    setUserName(user.displayName || 'Usuário');
                }
                setIsAuthenticated(true);
            } else {
                setCurrentUser(null);
                setUserEmail(null);
                setUserName(null);
                setIsAuthenticated(false);
            }
            setIsLoading(false);
            setIsAuthChecked(true); // Marca que a verificação inicial foi concluída
            console.log("AuthContext: State updated - isLoading:", false, "isAuthenticated:", isAuthenticated, "isAuthChecked:", true);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email_provided: string, password_provided: string): Promise<boolean> => {
        // Não tentar fazer login no servidor
        if (typeof window === 'undefined' || !auth) return false;

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email_provided, password_provided);
            toast({ title: "Login bem-sucedido!", description: "Redirecionando..." });
            return true;
        } catch (error: any) {
            console.error("Erro no login:", error);
            let errorMessage = "Ocorreu um erro ao tentar fazer login.";

            if (error.code) {
                switch (error.code) {
                    case 'auth/invalid-credential':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        errorMessage = "E-mail ou senha incorretos. Por favor, tente novamente.";
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "O formato do e-mail é inválido.";
                        break;
                    case 'auth/user-disabled':
                        errorMessage = "Esta conta de usuário foi desabilitada.";
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = "Muitas tentativas de login. Tente novamente mais tarde.";
                        break;
                    default:
                        errorMessage = `Erro desconhecido: ${error.code}`;
                }
            }

            toast({ title: "Erro de Login", description: errorMessage, variant: "destructive" });
            setIsLoading(false);
            return false;
        }
    };

    const logout = async () => {
        // Não tentar fazer logout no servidor
        if (typeof window === 'undefined' || !auth) return;

        setIsLoading(true);
        try {
            await firebaseSignOut(auth);
            // Remova o redirecionamento daqui
            toast({ title: "Logout realizado com sucesso." });
        } catch (error) {
            console.error("Erro no logout:", error);
            toast({
                title: "Erro ao Sair",
                description: "Não foi possível fazer logout. Tente novamente.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const contextValue: AuthContextType = {
        currentUser,
        userEmail,
        userName,
        isAuthenticated,
        login,
        logout,
        isLoading,
        isAuthChecked,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}