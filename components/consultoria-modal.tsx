"use client"

import { FormEvent, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ConsultoriaModalProps {
    isOpen: boolean
    onClose: () => void
}

interface FormData {
    nome: string
    email: string
    empresa: string
    telefone: string
    segmento: string
    possuiSite: string
    linkSite: string
    objetivo: string
    outroObjetivo: string
    servicos: string
    identidadeVisual: string
    publicoAlvo: string
    referencia: string
    fase: string
    dificuldades: string
}

export function ConsultoriaModal({ isOpen, onClose }: ConsultoriaModalProps) {
    const [formData, setFormData] = useState<FormData>({
        nome: "",
        email: "",
        empresa: "",
        telefone: "",
        segmento: "",
        possuiSite: "",
        linkSite: "",
        objetivo: "",
        outroObjetivo: "",
        servicos: "",
        identidadeVisual: "",
        publicoAlvo: "",
        referencia: "",
        fase: "",
        dificuldades: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleRadioChange = (name: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitError(null)

        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

            const response = await fetch('/api/enviar-consultoria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                signal: controller.signal
            })

            clearTimeout(timeoutId)

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`)
            }

            const result = await response.json()

            if (!result.success) {
                throw new Error(result.message || 'Erro ao processar formulário')
            }

            // Reset do formulário
            setFormData({
                nome: "",
                email: "",
                empresa: "",
                telefone: "",
                segmento: "",
                possuiSite: "",
                linkSite: "",
                objetivo: "",
                outroObjetivo: "",
                servicos: "",
                identidadeVisual: "",
                publicoAlvo: "",
                referencia: "",
                fase: "",
                dificuldades: "",
            })

            alert('Formulário enviado com sucesso!')
            onClose()

        } catch (error: any) {
            const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido'
            setSubmitError(errorMsg)
            console.error('Erro no envio:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl mx-auto bg-zinc-950 rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-30 blur-sm -z-10"></div>

                <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="text-2xl font-bold tracking-tighter group relative flex items-center justify-center md:justify-start">
                        <Image
                            src="/Logo_A_Foguete.svg"
                            alt="Astroya logo"
                            width={100}
                            height={10}
                            className="transition-all duration-300 group-hover:opacity-80"
                            priority
                        />
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Fechar</span>
                    </Button>
                </div>

                <div className="text-zinc-400 mb-6">
                    <p>Criação de Landing Pages - Preencha os campos abaixo para agendar sua consultoria gratuita</p>
                </div>

                {submitError && (
                    <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                        <p>Erro ao enviar formulário: {submitError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[48vh] pr-2 custom-scrollbar">
                    {/* Seção 1: Informações de Contato */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Informações de Contato</h3>

                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome completo*</Label>
                            <Input
                                id="nome"
                                name="nome"
                                placeholder="Para sabermos como te chamar"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail para contato*</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Importante para envio de materiais"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="empresa">Nome da empresa*</Label>
                            <Input
                                id="empresa"
                                name="empresa"
                                value={formData.empresa}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="telefone">Número de telefone*</Label>
                            <Input
                                id="telefone"
                                name="telefone"
                                placeholder="Com DDD"
                                value={formData.telefone}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="segmento">Segmento da empresa*</Label>
                            <Input
                                id="segmento"
                                name="segmento"
                                placeholder="Ex: Moda, Educação, Tecnologia..."
                                value={formData.segmento}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE]"
                            />
                        </div>
                    </div>

                    {/* Seção 2: Presença Online */}
                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                        <h3 className="text-lg font-semibold text-white">Sobre sua presença online</h3>

                        <div className="space-y-2">
                            <Label>Você já possui um site ou landing page?*</Label>
                            <RadioGroup
                                value={formData.possuiSite}
                                onValueChange={(value) => handleRadioChange("possuiSite", value)}
                                className="flex space-x-8"
                                required
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sim" id="site-sim" className="border-[#9200BE]" />
                                    <Label htmlFor="site-sim" className="cursor-pointer">Sim</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="nao" id="site-nao" className="border-[#9200BE]" />
                                    <Label htmlFor="site-nao" className="cursor-pointer">Não</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {formData.possuiSite === "sim" && (
                            <div className="space-y-2">
                                <Label htmlFor="linkSite">Link do site</Label>
                                <Input
                                    id="linkSite"
                                    name="linkSite"
                                    placeholder="https://..."
                                    value={formData.linkSite}
                                    onChange={handleChange}
                                    className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE]"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label>Objetivo principal*</Label>
                            <RadioGroup
                                value={formData.objetivo}
                                onValueChange={(value) => handleRadioChange("objetivo", value)}
                                className="space-y-2"
                                required
                            >
                                {['leads', 'produto', 'servico', 'eventos'].map((opcao) => (
                                    <div key={opcao} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opcao} id={`obj-${opcao}`} className="border-[#9200BE]" />
                                        <Label htmlFor={`obj-${opcao}`} className="cursor-pointer">
                                            {opcao === 'leads' && 'Captar leads'}
                                            {opcao === 'produto' && 'Vender produto'}
                                            {opcao === 'servico' && 'Oferecer serviço'}
                                            {opcao === 'eventos' && 'Inscrição para eventos'}
                                        </Label>
                                    </div>
                                ))}
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="outro" id="obj-outro" className="border-[#9200BE]" />
                                    <Label htmlFor="obj-outro" className="cursor-pointer">Outro</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {formData.objetivo === "outro" && (
                            <div className="space-y-2">
                                <Label htmlFor="outroObjetivo">Especifique*</Label>
                                <Input
                                    id="outroObjetivo"
                                    name="outroObjetivo"
                                    value={formData.outroObjetivo}
                                    onChange={handleChange}
                                    required
                                    className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE]"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="servicos">Serviços/produtos*</Label>
                            <Textarea
                                id="servicos"
                                name="servicos"
                                placeholder="Descreva com detalhes"
                                value={formData.servicos}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] min-h-[100px]"
                            />
                        </div>
                    </div>

                    {/* Seção 3: Identidade Visual */}
                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                        <h3 className="text-lg font-semibold text-white">Identidade Visual</h3>

                        <div className="space-y-2">
                            <Label>Possui identidade visual definida?*</Label>
                            <RadioGroup
                                value={formData.identidadeVisual}
                                onValueChange={(value) => handleRadioChange("identidadeVisual", value)}
                                className="flex flex-wrap gap-4"
                                required
                            >
                                {['sim', 'nao', 'processo'].map((opcao) => (
                                    <div key={opcao} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opcao} id={`id-${opcao}`} className="border-[#9200BE]" />
                                        <Label htmlFor={`id-${opcao}`} className="cursor-pointer">
                                            {opcao === 'sim' && 'Sim'}
                                            {opcao === 'nao' && 'Não'}
                                            {opcao === 'processo' && 'Em processo'}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="publicoAlvo">Público-alvo*</Label>
                            <Textarea
                                id="publicoAlvo"
                                name="publicoAlvo"
                                placeholder="Descreva seu público ideal"
                                value={formData.publicoAlvo}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="referencia">Referências de design</Label>
                            <Input
                                id="referencia"
                                name="referencia"
                                placeholder="Links ou exemplos"
                                value={formData.referencia}
                                onChange={handleChange}
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE]"
                            />
                        </div>
                    </div>

                    {/* Seção 4: Sobre a Empresa */}
                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                        <h3 className="text-lg font-semibold text-white">Sobre a Empresa</h3>

                        <div className="space-y-2">
                            <Label>Fase atual da empresa*</Label>
                            <RadioGroup
                                value={formData.fase}
                                onValueChange={(value) => handleRadioChange("fase", value)}
                                className="flex flex-wrap gap-4"
                                required
                            >
                                {['iniciando', 'crescimento', 'consolidada', 'reformulacao'].map((opcao) => (
                                    <div key={opcao} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opcao} id={`fase-${opcao}`} className="border-[#9200BE]" />
                                        <Label htmlFor={`fase-${opcao}`} className="cursor-pointer">
                                            {opcao === 'iniciando' && 'Iniciando'}
                                            {opcao === 'crescimento' && 'Em crescimento'}
                                            {opcao === 'consolidada' && 'Consolidada'}
                                            {opcao === 'reformulacao' && 'Em reformulação'}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dificuldades">Dificuldades atuais*</Label>
                            <Textarea
                                id="dificuldades"
                                name="dificuldades"
                                placeholder="Desafios com presença digital"
                                value={formData.dificuldades}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] min-h-[100px]"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:opacity-90 text-white px-8 py-6 rounded-full shadow-lg shadow-[#FF5500]/20 transition-all duration-300 hover:scale-105"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </span>
                            ) : 'Enviar Formulário'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}