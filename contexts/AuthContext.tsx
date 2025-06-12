
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                const email = user.email; // Guaranteed to be string if user object exists with email
                setUserEmail(email);

                if (email) { // Check if email is not null or undefined
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
                    // Fallback if email is somehow null (should not happen for email/password auth)
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
        });

        return () => unsubscribe();
    }, []);

    const login = async (email_provided: string, password_provided: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email_provided, password_provided);
            toast({ title: "Login bem-sucedido!", description: "Redirecionando..." });
            return true;
        } catch (error: any) {
            console.error("Erro no login:", error);
            let errorMessage = "Ocorreu um erro ao tentar fazer login.";
            // Firebase error codes: https://firebase.google.com/docs/auth/admin/errors
            if (error.code === 'auth/invalid-credential' ||
                error.code === 'auth/user-not-found' ||
                error.code === 'auth/wrong-password') {
                errorMessage = "E-mail ou senha incorretos. Por favor, tente novamente.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "O formato do e-mail é inválido.";
            } else if (error.code === 'auth/user-disabled') {
                errorMessage = "Esta conta de usuário foi desabilitada.";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Muitas tentativas de login. Tente novamente mais tarde.";
            }
            toast({ title: "Erro de Login", description: errorMessage, variant: "destructive" });
            setIsLoading(false);
            return false;
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await firebaseSignOut(auth);
            router.push('/login');
            toast({ title: "Logout realizado com sucesso." });
        } catch (error) {
            console.error("Erro no logout:", error);
            toast({ title: "Erro ao Sair", description: "Não foi possível fazer logout. Tente novamente.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, userEmail, userName, isAuthenticated, login, logout, isLoading }}>
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
