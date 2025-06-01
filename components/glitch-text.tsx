"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  highlightWord?: string
  highlightColor?: string
}

export function GlitchText({ text, className, highlightWord, highlightColor = "#FF0066" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  const words = text.split(" ")

  return (
    <h1 className={cn("relative", className)}>
      {words.map((word, index) => {
        const isHighlighted = word === highlightWord

        return (
          <span key={index} className="relative inline-block">
            {isHighlighted ? (
              <span className="relative">
                <span className="relative z-10" style={{ color: highlightColor }}>
                  {word}
                </span>
                <span
                  className="absolute -bottom-1 left-0 z-0 h-3 w-full"
                  style={{ backgroundColor: `${highlightColor}20`, filter: "blur(4px)" }}
                ></span>
              </span>
            ) : (
              <span>
                {isGlitching && Math.random() > 0.7 ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
                    <span className="absolute left-0 top-0 text-[#FF0066] opacity-80 blur-[1px] transform translate-x-[1px] translate-y-[1px]">
                      {word}
                    </span>
                    <span className="absolute left-0 top-0 text-cyan-400 opacity-80 blur-[1px] transform -translate-x-[1px] -translate-y-[1px]">
                      {word}
                    </span>
                    <span>{word}</span>
                  </motion.span>
                ) : (
                  word
                )}
              </span>
            )}
            {index < words.length - 1 ? " " : ""}
          </span>
        )
      })}
    </h1>
  )
}
