import type React from "react";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Astroya Brasil",
  description: "Alavancamos seu negócio com soluções em tecnologia.",
  keywords:
    "tecnologia, landing pages, front-end, digitais, desenvolvimento, software, web, aplicativos, design, branding, marketing digital",
  icons: {
    icon: "/Logo_A_Foguete.svg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}



