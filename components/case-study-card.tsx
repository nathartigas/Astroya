"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"

interface CaseStudyProps {
  title: string
  description: string
  image: string
  stats: { label: string; value: string }[]
  tags: string[]
}

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
