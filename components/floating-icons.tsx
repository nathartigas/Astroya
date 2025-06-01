"use client"

import { motion } from "framer-motion"
import { Heart, Star, Zap, TrendingUp, Award } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

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
          className="absolute text-[#FF0066]"
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
