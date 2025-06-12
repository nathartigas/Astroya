"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface StatsCounterProps {
  value: number
  suffix?: string
  className?: string
  duration?: number
}

export function StatsCounter({ value, suffix = "", className = "", duration = 2000 }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4)
      const easedProgress = easeOutQuart(percentage)

      const animatedValue = easedProgress * value
      const formattedValue = value % 1 === 0 ? Math.round(animatedValue) : parseFloat(animatedValue.toFixed(2))
      setCount(formattedValue)

      if (percentage < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      startTimeRef.current = null
    }
  }, [isInView, value, duration])

  return (
    <div ref={ref} className={className}>
      {count.toLocaleString("pt-BR")}
      {suffix}
    </div>
  )
}
