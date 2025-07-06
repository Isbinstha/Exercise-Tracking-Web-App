"use client"
import { Card } from "@/components/ui/card"
import { Dumbbell, Heart, Flame } from "lucide-react"

export function FitnessCard() {
  return (
    <Card className="bg-sky-600 text-white overflow-hidden relative h-[200px]">
      <div className="p-6 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <div className="bg-white/20 p-1.5 rounded-md">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div className="bg-white/20 p-1.5 rounded-md">
              <Heart className="h-5 w-5" />
            </div>
          </div>
          <span className="text-sm font-medium">FitTrack Pro</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5" />
            <span className="text-sm font-medium">Weekly Goal</span>
          </div>
          <div className="text-2xl font-bold">4/5 Workouts</div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="bg-white h-full rounded-full" style={{ width: "80%" }}></div>
          </div>
          <div className="text-xs">1 more workout to reach your weekly goal</div>
        </div>
      </div>
    </Card>
  )
}
