"use client"

import { useEffect, useRef } from "react"

export function HeroGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGradient = () => {
      time += 0.003

      // Create gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 200,
        canvas.height / 2 + Math.cos(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8,
      )

      // Add colors
      gradient.addColorStop(0, "rgba(255, 0, 102, 0.15)")
      gradient.addColorStop(0.5, "rgba(128, 0, 128, 0.05)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      // Fill with gradient
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(drawGradient)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    drawGradient()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}
