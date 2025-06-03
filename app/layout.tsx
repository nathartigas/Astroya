import type React from "react"
import "@/app/globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata = {
  title: "Astroya Brasil",
  description: "Alavancamos seu negócio com soluções em tecnologia.",
  keywords: "tecnologia, landing pages, front-end, digitais, desenvolvimento, software, web, aplicativos, design, branding, marketing digital",
  icons: {
    icon: "/Logo_A_Foguete.svg", // ou .png se for o caso
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
