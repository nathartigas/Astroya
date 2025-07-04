"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading: authIsLoading } = useAuth();
  const router = useRouter();

useEffect(() => {
  if (!authIsLoading && !isAuthenticated) {
    router.replace("/login");
  }
}, [isAuthenticated, authIsLoading, router]);

  if (authIsLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
