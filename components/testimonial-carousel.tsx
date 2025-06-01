"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

const testimonials = [
  {
    name: "Carolina Silva",
    role: "Influenciadora de Lifestyle",
    image: "/placeholder.svg?height=100&width=100&text=CS",
    quote:
      "A HYPELINK transformou minha carreira. Em apenas 6 meses, triplicamos meu alcance e fechei contratos com marcas que eu sempre sonhei em trabalhar.",
  },
  {
    name: "Marcos Oliveira",
    role: "Diretor de Marketing, TechBrand",
    image: "/placeholder.svg?height=100&width=100&text=MO",
    quote:
      "Trabalhamos com várias agências antes, mas a HYPELINK entregou resultados incomparáveis. A curadoria de talentos é impecável e o ROI superou todas as nossas expectativas.",
  },
  {
    name: "Juliana Costa",
    role: "Creator de Conteúdo Fitness",
    image: "/placeholder.svg?height=100&width=100&text=JC",
    quote:
      "Desde que me juntei à HYPELINK, não apenas cresci em números, mas construí uma comunidade engajada e autêntica. Eles realmente se importam com a qualidade, não apenas com métricas.",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const isMobile = useMobile()

  const next = () => {
    setDirection(1)
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 8000)

    return () => clearInterval(interval)
  }, [current])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 md:p-8 backdrop-blur-sm">
      <div className="absolute -left-3 -top-3 rounded-full border border-zinc-800 bg-zinc-900 p-1 md:p-2">
        <Quote className="h-3 w-3 md:h-5 md:w-5 text-[#FF0066]" />
      </div>

      <div className="relative h-[250px] md:h-[300px] overflow-hidden">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          >
            <div className="mb-4 md:mb-6 h-14 w-14 md:h-20 md:w-20 overflow-hidden rounded-full border-2 border-[#FF0066]">
              <Image
                src={testimonials[current].image || "/placeholder.svg"}
                alt={testimonials[current].name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mb-4 md:mb-6 text-base md:text-xl italic text-zinc-300">"{testimonials[current].quote}"</p>
            <div>
              <h4 className="font-bold text-sm md:text-base">{testimonials[current].name}</h4>
              <p className="text-xs md:text-sm text-zinc-400">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -bottom-3 md:-bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-1 md:space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1)
              setCurrent(index)
            }}
            className={`h-1.5 md:h-2 transition-all ${index === current ? "bg-[#FF0066] w-4 md:w-6" : "bg-zinc-600 w-1.5 md:w-2"} rounded-full`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute -left-3 md:-left-4 top-1/2 flex h-6 w-6 md:h-8 md:w-8 -translate-y-1/2 transform items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
      </button>

      <button
        onClick={next}
        className="absolute -right-3 md:-right-4 top-1/2 flex h-6 w-6 md:h-8 md:w-8 -translate-y-1/2 transform items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
      </button>
    </div>
  )
}
