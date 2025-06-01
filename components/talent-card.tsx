"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, Users } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface TalentProps {
  name: string
  niche: string
  followers: string
  engagement: string
}

export function TalentCard({ talent }: { talent: TalentProps }) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMobile()

  return (
    <motion.div
      className="group flex flex-col items-center text-center"
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative mb-3 md:mb-4">
        <motion.div
          className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#FF0066] to-purple-600 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            opacity: isHovered ? 0.7 : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        />

        <div className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 overflow-hidden rounded-full border-2 border-zinc-800 bg-zinc-900 transition-all duration-300 group-hover:border-[#FF0066] group-hover:shadow-[0_0_20px_rgba(255,0,102,0.3)]">
          <Image
            src={`/placeholder.svg?height=200&width=200&text=${talent.name}`}
            alt={talent.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity"
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="flex flex-col items-center space-y-1 md:space-y-2">
              <div className="flex items-center space-x-1 text-xs md:text-sm">
                <Users className="h-2 w-2 md:h-3 md:w-3 text-[#FF0066]" />
                <span>{talent.followers}</span>
              </div>
              <div className="text-[10px] md:text-xs text-zinc-400">{talent.engagement} engagement</div>
              <div className="mt-1 md:mt-2 rounded-full bg-[#FF0066]/20 p-1 md:p-2">
                <Instagram className="h-3 w-3 md:h-4 md:w-4 text-[#FF0066]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <h3 className="text-sm md:text-lg font-bold">{talent.name}</h3>
      <p className="text-xs md:text-sm text-zinc-400">{talent.niche}</p>
    </motion.div>
  )
}
