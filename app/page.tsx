"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  Instagram,
  Linkedin,
  TwitterIcon as TikTok,
  Menu,
  Star,
  Users,
  TrendingUp,
  Zap,
  Award,
  Globe,
  Sparkles,
  Heart,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { ParticleCanvas } from "@/components/particle-canvas"
import { GlowingButton } from "@/components/glowing-button"
import { HeroGradient } from "@/components/hero-gradient"
import { MagneticButton as MagneticButtonComponent } from "@/components/magnetic-button"
import { ScrollProgress } from "@/components/scroll-progress"
import { StatsCounter } from "@/components/stats-counter"
import { CaseStudyCard as CaseStudyCardComponent } from "@/components/case-study-card"
import { MobileMenu } from "@/components/mobile-menu"
import { RotatingText } from "@/components/rotating-text"
import { GlitchText } from "@/components/glitch-text"
import { MouseFollower } from "@/components/mouse-follower"
import { TestimonialCarousel } from "@/components/testimonial-carousel"


export default function Home() {
  const isMobile = useMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100])

  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const talentsRef = useRef<HTMLDivElement>(null)
  const casesRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const plansRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)

    const sections = [
      { id: "home", ref: null, top: 0 },
      { id: "about", ref: aboutRef },
      { id: "services", ref: servicesRef },
      { id: "cases", ref: casesRef },
      { id: "stats", ref: statsRef },
      { id: "plans", ref: plansRef },
    ]

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      if (!section.ref) continue

      const rect = section.ref.current?.getBoundingClientRect()
      // Ajuste aqui: considere a seção ativa se ela está visível na tela
      if (rect && rect.top <= 120 && rect.bottom > 120) {
        setActiveSection(section.id)
        break
      }
    }

    if (latest <= 100) {
      setActiveSection("home")
    }
  })

  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navLinks = [
    { href: "#", label: "Home", id: "home" },
    { href: "#about", label: "Sobre", id: "about" },
    { href: "#services", label: "Serviços", id: "services" },
    { href: "#cases", label: "Cases", id: "cases" },
    { href: "#plans", label: "Planos", id: "plans" },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-white overflow-x-hidden">
      <MouseFollower />
      <ScrollProgress />

      {/* Navbar */}
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b transition-all duration-300 rounded-b-[24px]",
          scrolled ? "border-zinc-800/80 bg-black/90 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">


          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="group relative flex items-center">
              <Image
                src="/Logo_A_Foguete.svg"
                alt="Astroya logo"
                width={60}
                height={30}
                className="transition-all duration-300 group-hover:opacity-80"
              />
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "group relative text-sm font-medium transition-colors",
                    activeSection === link.id ? "text-[#FF5500]" : "text-zinc-400 hover:text-white",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[2px] bg-[#ffffff] transition-all duration-300",
                      activeSection === link.id ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden md:block"
            >
              <GlowingButton className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:from-[#FF5500] hover:to-[#9200BE]">
                Fale Conosco!
              </GlowingButton>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex md:hidden items-center justify-center h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5 text-zinc-400" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu links={navLinks} activeSection={activeSection} onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>

      <main className="relative">
      </main>
      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative flex min-h-[100vh] items-center justify-center overflow-hidden py-20 md:py-0"
      >
        <HeroGradient />
        <ParticleCanvas />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,102,0.1),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 grid gap-8 py-16 md:py-32 md:grid-cols-2 md:gap-12">
          {/* Coluna de texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center items-center md:items-start space-y-6 md:space-y-8 text-center md:text-left"
          >
            <div className="space-y-4 md:space-y-6 w-full flex flex-col items-center md:items-start">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2 mr-1 md:mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7CFC00] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#90EE90]"></span>
                </span>
                Desenvolvimento FullStack.
              </motion.div>

              <img
                src="/LOGOINICIAL.svg"
                alt="Descrição da imagem"
                className="w-full max-w-[300px] md:max-w-[400px] h-auto object-contain mx-auto md:mx-0"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-base md:text-xl text-zinc-400"
              >
                Impulsionamos o seu negócio com soluções digitais inovadoras e personalizadas com exclusividade.
                <RotatingText
                  words={["A gente PILOTA,", "VOCÊ decola!"]}
                  className="ml-2 text-white font-medium"
                />
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 w-full items-center md:items-start"
            >
              <MagneticButtonComponent
                className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:from-[#FF5500] hover:to-[#9200BE] text-base md:text-lg h-12 md:h-14 px-6 md:px-8 w-full sm:w-auto transition-all duration-300"
              >
                <span>Quero decolar!</span>
                <Sparkles className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </MagneticButtonComponent>

              <Button
                className="outline group border-[#ffffff] bg-black hover:bg-[#9200BE]/10 text-base md:text-lg h-12 md:h-14 px-6 md:px-8 w-full sm:w-auto transition-all duration-300"
              >
                <span>Consultoria grátis</span>
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {/* Removido: className="flex items-center space-x-4 md:space-x-8 text-zinc-500 justify-center md:justify-start" */}
            </motion.div>
          </motion.div>

          {/* Coluna da imagem do Mac */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="relative flex items-center justify-center mt-8 md:mt-0"
          >
            <div className="relative h-[300px] w-[300px] xs:h-[340px] xs:w-[340px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px] max-w-full flex items-center justify-center">
              {/* Glow laranja atrás do Mac */}
              <div className="absolute inset-0 z-0 rounded-full bg-[#FF5500] opacity-30 blur-3xl pointer-events-none"></div>
              <Image
                src="/Mac.PNG"
                alt="Macbook"
                fill
                className="object-contain relative z-10"
                style={{ borderRadius: 0 }}
              />
              <FloatingIcons />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Link href="#about" className="flex flex-col items-center text-zinc-500 hover:text-white">
              <span className="mb-2 text-xs">Role p/ baixo</span>
              <ChevronDown className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,102,0.05),transparent_70%)]"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-12 md:mb-16 max-w-3xl text-center"
          >
            <div className="mb-4 md:mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm backdrop-blur-sm">
              <Star className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 text-[#FF5500]" />
              Nossa missão
            </div>
            <h2 className="mb-6 md:mb-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Transformamos tecnologia em{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">impacto real</span>
                <span className="absolute -bottom-1 left-0 z-0 h-3 w-full bg-[#FF0066]/20 blur-sm"></span>
              </span>
            </h2>
            <p className="text-base md:text-xl text-zinc-400">
              Na ASTROYA, acreditamos que tecnologia só faz sentido quando gera impacto. É por isso que criamos landing pages inteligentes, rápidas e focadas em conversão, ajudando sua marca a se destacar no digital.

            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3">
            {[
              {
                title: "Autenticidade",
                description:
                  "Valorizamos conteúdo genuíno e relações transparentes que geram confiança e resultados duradouros.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-[#FF5500]"
                  >
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                    <path d="M5 18v2" />
                    <path d="M19 18v2" />
                  </svg>
                ),
                gradient: "from-[#FF0066]/20 to-purple-500/20",
              },
              {
                title: "Inovação",
                description:
                  "Buscamos constantemente novas formas de criar impacto, utilizando tecnologia e criatividade para superar expectativas.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-[#FF5500]"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m16 6-4 4-4-4" />
                    <path d="M16 18a4 4 0 0 0-8 0" />
                  </svg>
                ),
                gradient: "from-purple-500/20 to-blue-500/20",
              },
              {
                title: "Ética",
                description:
                  "Comprometidos com práticas responsáveis e transparentes, construindo um ecossistema digital mais saudável e sustentável.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-[#FF5500]"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
                gradient: "from-blue-500/20 to-[#FF0066]/20",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: isMobile ? 0.2 : 0.5,
                  delay: isMobile ? 0 : index * 0.1,
                }}
                className="group relative"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#FF5500]/50 to-purple-500/50 opacity-0 blur transition-all duration-500 group-hover:opacity-100"></div>
                <div className="relative flex flex-col h-full p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm transition-all duration-300 group-hover:border-[#FF5500]/30 group-hover:shadow-[0_0_25px_rgba(255,0,102,0.2)]">
                  <div className="mb-6 rounded-xl bg-gradient-to-br p-[1px]">
                    <div className={`rounded-xl bg-gradient-to-br ${item.gradient} p-4`}>{item.icon}</div>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                  <div className="mt-6 flex items-center text-[#FF5500]">
                    <span className="text-sm font-medium">Saiba mais</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="relative py-16 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,102,0.05),transparent_70%)]"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-12 md:mb-16 max-w-3xl text-center"
          >
            <div className="mb-4 md:mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm backdrop-blur-sm">
              <Zap className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 text-[#FF5500]" />O que oferecemos
            </div>
            <h2 className="mb-6 md:mb-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Nossos <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">Serviços</span> exclusivos
            </h2>
            <p className="text-base md:text-xl text-zinc-400">
              Soluções personalizadas para influenciadores e marcas que buscam resultados extraordinários e conexões
              autênticas no mundo digital.
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-[#FF5500] to-purple-500"></div>
                <h3 className="text-2xl font-bold mb-6 pl-4">Para Influenciadores</h3>
              </div>

              {[
                {
                  title: "Gestão de carreira e imagem",
                  description:
                    "Desenvolvemos estratégias personalizadas para potencializar sua presença digital e construir uma marca pessoal autêntica e lucrativa.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  features: ["Planejamento estratégico", "Identidade visual", "Gestão de conteúdo"],
                },
                {
                  title: "Conexão com marcas relevantes",
                  description:
                    "Facilitamos parcerias estratégicas alinhadas com seus valores e público, garantindo colaborações autênticas e lucrativas.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  ),
                  features: ["Matchmaking personalizado", "Negociação de contratos", "Gestão de relacionamentos"],
                },
                {
                  title: "Estratégias de crescimento",
                  description:
                    "Planos personalizados para expandir seu alcance e engajamento de forma sustentável, com foco em resultados mensuráveis e de longo prazo.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ),
                  features: ["Análise de métricas", "Otimização de algoritmos", "Estratégias de monetização"],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: isMobile ? 0.2 : 0.5,
                    delay: isMobile ? 0 : index * 0.1,
                  }}
                  className="group"
                >
                  <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 transition-all duration-500 hover:border-[#FF0066]/30 hover:shadow-[0_0_25px_rgba(255,0,102,0.2)] hover:translate-y-[-5px]">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#FF0066]/10 blur-3xl transition-all duration-700 group-hover:bg-[#FF0066]/20"></div>
                    <CardContent className="p-8">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-[#FF5500]/20 p-3 text-[#FF5500]">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                            <p className="text-zinc-400">{item.description}</p>
                          </div>
                        </div>

                        <div className="mt-4 border-t border-zinc-800 pt-4">
                          <div className="flex flex-wrap gap-2">
                            {item.features.map((feature, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center rounded-full bg-zinc-800/50 px-3 py-1 text-xs"
                              >
                                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-[#FF5500]"></span>
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-[#FF5500]"></div>
                <h3 className="text-2xl font-bold mb-6 pl-4">Para Marcas</h3>
              </div>

              {[
                {
                  title: "Curadoria de talentos",
                  description:
                    "Selecionamos influenciadores alinhados com o propósito e valores da sua marca, garantindo autenticidade e relevância para seu público-alvo.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  ),
                  features: [
                    "Análise de compatibilidade",
                    "Verificação de autenticidade",
                    "Avaliação de performance",
                  ],
                },
                {
                  title: "Campanhas de influência",
                  description:
                    "Desenvolvemos estratégias criativas e eficazes para maximizar o impacto da sua marca através de narrativas autênticas e envolventes.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                      <path d="M10 2c1 .5 2 2 2 5" />
                    </svg>
                  ),
                  features: ["Planejamento estratégico", "Produção criativa", "Distribuição multicanal"],
                },
                {
                  title: "Gestão de contratos e performance",
                  description:
                    "Administramos todos os aspectos legais e acompanhamos os resultados das campanhas, garantindo transparência e maximização do ROI.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                      <path d="M10 9H8" />
                    </svg>
                  ),
                  features: ["Relatórios detalhados", "Análise de ROI", "Otimização contínua"],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: isMobile ? 0.2 : 0.5,
                    delay: isMobile ? 0 : index * 0.1,
                  }}
                  className="group"
                >
                  <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 transition-all duration-500 hover:border-[#FF0066]/30 hover:shadow-[0_0_25px_rgba(255,0,102,0.2)] hover:translate-y-[-5px]">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#FF0066]/10 blur-3xl transition-all duration-700 group-hover:bg-[#FF0066]/20"></div>
                    <CardContent className="p-8">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-[#FF5500]/20 p-3 text-[#FF5500]">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                            <p className="text-zinc-400">{item.description}</p>
                          </div>
                        </div>

                        <div className="mt-4 border-t border-zinc-800 pt-4">
                          <div className="flex flex-wrap gap-2">
                            {item.features.map((feature, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center rounded-full bg-zinc-800/50 px-3 py-1 text-xs"
                              >
                                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-[#FF5500]"></span>
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,102,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <h2 className="mb-8 text-4xl font-bold tracking-tighter sm:text-5xl">
              Números que <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">impressionam</span>
            </h2>
            <p className="text-xl text-zinc-400">
              Resultados concretos que demonstram nossa capacidade de transformar influência em impacto mensurável.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { value: 500, label: "Influenciadores", icon: Users, suffix: "+" },
              { value: 200, label: "Marcas parceiras", icon: Award, suffix: "+" },
              { value: 150, label: "Milhões de alcance", icon: Globe, suffix: "M" },
              { value: 350, label: "Crescimento médio", icon: TrendingUp, suffix: "%" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#FF5500]/50 to-[#9200BE] opacity-0 blur transition-all duration-500 group-hover:opacity-100"></div>
                <div className="relative flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center backdrop-blur-sm transition-all duration-300 group-hover:border-[#FF0066]/30">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF0066]/10">
                    <stat.icon className="h-8 w-8 text-[#FF5500]" />
                  </div>
                  <StatsCounter value={stat.value} suffix={stat.suffix} className="text-4xl font-bold" />
                  <p className="mt-2 text-zinc-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" ref={casesRef} className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,0,102,0.05),transparent_70%)]"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Award className="mr-2 h-4 w-4 text-[#FF5500]" />
              Nossos sucessos
            </div>
            <h2 className="mb-8 text-4xl font-bold tracking-tighter sm:text-5xl">
              Resultados que <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">falam por si</span>
            </h2>
            <p className="text-xl text-zinc-400">
              Conheça algumas das nossas campanhas de maior sucesso e o impacto que geramos para marcas e influenciadores.
            </p>
          </motion.div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "FuriaApp",
                description: "Lançamento de produto tecnológico com influenciadores do setor tech e lifestyle.",
                image: "/placeholder.svg?height=400&width=600&text=TechFuture",
                stats: [
                  { label: "Alcance", value: "+150%" },
                  { label: "Conversão", value: "32%" },
                  { label: "ROI", value: "420%" },
                ],
                tags: ["Tech", "Lançamento", "B2C"],
              },
              {
                title: "Dra.KalyZanona",
                description:
                  "Estratégia omnichannel para nova linha de produtos fitness com micro e macro influenciadores.",
                image: "/placeholder.svg?height=400&width=600&text=FitLife",
                stats: [
                  { label: "Novos seguidores", value: "200K" },
                  { label: "Conversão", value: "45%" },
                  { label: "Vendas", value: "+320%" },
                ],
                tags: ["Fitness", "Lifestyle", "E-commerce"],
              },
              {
                title: "Advogados",
                description:
                  "Conscientização sobre moda sustentável com influenciadores alinhados à causa ambiental.",
                image: "/placeholder.svg?height=400&width=600&text=EcoStyle",
                stats: [
                  { label: "Engajamento", value: "87%" },
                  { label: "Influenciadores", value: "5" },
                  { label: "Impacto social", value: "Alto" },
                ],
                tags: ["Sustentabilidade", "Moda", "Causa"],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CaseStudyCardComponent caseStudy={item} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mt-16 flex justify-center"
          >
            <Button className="bg-white text-black hover:bg-white/90 transition-all duration-300 text-lg h-12 px-8">
              Ver todos os cases
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="plans" ref={plansRef} className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#FF0066]">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5500] via-[#FF0066] to-purple-600"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center m-0"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              Planos de Serviço
            </div>
            <h2 className="mb-8 text-5xl font-bold tracking-tighter sm:text-6xl">
              Escolha o plano ideal para sua jornada
            </h2>
            <p className="mx-auto max-w-2xl text-xl mb-12 text-white/80">
              Oferecemos diferentes planos para atender ao seu objetivo. Seja para uma campanha pontual ou para um projeto contínuo, temos a opção certa para você:
            </p>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-8xl">
              {[
                {
                  title: "Plano Iniciante",
                  price: "R$ 69,90/mês",
                  benefits: [
                    "Landing Page 100% personalizada",
                    "Hospedagem incluída",
                    "Sem relatórios de desempenho",
                    "Sem alterações mensais",
                    "Sem suporte personalizado",
                  ],
                },
                {
                  title: "Plano Essencial",
                  price: "R$ 109,90/mês",
                  benefits: [
                    "Tudo do Iniciante",
                    "Relatório de desempenho (1 a cada 3 meses)",
                    "Até 1 alteração simples por mês (texto ou imagem)",
                    "Suporte padrão via e-mail",
                  ],
                },
                {
                  title: "Plano Avançado",
                  price: "R$ 149,90/mês",
                  benefits: [
                    "Tudo do Essencial",
                    "Até 2 landing pages 100% personalizadas",
                    "Relatório mensal de desempenho",
                    "Até 4 alterações por mês (conteúdo, imagem, cor ou pequena seção)",
                    "Otimização de SEO (intermediária)",
                    "Suporte prioritário via WhatsApp",
                  ],
                },
                {
                  title: "Plano Premium",
                  price: "R$ 199,90/mês",
                  benefits: [
                    "Tudo do Avançado",
                    "Até 3 landing pages 100% personalizadas",
                    "Alterações ilimitadas",
                    "Redesign completo da LP a cada 6 meses",
                    "Consultoria estratégica de conversão (aumente vendas e leads)",
                    "Criação de campanhas sazonais",
                    "Monitoramento e ajustes contínuos de SEO",
                    "Suporte VIP – respostas em até 12 horas úteis",
                  ],
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="w-full max-w-[600px] mx-auto rounded-2xl border border-white/20 bg-white/10 p-10 text-left backdrop-blur-md flex flex-col justify-between h-full"
                >
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-black">{plan.title}</h3>
                    <div className="mb-4 text-2xl font-extrabold text-white">{plan.price}</div>
                    <ul className="space-y-2 mb-8">
                      {plan.benefits.map((benefit, j) => {
                        // Para o Plano Iniciante, troca o ícone se o benefício começa com "Sem"
                        const isNegative =
                          plan.title === "Plano Iniciante" && benefit.trim().toLowerCase().startsWith("sem")
                        return (
                          <li key={j} className="flex items-start space-x-2">
                            {isNegative ? (
                              <X className="mt-0.5 h-4 w-4 text-black flex-shrink-0" />
                            ) : (
                              <Check className="mt-0.5 h-4 w-4 text-black flex-shrink-0" />
                            )}
                            <span className={isNegative ? "text-white/55 line-through" : ""}>{benefit}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <Button className="w-full bg-white text-[#FF0066] hover:bg-white/90 mt-auto">
                    <span>Assinar agora</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid gap-12 md:grid-cols-4 text-center md:text-left">
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <Link href="/" className="text-2xl font-bold tracking-tighter">
                <Link href="/" className="group relative flex items-center justify-center md:justify-start">
                  <Image
                    src="Logo_A_Foguete.svg"
                    alt="Astroya logo"
                    width={100}
                    height={10}
                    className="transition-all duration-300 group-hover:opacity-80"
                  />
                </Link>
              </Link>
              <p className="text-zinc-400">A gente pilota, você decola!</p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <Link
                  href="#"
                  className="rounded-full border border-zinc-800 p-2 text-zinc-400 hover:border-[#FF0066] hover:text-[#FF0066] transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="rounded-full border border-zinc-800 p-2 text-zinc-400 hover:border-[#FF0066] hover:text-[#FF0066] transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="#"
                  className="rounded-full border border-zinc-800 p-2 text-zinc-400 hover:border-[#FF0066] hover:text-[#FF0066] transition-colors"
                >
                  <TikTok className="h-5 w-5" />
                  <span className="sr-only">TikTok</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-bold">Navegação</h3>
              <ul className="space-y-4 flex flex-col items-center md:items-start">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className="text-zinc-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-bold">Serviços</h3>
              <ul className="space-y-4 flex flex-col items-center md:items-start">
                {[
                  "Criação de Landing Pages",
                  "Otimização de SEO",
                  "Gestão de tráfego",
                  "Email marketing",
                  "Análise de dados",
                  "Consultoria de marketing digital",
                ].map((service, i) => (
                  <li key={i}>
                    <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-bold">Contato</h3>
              <ul className="space-y-4 text-zinc-400 flex flex-col items-center md:items-start">
                <li>astroya.br@gmail.com</li>
                <li>+55 41 99999-9999</li>
                <li>Curitiba, PR - Brasil</li>
              </ul>
              <div className="mt-6 flex justify-center md:justify-start">
                <Button
                  className="w-full bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-white border-none hover:from-[#FF5500] hover:to-[#9200BE] max-w-xs transition-all duration-300"
                >
                  Fale conosco
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-zinc-800 pt-8 text-center">
            <p className="text-xs text-zinc-500">© 2025 Astroya. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      <a
        href="https://wa.me/5541999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 group"
        aria-label="Fale conosco no WhatsApp"
      >
        <span className="sr-only">WhatsApp</span>
        <div className="rounded-full shadow-lg bg-gradient-to-br from-[#9200BE] to-[#FF5500] p-0.5 transition-transform hover:scale-105">
          <div className="flex items-center justify-center rounded-full bg-black p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"
                fill="currentColor"
              />
              <path
                d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.484 1.34 4.997L2 22l5.145-1.341c1.462.799 3.09 1.217 4.859 1.217 5.514 0 9.997-4.483 9.997-9.997 0-2.664-1.037-5.168-2.922-7.053C17.172 3.04 14.668 2.003 12.004 2.003zm0 17.994c-1.627 0-3.217-.427-4.584-1.236l-.328-.195-3.055.797.814-2.978-.213-.306C3.427 14.217 3.003 12.627 3.003 11c0-4.963 4.038-9.001 9.001-9.001 2.404 0 4.666.936 6.364 2.634 1.698 1.698 2.634 3.96 2.634 6.364 0 4.963-4.038 9.001-9.001 9.001z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </a>
    </div>
  )
}

// Substitua a função FloatingIcons no arquivo components/floating-icons.tsx
export function FloatingIcons() {
  const isMobile = useMobile()

  const icons = [
    { Icon: Heart, delay: 0, x: isMobile ? "15%" : "20%", y: isMobile ? "15%" : "20%" },
    { Icon: Star, delay: 1.5, x: isMobile ? "65%" : "70%", y: isMobile ? "10%" : "15%" },
    { Icon: Zap, delay: 0.8, x: isMobile ? "75%" : "80%", y: isMobile ? "55%" : "60%" },
    { Icon: TrendingUp, delay: 2.2, x: isMobile ? "10%" : "15%", y: isMobile ? "65%" : "70%" },
    { Icon: Award, delay: 1.2, x: isMobile ? "45%" : "50%", y: isMobile ? "75%" : "80%" },
  ]

  return (
    <>
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-[#9200BE]"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -20, -20, -40],
          }}
          transition={{
            duration: 4,
            delay: delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          <Icon className={`${isMobile ? "h-4 w-4" : "h-6 w-6"}`} />
        </motion.div>
      ))}
    </>
  )
}

// Substitua a função MagneticButton no arquivo components/magnetic-button.tsx
interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg"
}

export function MagneticButton({ children, className, size = "default" }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const x = (clientX - (left + width / 2)) * 0.2
    const y = (clientY - (top + height / 2)) * 0.2

    setPosition({ x, y })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative inline-block"
    >
      <Button
        className={cn("relative bg-[#FF0066] hover:bg-[#D80055] transition-all duration-300 z-10", className)}
        size={size}
      >
        {children}
      </Button>
    </motion.div>
  )
}

interface CaseStudyProps {
  title: string
  description: string
  image: string
  stats: { label: string; value: string }[]
  tags: string[]
}

// Substitua a função CaseStudyCard no arquivo components/case-study-card.tsx
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudyProps }) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMobile()

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <Card className="relative h-full overflow-hidden border-zinc-800 bg-zinc-900/50 transition-all duration-500 hover:border-[#FF0066]/30 hover:shadow-[0_0_25px_rgba(255,0,102,0.2)]">
        <div className="relative h-36 sm:h-40 md:h-48 w-full overflow-hidden">
          <Image
            src={caseStudy.image || "/placeholder.svg"}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-3 md:p-4">
            <div className="flex flex-wrap gap-1 md:gap-2">
              {caseStudy.tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full bg-black/50 px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4 md:p-6">
          <h3 className="mb-1 md:mb-2 text-base md:text-xl font-bold">{caseStudy.title}</h3>
          <p className="mb-3 md:mb-4 text-xs md:text-sm text-zinc-400">{caseStudy.description}</p>

          <div className="mt-auto">
            <div className="mb-3 md:mb-4 grid grid-cols-3 gap-1 md:gap-2">
              {caseStudy.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-sm md:text-lg font-bold text-[#FF0066]">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <motion.div
              className="flex items-center justify-center rounded-lg border border-zinc-800 p-2 text-xs md:text-sm text-zinc-400 transition-colors group-hover:border-[#FF0066]/30 group-hover:text-white"
              animate={{
                backgroundColor: isHovered ? "rgba(255, 0, 102, 0.1)" : "rgba(0, 0, 0, 0)",
              }}
            >
              Ver case completo
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
