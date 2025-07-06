"use client"
import { Flame, Clock, TrendingUp } from "lucide-react"

export function WorkoutStats() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm text-gray-500">This Week</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Flame className="h-4 w-4 text-sky-500" />
              <span>Calories</span>
            </div>
            <div className="text-xl font-semibold">3,500</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4 text-sky-500" />
              <span>Time</span>
            </div>
            <div className="text-xl font-semibold">5h 20m</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <TrendingUp className="h-4 w-4 text-sky-500" />
              <span>Workouts</span>
            </div>
            <div className="text-xl font-semibold">4</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-sm text-gray-500">Efficiency</div>
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset="50.24"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold">80%</span>
            <span className="text-xs text-gray-500">of goal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
