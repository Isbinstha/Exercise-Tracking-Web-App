"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Mock data for the progress chart
const monthlyData = [
  { month: "Jan", steps: 7200, target: 8000, time: 620 },
  { month: "Feb", steps: 7800, target: 8000, time: 680 },
  { month: "Mar", steps: 8500, target: 8000, time: 720 },
  { month: "Apr", steps: 9178, target: 9200, time: 748 },
  { month: "May", steps: 8700, target: 9200, time: 690 },
  { month: "Jun", steps: 9300, target: 9200, time: 780 },
  { month: "Jul", steps: 8900, target: 9200, time: 750 },
  { month: "Aug", steps: 9500, target: 9200, time: 820 },
  { month: "Sep", steps: 9100, target: 9200, time: 760 },
  { month: "Oct", steps: 8800, target: 9200, time: 740 },
]

export function EnhancedProgressChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentMonth = "Apr"
  const currentData = monthlyData.find((d) => d.month === currentMonth)
  const currentSteps = currentData?.steps || 9178
  const targetSteps = currentData?.target || 9200
  const totalTime = currentData?.time || 748

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
    const padding = { top: 40, right: 30, bottom: 60, left: 30 }
    const innerWidth = chartWidth - padding.left - padding.right
    const innerHeight = chartHeight - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, chartWidth, chartHeight)

    // Find max value for scaling
    const maxValue = Math.max(...monthlyData.map((d) => Math.max(d.steps, d.target))) * 1.1

    // Create smooth curve points
    const points = monthlyData.map((data, i) => ({
      x: padding.left + (i * innerWidth) / (monthlyData.length - 1),
      y: chartHeight - padding.bottom - (data.steps / maxValue) * innerHeight,
      data,
    }))

    // Draw gradient fill area
    const gradient = ctx.createLinearGradient(0, padding.top, 0, chartHeight - padding.bottom)
    gradient.addColorStop(0, "rgba(14, 165, 233, 0.3)") // sky-500 with opacity
    gradient.addColorStop(1, "rgba(14, 165, 233, 0)")

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    // Create smooth curve using quadratic curves
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1]
      const currentPoint = points[i]
      const controlX = (prevPoint.x + currentPoint.x) / 2

      ctx.quadraticCurveTo(controlX, prevPoint.y, currentPoint.x, currentPoint.y)
    }

    // Complete the area fill
    ctx.lineTo(points[points.length - 1].x, chartHeight - padding.bottom)
    ctx.lineTo(points[0].x, chartHeight - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw the main line
    ctx.strokeStyle = "#0ea5e9" // sky-500
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1]
      const currentPoint = points[i]
      const controlX = (prevPoint.x + currentPoint.x) / 2

      ctx.quadraticCurveTo(controlX, prevPoint.y, currentPoint.x, currentPoint.y)
    }

    ctx.stroke()

    // Draw month labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "center"

    monthlyData.forEach((data, i) => {
      const x = padding.left + (i * innerWidth) / (monthlyData.length - 1)
      const y = chartHeight - 20

      // Highlight current month
      if (data.month === currentMonth) {
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.roundRect(x - 15, y - 15, 30, 20, 10)
        ctx.fill()

        ctx.fillStyle = "#0ea5e9"
        ctx.fillText(data.month, x, y - 2)
      } else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText(data.month, x, y)
      }
    })

    // Draw highlighted point for current month
    const currentPoint = points.find((p) => p.data.month === currentMonth)
    if (currentPoint) {
      // Draw outer white circle
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(currentPoint.x, currentPoint.y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Draw inner colored circle
      ctx.fillStyle = "#ef4444" // red-500 for the highlight point
      ctx.beginPath()
      ctx.arc(currentPoint.x, currentPoint.y, 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw tooltip
      const tooltipX = currentPoint.x
      const tooltipY = currentPoint.y - 40
      const tooltipWidth = 80
      const tooltipHeight = 30

      // Tooltip background
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.beginPath()
      ctx.roundRect(tooltipX - tooltipWidth / 2, tooltipY - tooltipHeight / 2, tooltipWidth, tooltipHeight, 6)
      ctx.fill()

      // Tooltip text
      ctx.fillStyle = "#ffffff"
      ctx.font = "11px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${currentSteps.toLocaleString()}`, tooltipX, tooltipY - 2)
      ctx.fillText("Steps", tooltipX, tooltipY + 10)
    }
  }, [currentSteps])

  return (
    <Card className="bg-gradient-to-br from-sky-500 to-sky-600 text-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Overview</h3>
          <Button variant="ghost" className="text-white hover:bg-white/10 h-8 px-3 text-sm">
            Monthly
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="w-full h-[180px] mb-6">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xs text-white/70 mb-1">Total Time</div>
              <div className="text-xl font-bold text-white">{totalTime} Hr</div>
              <div className="text-xs text-white/70">{currentMonth}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 border-white/30 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xs text-white/70 mb-1">Total Steps</div>
              <div className="text-xl font-bold text-white">{currentSteps.toLocaleString()} St</div>
              <div className="text-xs text-white/70">{currentMonth}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xs text-white/70 mb-1">Target</div>
              <div className="text-xl font-bold text-white">{targetSteps.toLocaleString()} St</div>
              <div className="text-xs text-white/70">{currentMonth}</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
