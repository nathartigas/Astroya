"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlowingButtonProps {
  children: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export function GlowingButton({ children, className, size = "default" }: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      {isHovered && (
        <motion.div
          layoutId="glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -inset-px rounded-full bg-gradient-to-r from-[#FF5500] to-orange-600 blur-md"
        />
      )}
      <Button
        className={cn(
          "relative bg-[#FF5500] hover:bg-[#FF5500] transition-all duration-300 hover:scale-105 z-10",
          className,
        )}
        size={size}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Button>
    </div>
  )
}
