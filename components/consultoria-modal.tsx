"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface ConsultoriaModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ConsultoriaModal({ isOpen, onClose }: ConsultoriaModalProps) {
    const [formData, setFormData] = useState({
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRadioChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Formulário enviado:", formData)
        // Aqui você adicionaria a lógica para enviar o formulário para seu backend
        alert("Formulário enviado com sucesso! Entraremos em contato em breve.")
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl mx-auto bg-zinc-950 rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-hidden">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-30 blur-sm -z-10"></div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9200BE] to-[#FF5500] text-transparent bg-clip-text">
                        Formulário de Inscrição para Consultoria
                    </h2>
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

                <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[48vh] pr-2 custom-scrollbar">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Informações de Contato</h3>

                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome completo</Label>
                            <Input
                                id="nome"
                                name="nome"
                                placeholder="Para sabermos como te chamar"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] ml-[4px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail para contato</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Importante para envio de materiais e follow-up"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] ml-[4px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="empresa">Nome da empresa</Label>
                            <Input
                                id="empresa"
                                name="empresa"
                                value={formData.empresa}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] ml-[4px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="telefone">Número de telefone (com DDD)</Label>
                            <Input
                                id="telefone"
                                name="telefone"
                                placeholder="Caso seja necessário um contato direto"
                                value={formData.telefone}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] ml-[4px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="segmento">Segmento da empresa</Label>
                            <Input
                                id="segmento"
                                name="segmento"
                                placeholder="Ex: Moda, Educação, Alimentação, Tecnologia..."
                                value={formData.segmento}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] ml-[4px]"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                        <h3 className="text-lg font-semibold text-white">Sobre sua presença online</h3>

                        <div className="space-y-2">
                            <Label>Você já possui um site ou landing page atualmente?</Label>
                            <RadioGroup
                                value={formData.possuiSite}
                                onValueChange={(value) => handleRadioChange("possuiSite", value)}
                                className="flex space-x-8 ml-[4px]"
                                required
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sim" id="site-sim" className="border-[#9200BE]" />
                                    <Label htmlFor="site-sim" className="cursor-pointer">
                                        Sim
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="nao" id="site-nao" className="border-[#9200BE]" />
                                    <Label htmlFor="site-nao" className="cursor-pointer">
                                        Não
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {formData.possuiSite === "sim" && (
                            <div className="space-y-2">
                                <Label htmlFor="linkSite">Se sim, coloque o link aqui:</Label>
                                <Input
                                    id="linkSite"
                                    name="linkSite"
                                    value={formData.linkSite}
                                    onChange={handleChange}
                                    className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] ml-[4px]"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label>Qual é o objetivo principal da sua landing page?</Label>
                            <RadioGroup
                                value={formData.objetivo}
                                onValueChange={(value) => handleRadioChange("objetivo", value)}
                                className="space-y-2 ml-[4px]"
                                required
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="leads" id="obj-leads" className="border-[#9200BE]" />
                                    <Label htmlFor="obj-leads" className="cursor-pointer">
                                        Captar leads
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="produto" id="obj-produto" className="border-[#9200BE]" />
                                    <Label htmlFor="obj-produto" className="cursor-pointer">
                                        Vender um produto
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="servico" id="obj-servico" className="border-[#9200BE]" />
                                    <Label htmlFor="obj-servico" className="cursor-pointer">
                                        Apresentar um serviço
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="eventos" id="obj-eventos" className="border-[#9200BE]" />
                                    <Label htmlFor="obj-eventos" className="cursor-pointer">
                                        Inscrição para eventos
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="outro" id="obj-outro" className="border-[#9200BE]" />
                                    <Label htmlFor="obj-outro" className="cursor-pointer">
                                        Outro
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {formData.objetivo === "outro" && (
                            <div className="space-y-2">
                                <Label htmlFor="outroObjetivo">Especifique:</Label>
                                <Input
                                    id="outroObjetivo"
                                    name="outroObjetivo"
                                    value={formData.outroObjetivo}
                                    onChange={handleChange}
                                    className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] ml-[4px]"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="servicos">Quais serviços/produtos você quer destacar na sua landing page?</Label>
                            <Textarea
                                id="servicos"
                                name="servicos"
                                placeholder="Responda com o máximo de clareza"
                                value={formData.servicos}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] min-h-[100px] ml-[4px]"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                        <h3 className="text-lg font-semibold text-white">Sobre a identidade e o público</h3>

                        <div className="space-y-2">
                            <Label>Você já possui uma identidade visual definida (logo, paleta de cores, fontes)?</Label>
                            <RadioGroup
                                value={formData.identidadeVisual}
                                onValueChange={(value) => handleRadioChange("identidadeVisual", value)}
                                className="flex flex-wrap gap-4 ml-[4px]"
                                required
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sim" id="id-sim" className="border-[#9200BE]" />
                                    <Label htmlFor="id-sim" className="cursor-pointer">
                                        Sim
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="nao" id="id-nao" className="border-[#9200BE]" />
                                    <Label htmlFor="id-nao" className="cursor-pointer">
                                        Não
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="processo" id="id-processo" className="border-[#9200BE]" />
                                    <Label htmlFor="id-processo" className="cursor-pointer">
                                        Em processo
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="publicoAlvo">Qual o seu público-alvo?</Label>
                            <Textarea
                                id="publicoAlvo"
                                name="publicoAlvo"
                                placeholder="Descreva com quem você quer se comunicar"
                                value={formData.publicoAlvo}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] min-h-[100px] ml-[4px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="referencia">
                                Existe alguma referência de design ou site que você gosta e queira se inspirar?
                            </Label>
                            <Input
                                id="referencia"
                                name="referencia"
                                placeholder="Link ou nome do site"
                                value={formData.referencia}
                                onChange={handleChange}
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] ml-[4px]"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                        <h3 className="text-lg font-semibold text-white">Sobre o momento da empresa</h3>

                        <div className="space-y-2">
                            <Label>Em qual fase sua empresa está?</Label>
                            <RadioGroup
                                value={formData.fase}
                                onValueChange={(value) => handleRadioChange("fase", value)}
                                className="flex flex-wrap gap-4 ml-[4px]"
                                required
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="iniciando" id="fase-iniciando" className="border-[#9200BE]" />
                                    <Label htmlFor="fase-iniciando" className="cursor-pointer">
                                        Iniciando
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="crescimento" id="fase-crescimento" className="border-[#9200BE]" />
                                    <Label htmlFor="fase-crescimento" className="cursor-pointer">
                                        Em crescimento
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="consolidada" id="fase-consolidada" className="border-[#9200BE]" />
                                    <Label htmlFor="fase-consolidada" className="cursor-pointer">
                                        Consolidada
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="reformulacao" id="fase-reformulacao" className="border-[#9200BE]" />
                                    <Label htmlFor="fase-reformulacao" className="cursor-pointer">
                                        Em reformulação
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dificuldades">
                                Quais são suas maiores dificuldades hoje em relação à presença digital da sua empresa?
                            </Label>
                            <Textarea
                                id="dificuldades"
                                name="dificuldades"
                                value={formData.dificuldades}
                                onChange={handleChange}
                                required
                                className="bg-zinc-900 border-zinc-800 focus:border-[#9200BE] min-h-[100px] ml-[4px]"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-[#9200BE] to-[#FF5500] hover:opacity-90 text-white px-8 py-6 rounded-full shadow-lg shadow-[#FF5500]/20 transition-all duration-300 hover:scale-105 ml-[4px]"
                        >
                            Enviar Formulário
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
