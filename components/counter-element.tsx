"use client"

import { useEffect, useState, useRef } from "react"

interface CounterElementProps {
  end: number
  duration?: number
  decimals?: number
}

export function CounterElement({ end, duration = 2, decimals = 0 }: CounterElementProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const frameRef = useRef(0)
  const startTimeRef = useRef(0)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const progress = (timestamp - startTimeRef.current) / (duration * 1000)

      if (progress < 1) {
        countRef.current = Math.min(end * progress, end)
        setCount(countRef.current)
        frameRef.current = requestAnimationFrame(animate)
      } else {
        countRef.current = end
        setCount(end)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
    }
  }, [end, duration])

  return <>{count.toFixed(decimals)}</>
}
