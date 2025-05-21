"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Mariana Silva",
    role: "Consultora de Marketing",
    image: "/placeholder.svg?height=48&width=48",
    content:
      "A Astroya transformou completamente meu negócio. Minha landing page converteu 3x mais do que a anterior, e o suporte é incrível! Recomendo para todos que querem resultados reais.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rafael Costa",
    role: "Empresário",
    image: "/placeholder.svg?height=48&width=48",
    content:
      "Profissionalismo e resultados. A equipe da Astroya entendeu exatamente o que eu precisava e entregou uma landing page perfeita. O retorno sobre o investimento foi quase imediato.",
    rating: 5,
  },
  {
    id: 3,
    name: "Juliana Mendes",
    role: "Agência Digital",
    image: "/placeholder.svg?height=48&width=48",
    content:
      "As alterações mensais são um diferencial incrível. Minha página está sempre atualizada e os relatórios me ajudam a tomar decisões. A Astroya é parceira do nosso sucesso.",
    rating: 5,
  },
  {
    id: 4,
    name: "Carlos Eduardo",
    role: "E-commerce",
    image: "/placeholder.svg?height=48&width=48",
    content:
      "Depois que contratei a Astroya, minhas vendas aumentaram em 40%. A landing page é linda, rápida e totalmente otimizada para conversão. Vale cada centavo!",
    rating: 5,
  },
  {
    id: 5,
    name: "Fernanda Oliveira",
    role: "Startup de Tecnologia",
    image: "/placeholder.svg?height=48&width=48",
    content:
      "Estávamos com dificuldades para converter leads até encontrar a Astroya. Agora temos uma máquina de conversão que nos ajuda a crescer todos os meses.",
    rating: 5,
  },
]

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<typeof testimonials>([])

  useEffect(() => {
    const updateVisibleTestimonials = () => {
      if (window.innerWidth >= 1024) {
        // Show 3 testimonials on large screens
        setVisibleTestimonials(
          testimonials
            .slice(activeIndex, activeIndex + 3)
            .concat(testimonials.slice(0, Math.max(0, activeIndex + 3 - testimonials.length))),
        )
      } else if (window.innerWidth >= 768) {
        // Show 2 testimonials on medium screens
        setVisibleTestimonials(
          testimonials
            .slice(activeIndex, activeIndex + 2)
            .concat(testimonials.slice(0, Math.max(0, activeIndex + 2 - testimonials.length))),
        )
      } else {
        // Show 1 testimonial on small screens
        setVisibleTestimonials([testimonials[activeIndex]])
      }
    }

    updateVisibleTestimonials()
    window.addEventListener("resize", updateVisibleTestimonials)

    return () => {
      window.removeEventListener("resize", updateVisibleTestimonials)
    }
  }, [activeIndex])

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleTestimonials.map((testimonial, index) => (
          <div key={`${testimonial.id}-${index}`} className="relative group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#9200BE] to-[#FF5500] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-xl relative h-full">
              <div className="flex items-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#FF5500]" />
                ))}
              </div>
              <p className="text-zinc-300 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9200BE]/30 to-[#FF5500]/30 p-0.5 mr-4">
                  <div className="rounded-full overflow-hidden h-full w-full">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-[#9200BE] text-sm">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-4">
        <Button
          onClick={prevTestimonial}
          variant="outline"
          size="icon"
          className="rounded-full border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800 hover:text-[#9200BE]"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Anterior</span>
        </Button>
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                activeIndex === index ? "bg-gradient-to-r from-[#9200BE] to-[#FF5500]" : "bg-zinc-700 hover:bg-zinc-600"
              }`}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>
        <Button
          onClick={nextTestimonial}
          variant="outline"
          size="icon"
          className="rounded-full border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800 hover:text-[#9200BE]"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Próximo</span>
        </Button>
      </div>
    </div>
  )
}
