"use client"

import { useEffect, useRef } from "react"

// Mock data for the progress chart
const weeklyData = [
  { day: "Mon", calories: 320, target: 500 },
  { day: "Tue", calories: 480, target: 500 },
  { day: "Wed", calories: 650, target: 500 },
  { day: "Thu", calories: 420, target: 500 },
  { day: "Fri", calories: 580, target: 500 },
  { day: "Sat", calories: 750, target: 500 },
  { day: "Sun", calories: 300, target: 500 },
]

export function ProgressChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)

    // Chart dimensions
    const chartWidth = rect.width
    const chartHeight = rect.height
    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const innerWidth = chartWidth - padding.left - padding.right
    const innerHeight = chartHeight - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, chartWidth, chartHeight)

    // Find max value for scaling
    const maxValue = Math.max(...weeklyData.map((d) => Math.max(d.calories, d.target))) * 1.2

    // Draw bars
    const barWidth = innerWidth / weeklyData.length / 2
    const barSpacing = innerWidth / weeklyData.length

    weeklyData.forEach((data, i) => {
      const x = padding.left + i * barSpacing + barSpacing / 2 - barWidth / 2
      const barHeight = (data.calories / maxValue) * innerHeight
      const y = chartHeight - padding.bottom - barHeight

      // Draw bar
      ctx.fillStyle = "#7c3aed" // Purple-600
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
      ctx.fill()

      // Draw target line
      const targetY = chartHeight - padding.bottom - (data.target / maxValue) * innerHeight

      if (i > 0) {
        const prevX = padding.left + (i - 1) * barSpacing + barSpacing / 2
        const prevTargetY = chartHeight - padding.bottom - (weeklyData[i - 1].target / maxValue) * innerHeight

        ctx.strokeStyle = "#d1d5db" // Gray-300
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(prevX, prevTargetY)
        ctx.lineTo(x + barWidth / 2, targetY)
        ctx.stroke()
      }

      // Draw day label
      ctx.fillStyle = "#6b7280" // Gray-500
      ctx.font = "12px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(data.day, x + barWidth / 2, chartHeight - 10)
    })

    // Draw y-axis labels
    ctx.fillStyle = "#6b7280" // Gray-500
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "right"

    const yAxisSteps = 5
    for (let i = 0; i <= yAxisSteps; i++) {
      const value = Math.round((maxValue / yAxisSteps) * i)
      const y = chartHeight - padding.bottom - (value / maxValue) * innerHeight

      ctx.fillText(value.toString(), padding.left - 10, y + 4)
    }
  }, [])

  return (
    <div className="w-full h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
