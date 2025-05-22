"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  MessageCircle,
  Star,
  Zap,
  Server,
  BarChart3,
  Repeat,
  CheckCircle2,
  ArrowRight,
  Clock,
  Shield,
  Globe,
  Users,
  Rocket,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CounterElement } from "@/components/counter-element"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { HeroBackground } from "@/components/hero-background"
import { useState } from "react"
import { ConsultoriaModal } from "@/components/consultoria-modal"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="flex min-h-screen flex-col bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl rounded-b-2xl shadow-lg">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-32 w-32 md:h-40 md:w-40">
              <Image
                src="/Logo_A_Foguete_Nome.svg"
                alt="Logo Astroya"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#beneficios"
              className="text-sm font-medium text-zinc-300 hover:text-[#9200BE] transition-colors"
            >
              Benefícios
            </Link>
            <Link
              href="#portfolio"
              className="text-sm font-medium text-zinc-300 hover:text-[#9200BE] transition-colors"
            >
              Portfólio
            </Link>
            <Link href="#processo" className="text-sm font-medium text-zinc-300 hover:text-[#9200BE] transition-colors">
              Processo
            </Link>
            <Link href="#planos" className="text-sm font-medium text-zinc-300 hover:text-[#9200BE] transition-colors">
              Planos
            </Link>
            <Link href="#sobre" className="text-sm font-medium text-zinc-300 hover:text-[#9200BE] transition-colors">
              Sobre Nós
            </Link>
            <Link href="#faq" className="text-sm font-medium text-zinc-300 hover:text-[#9200BE] transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="hidden sm:block">
            <a
              href="https://api.whatsapp.com/send?phone=5541991820670&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Astroya."
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:opacity-90 text-white shadow-lg shadow-[#FF5500]/20 rounded-full px-6">
                Falar no WhatsApp
                <MessageCircle className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-8 md:py-16">
          <HeroBackground />
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-1.5 rounded-full">
                  🚀 Landing pages que convertem
                </Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  A Astroya{" "}
                  <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                    pilota
                  </span>
                  ,
                  <br />
                  você{" "}
                  <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                    decola
                  </span>
                  .
                </h1>
                <p className="text-xl text-zinc-300">
                  Criamos landing pages profissionais, com hospedagem, manutenção e foco em resultados reais.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:opacity-90 text-white px-8 py-7 rounded-full text-lg shadow-xl shadow-[#FF5500]/20 transition-all duration-300 hover:scale-105">
                    Ver Planos
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <a
                    href="https://api.whatsapp.com/send?phone=5541991820670&text=Olá!%20Gostaria%20de%20agendar%20uma%20consultoria%20gratuita%20com%20a%20Astroya."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-[#9200BE] text-white hover:bg-[#9200BE]/10 px-8 py-7 rounded-full text-lg backdrop-blur-sm bg-white/5"
                    >
                      Agende uma Consultoria Gratuita
                      <MessageCircle className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
                {/*<div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-black overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=${i}`}
                          alt={`Cliente ${i}`}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 text-[#FF5500]" />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-400">+200 clientes satisfeitos</p>
                  </div>
                </div>*/}
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex justify-center items-end pointer-events-none z-0"></div>
                <Image
                  src="/Celular.svg"
                  alt="Landing Page Demo"
                  width={800}
                  height={800}
                  className="w-full h-auto max-w-[500px] md:max-w-[700px] mx-auto"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
        </section>

        {/* Stats Section */}
        {/*<section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9200BE]/10 to-[#FF5500]/10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  <CounterElement end={200} duration={2} />+
                </h3>
                <p className="text-zinc-400">Clientes Satisfeitos</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  <CounterElement end={500} duration={2} />+
                </h3>
                <p className="text-zinc-400">Landing Pages</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  <CounterElement end={98} duration={2} />%
                </h3>
                <p className="text-zinc-400">Taxa de Satisfação</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  <CounterElement end={300} duration={2} />%
                </h3>
                <p className="text-zinc-400">Aumento em Conversões</p>
              </div>
            </div>
          </div>
        </section>*/}

        {/* Diferenciais */}
        <section id="beneficios" className="py-20 relative z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9200BE] rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF5500] rounded-full blur-[150px] opacity-20"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-white/10 text-white mb-4">NOSSOS DIFERENCIAIS</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Por que escolher a{" "}
                <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  Astroya
                </span>
                ?
              </h2>
              <p className="text-zinc-300 text-lg">
                Oferecemos soluções completas para impulsionar seu negócio com landing pages de alta conversão.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 transition-all duration-300 hover:border-[#9200BE] hover:shadow-[0_0_25px_rgba(146,0,190,0.3)] rounded-xl group">
                <div className="mb-6 rounded-full bg-gradient-to-br from-[#9200BE]/20 to-[#FF5500]/20 p-4 w-fit group-hover:from-[#9200BE]/30 group-hover:to-[#FF5500]/30 transition-all duration-300">
                  <Server className="h-8 w-8 text-[#FF5500] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FF5500] transition-colors duration-300">
                  Hospedagem Inclusa
                </h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  Sua landing page hospedada em servidores de alta performance, sem custos adicionais.
                </p>
              </Card>
              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 transition-all duration-300 hover:border-[#9200BE] hover:shadow-[0_0_25px_rgba(146,0,190,0.3)] rounded-xl group">
                <div className="mb-6 rounded-full bg-gradient-to-br from-[#9200BE]/20 to-[#FF5500]/20 p-4 w-fit group-hover:from-[#9200BE]/30 group-hover:to-[#FF5500]/30 transition-all duration-300">
                  <Zap className="h-8 w-8 text-[#FF5500] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FF5500] transition-colors duration-300">
                  Foco em Conversão
                </h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  Páginas otimizadas para converter visitantes em clientes, com elementos estratégicos.
                </p>
              </Card>
              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 transition-all duration-300 hover:border-[#9200BE] hover:shadow-[0_0_25px_rgba(146,0,190,0.3)] rounded-xl group">
                <div className="mb-6 rounded-full bg-gradient-to-br from-[#9200BE]/20 to-[#FF5500]/20 p-4 w-fit group-hover:from-[#9200BE]/30 group-hover:to-[#FF5500]/30 transition-all duration-300">
                  <Repeat className="h-8 w-8 text-[#FF5500] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FF5500] transition-colors duration-300">
                  Alterações Mensais
                </h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  Atualizações e melhorias constantes para manter sua página sempre atualizada.
                </p>
              </Card>
              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 transition-all duration-300 hover:border-[#9200BE] hover:shadow-[0_0_25px_rgba(146,0,190,0.3)] rounded-xl group">
                <div className="mb-6 rounded-full bg-gradient-to-br from-[#9200BE]/20 to-[#FF5500]/20 p-4 w-fit group-hover:from-[#9200BE]/30 group-hover:to-[#FF5500]/30 transition-all duration-300">
                  <BarChart3 className="h-8 w-8 text-[#FF5500] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FF5500] transition-colors duration-300">
                  Relatórios Detalhados
                </h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  Acompanhe o desempenho da sua página com relatórios mensais completos.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Portfólio */}
        <section id="portfolio" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF5500]/5 to-transparent"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-white/10 text-white mb-4">PORTFÓLIO</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Nosso{" "}
                <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  Portfólio
                </span>
              </h2>
              <p className="text-zinc-300 text-lg">
                Confira alguns dos projetos que desenvolvemos para nossos clientes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: "FuriApp Connect",
                  type: "Aplicação Web",
                  description: "Aplicação web para Furia Esports",
                  image: "/Furia.png",
                  link: "https://furiapp-connect.vercel.app/",
                },
                {
                  id: 2,
                  title: "Verda",
                  type: "Landing Page",
                  description: "Landing page para empresa de Design biofílico",
                  image: "/Verda.png",
                  link: "https://kzmg7rfdvhhixe21xxtc.lite.vusercontent.net/",
                },
                {
                  id: 3,
                  title: "HypeLink",
                  type: "Landing Page",
                  description: "Landing page para agencia de influenciadores",
                  image: "/HypeLink.png",
                  link: "https://kzmo3v5zmtzh61ugivcm.lite.vusercontent.net/",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-xl
                    ${item.id === 2 ? "scale-105 z-10 shadow-2xl" : ""}
                    transition-transform duration-300`}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="relative bg-zinc-900 rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0">
                      <Badge className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-white border-0 w-fit mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {item.type}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                        {item.title}
                      </h3>
                      <p className="text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                        {item.description}
                      </p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit"
                      >
                        <Button
                          variant="link"
                          className="p-0 text-[#FF5500] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-400 w-fit"
                        >
                          Ver projeto
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/*<div className="mt-12 text-center">
              <Button className="bg-white/10 hover:bg-white/20 text-white rounded-full px-8 py-6 backdrop-blur-sm">
                Ver todos os projetos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>*/}
          </div>
        </section>

        {/* Processo de Trabalho */}
        <section id="processo" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9200BE]/10 to-[#FF5500]/10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-white/10 text-white mb-4">PROCESSO SIMPLIFICADO</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Como{" "}
                <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  trabalhamos
                </span>
              </h2>
              <p className="text-zinc-300 text-lg">
                Nosso processo é simples e eficiente, garantindo resultados rápidos e de qualidade.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-30 blur-sm"></div>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-xl relative h-full">
                  <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#9200BE] to-[#FF5500] flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <div className="pt-6">
                    <h3 className="text-2xl font-bold mb-4">Briefing e Planejamento</h3>
                    <p className="text-zinc-400">
                      Entendemos suas necessidades e objetivos para criar uma estratégia personalizada para sua landing
                      page.
                    </p>
                    <div className="mt-6 flex items-center text-[#9200BE]">
                      <Clock className="h-5 w-5 mr-2" />
                      <span className="text-sm">Duração: 2-3 dias</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="relative mt-8 md:mt-16">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-30 blur-sm"></div>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-xl relative h-full">
                  <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#9200BE] to-[#FF5500] flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <div className="pt-6">
                    <h3 className="text-2xl font-bold mb-4">Design e Desenvolvimento</h3>
                    <p className="text-zinc-400">
                      Criamos sua landing page com foco em conversão, utilizando as melhores práticas de UX/UI.
                    </p>
                    <div className="mt-6 flex items-center text-[#9200BE]">
                      <Clock className="h-5 w-5 mr-2" />
                      <span className="text-sm">Duração: 5-7 dias</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="relative mt-8 md:mt-32">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-30 blur-sm"></div>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-xl relative h-full">
                  <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#9200BE] to-[#FF5500] flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <div className="pt-6">
                    <h3 className="text-2xl font-bold mb-4">Lançamento e Otimização</h3>
                    <p className="text-zinc-400">
                      Publicamos sua landing page e realizamos otimizações contínuas para maximizar os resultados.
                    </p>
                    <div className="mt-6 flex items-center text-[#9200BE]">
                      <Clock className="h-5 w-5 mr-2" />
                      <span className="text-sm">Duração: Contínuo</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Planos e Preços */}
        <section id="planos" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9200BE]/10 to-transparent"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-white/10 text-white mb-4">PLANOS FLEXÍVEIS</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Planos que{" "}
                <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  impulsionam
                </span>{" "}
                seu negócio
              </h2>
              <p className="text-zinc-300 text-lg">
                Escolha o plano ideal para suas necessidades e comece a decolar com a Astroya hoje mesmo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              {/* Plano Iniciante */}
              <Card className="flex flex-col bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(146,0,190,0.2)] hover:border-zinc-700 group h-full">
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#9200BE] transition-colors duration-300">
                    Iniciante
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">R$69,90</span>
                    <span className="text-zinc-400">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>1 Landing Page</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Hospedagem Inclusa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>1 Alteração Mensal</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Suporte por Email</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-full py-6 group-hover:bg-gradient-to-r group-hover:from-[#9200BE] group-hover:to-[#9200BE] transition-all duration-300">
                      Contratar Agora
                      <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Plano Essencial */}
              <Card className="flex flex-col bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(146,0,190,0.2)] hover:border-zinc-700 group h-full">
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#9200BE] transition-colors duration-300">
                    Essencial
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">R$109,90</span>
                    <span className="text-zinc-400">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>1 Landing Page</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Hospedagem Inclusa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>3 Alterações Mensais</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Suporte por WhatsApp</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Relatório Básico</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-full py-6 group-hover:bg-gradient-to-r group-hover:from-[#9200BE] group-hover:to-[#9200BE] transition-all duration-300">
                      Contratar Agora
                      <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Plano Avançado */}
              <Card className="flex flex-col bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(146,0,190,0.2)] hover:border-zinc-700 group h-full">
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#9200BE] transition-colors duration-300">
                    Avançado
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">R$149,90</span>
                    <span className="text-zinc-400">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>2 Landing Pages</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Hospedagem Inclusa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>5 Alterações Mensais</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Suporte Prioritário</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Relatório Completo</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Integração com CRM</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-full py-6 group-hover:bg-gradient-to-r group-hover:from-[#9200BE] group-hover:to-[#9200BE] transition-all duration-300">
                      Contratar Agora
                      <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Plano Premium */}
              <Card className="flex flex-col bg-gradient-to-br from-[#9200BE]/20 to-[#FF5500]/20 backdrop-blur-sm border-[#FF5500] overflow-hidden rounded-xl relative transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,85,0,0.4)] group h-full">
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#FF5500] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-[#9200BE] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#9200BE] to-[#FF5500] transform rotate-45 translate-x-8 -translate-y-8"></div>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-white border-0 px-3 py-1.5">
                    Mais vendido
                  </Badge>
                </div>
                <div className="p-8 relative z-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[#FF5500] transition-colors duration-300">
                    Premium
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">R$199,90</span>
                    <span className="text-zinc-400">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>3 Landing Pages</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Hospedagem Inclusa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Alterações Ilimitadas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Suporte VIP 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Relatório Avançado</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Integração com CRM</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#FF5500] mr-3 shrink-0" />
                      <span>Consultoria Mensal</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <Button className="w-full bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:opacity-90 text-white rounded-full py-6 shadow-lg shadow-[#FF5500]/20 transition-all duration-300 hover:shadow-[#FF5500]/40">
                      Contratar Agora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <p className="text-zinc-400 mb-6">Não tem certeza de qual plano escolher? Fale com um especialista.</p>
              <a
                href="https://api.whatsapp.com/send?phone=5541991820670&text=Olá!%20Gostaria%20de%20agendar%20uma%20consultoria%20gratuita%20com%20a%20Astroya."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  className="border-[#9200BE] text-[#9200BE] hover:bg-[#9200BE]/10 rounded-full px-6"
                >
                  Consultoria Gratuita
                  <Users className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>



        {/* Depoimentos */}
        {/*<section className="py-20 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9200BE] rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF5500] rounded-full blur-[150px] opacity-20"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-white/10 text-white mb-4">DEPOIMENTOS</Badge>
              <h2 className="text-4xl font-bold mb-6">
                O que nossos{" "}
                <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  clientes
                </span>{" "}
                dizem
              </h2>
              <p className="text-zinc-300 text-lg">
                Veja como a Astroya tem ajudado empresas a decolar no mundo digital.
              </p>
            </div>
            <TestimonialCarousel />
          </div>
        </section>*/}



        {/* Sobre Nós */}
        <section id="sobre" className="py-20 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9200BE] rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF5500] rounded-full blur-[150px] opacity-20"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-white/10 text-white mb-4">NOSSA EQUIPE</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Quem está por trás da{" "}
                <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  Astroya
                </span>
              </h2>
              <p className="text-zinc-300 text-lg">Conheça os especialistas que vão impulsionar seu negócio.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-xl relative h-full">
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-30"></div>
                      <Image
                        src="/placeholder.svg?height=192&width=192&text=Nathalia"
                        alt="Nathalia Artigas"
                        width={192}
                        height={192}
                        className="object-cover relative z-10"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Nathalia Artigas</h3>
                    <p className="text-[#9200BE] mb-4 font-medium">Fundadora & Desenvolvedora</p>
                    <p className="text-zinc-400">
                      Especialista em WordPress, React e UX/UI. Atua com APIs, performance, acessibilidade, SEO e interfaces responsivas.
                    </p>
                    <div className="flex justify-center space-x-4 mt-6">
                      <Link href="#" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
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
                          className="h-5 w-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </Link>
                      <Link href="#" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
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
                          className="h-5 w-5"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-xl relative h-full">
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-30"></div>
                      <Image
                        src="/placeholder.svg?height=192&width=192&text=Lorenzo"
                        alt="Lorenzo Sorrentino"
                        width={192}
                        height={192}
                        className="object-cover relative z-10"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Lorenzo Sorrentino</h3>
                    <p className="text-[#9200BE] mb-4 font-medium">Fundador & Desenvolvedor</p>
                    <p className="text-zinc-400">
                      Focado em HTML, CSS, JavaScript e personalização em WordPress. Trabalha com React, APIs e interfaces modernas com Bootstrap.
                    </p>
                    <div className="flex justify-center space-x-4 mt-6">
                      <Link href="#" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
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
                          className="h-5 w-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </Link>
                      <Link href="#" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
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
                          className="h-5 w-5"
                        >
                          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="mt-16 text-center max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-30 blur-sm"></div>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-xl relative">
                  <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                  <p className="text-zinc-300 text-lg">
                    Na Astroya, acreditamos que toda empresa merece uma presença online de qualidade. Nossa missão é
                    democratizar o acesso a landing pages profissionais e otimizadas, ajudando negócios de todos os
                    tamanhos a decolar no mundo digital.
                  </p>
                  <div className="mt-6 flex justify-center space-x-4">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-[#FF5500] mr-2" />
                      <span className="text-zinc-300">Qualidade</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-[#FF5500] mr-2" />
                      <span className="text-zinc-300">Agilidade</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-[#FF5500] mr-2" />
                      <span className="text-zinc-300">Inovação</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9200BE]/10 to-transparent"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-white/10 text-white mb-4">DÚVIDAS FREQUENTES</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Perguntas{" "}
                <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                  Frequentes
                </span>
              </h2>
              <p className="text-zinc-300 text-lg">
                Encontre respostas para as perguntas mais comuns sobre nossos serviços.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-20 blur-sm"></div>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 rounded-xl relative overflow-hidden">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-zinc-800 px-6">
                      <AccordionTrigger className="text-left py-6 text-lg hover:text-[#FF5500] transition-colors">
                        Qual o prazo para criação de uma landing page?
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-300 pb-6">
                        Nosso prazo médio é de 7 dias úteis para a entrega da primeira versão da sua landing page. Após
                        a aprovação, a página estará no ar em até 24 horas.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-zinc-800 px-6">
                      <AccordionTrigger className="text-left py-6 text-lg hover:text-[#FF5500] transition-colors">
                        Como funcionam as alterações mensais?
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-300 pb-6">
                        Dependendo do seu plano, você tem direito a um número específico de alterações por mês. Basta
                        enviar sua solicitação por email ou WhatsApp, e implementaremos as mudanças em até 48 horas.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-zinc-800 px-6">
                      <AccordionTrigger className="text-left py-6 text-lg hover:text-[#FF5500] transition-colors">
                        Posso cancelar meu plano a qualquer momento?
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-300 pb-6">
                        Sim, nossos planos são mensais e você pode cancelar a qualquer momento sem multa. Caso cancele,
                        sua landing page ficará disponível até o final do período já pago.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-zinc-800 px-6">
                      <AccordionTrigger className="text-left py-6 text-lg hover:text-[#FF5500] transition-colors">
                        A hospedagem está inclusa em todos os planos?
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-300 pb-6">
                        Sim, todos os nossos planos incluem hospedagem de alta performance, certificado SSL e proteção
                        contra ataques DDoS, sem custos adicionais.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-zinc-800 px-6">
                      <AccordionTrigger className="text-left py-6 text-lg hover:text-[#FF5500] transition-colors">
                        Como são os relatórios de desempenho?
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-300 pb-6">
                        Nossos relatórios incluem métricas como número de visitantes, taxa de conversão, tempo médio na
                        página e origem do tráfego. Dependendo do seu plano, você receberá relatórios básicos ou
                        avançados mensalmente.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </div>
              <div className="mt-12 text-center">
                <p className="text-zinc-400 mb-6">Ainda tem dúvidas? Entre em contato conosco.</p>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991820670&text=Olá!%20Tenho%20dúvidas%20sobre%20os%20serviços%20da%20Astroya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-white/10 hover:bg-white/20 text-white rounded-full px-6 backdrop-blur-sm">
                    Fale Conosco
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9200BE]/30 to-[#FF5500]/30"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-xl p-12 rounded-3xl border border-white/10">
              <div className="text-center">
                <Badge className="bg-white/20 text-white mb-6 px-4 py-1.5">COMECE AGORA</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Pronto para{" "}
                  <span className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                    decolar
                  </span>{" "}
                  com a Astroya?
                </h2>
                <p className="text-zinc-300 text-xl max-w-2xl mx-auto mb-8">
                  Dê o primeiro passo para transformar sua presença online e aumentar suas conversões com uma landing
                  page profissional.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://api.whatsapp.com/send?phone=5541991820670&text=Olá!%20Quero%20uma%20landing%20page%20profissional%20com%20a%20Astroya."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:opacity-90 text-white px-8 py-7 rounded-full text-lg shadow-xl shadow-[#FF5500]/20 transition-all duration-300 hover:scale-105">
                      Quero minha landing page
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-[#FF5500] mr-2" />
                    <span className="text-zinc-300">Garantia de 7 dias</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-[#FF5500] mr-2" />
                    <span className="text-zinc-300">Suporte em até 24h úteis</span>
                  </div>
                  <div className="flex items-center">
                    <Rocket className="h-5 w-5 text-[#FF5500] mr-2" />
                    <span className="text-zinc-300">Resultados em 30 dias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Consultoria Modal */}
      <ConsultoriaModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-16 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#9200BE] via-[#FF5500] to-[#9200BE]"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div>
                <div className="relative h-32 w-32 md:h-40 md:w-40 " >
                  <Image
                    src="/Logo_A_Foguete_Nome.svg"
                    alt="Logo Astroya"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-zinc-400 mb-2">Criamos landing pages profissionais com foco em conversão.</p>
              </div>

              <div className="flex space-x-4">
                <Link href="https://www.instagram.com/astroya.br/" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
                  <span className="sr-only">Instagram</span>
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
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="https://tiktok.com/@astroya.br" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
                  <span className="sr-only">TikTok</span>
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
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="https://www.linkedin.com/in/astroya-brasil-836a90366/" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
                  <span className="sr-only">LinkedIn</span>
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
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Links Rápidos</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#beneficios" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
                    Benefícios
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
                    Portfólio
                  </Link>
                </li>
                <li>
                  <Link href="#processo" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
                    Processo
                  </Link>
                </li>
                <li>
                  <Link href="#planos" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
                    Planos
                  </Link>
                </li>

                <li>
                  <Link href="#sobre" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-zinc-400 hover:text-[#9200BE] transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Contato</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-zinc-400">
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
                    className="h-5 w-5 mr-3 text-[#FF5500]"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  astroya.br@gmail.com
                </li>
                <li className="flex items-center text-zinc-400">
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
                    className="h-5 w-5 mr-3 text-[#FF5500]"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  +55 (41) 99182-0670
                </li>
                <li className="flex items-center text-zinc-400">
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
                    className="h-5 w-5 mr-3 text-[#FF5500]"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Curitiba, PR - Brasil
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Newsletter</h3>
              <p className="text-zinc-400 mb-4">Receba dicas e novidades sobre marketing digital.</p>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#9200BE] to-[#FF5500] opacity-50 blur-sm"></div>
                <div className="relative flex gap-2">
                  <input
                    type="email"
                    placeholder="Seu email"
                    className="bg-zinc-900 border border-zinc-800 rounded-l-full px-4 py-3 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#9200BE]"
                  />
                  <Button className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:opacity-90 text-white rounded-r-full">
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-900 mt-12 pt-8 text-center text-zinc-500 text-sm">
            <p>© {new Date().getFullYear()} Astroya. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Fixo */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9200BE] to-[#FF5500] blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        <a
          href="https://api.whatsapp.com/send?phone=5541991820670&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Astroya."
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="relative w-16 h-16 rounded-full bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:opacity-90 flex items-center justify-center shadow-lg shadow-[#FF5500]/20">
            <MessageCircle className="h-7 w-7" />
            <span className="sr-only">WhatsApp</span>
          </Button>
        </a>
      </div>
    </div>
  )
}
