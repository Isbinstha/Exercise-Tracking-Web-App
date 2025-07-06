"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bike, MonitorIcon as Running, Dumbbell } from "lucide-react"

export function WorkoutChallenges() {
  const challenges = [
    {
      id: 1,
      title: "Bicycle Drill",
      icon: Bike,
      progress: 45,
      current: "17",
      target: "30km",
      daysLeft: 2,
    },
    {
      id: 2,
      title: "Jogging Hero",
      icon: Running,
      progress: 13,
      current: "2",
      target: "12km",
      daysLeft: 17,
    },
    {
      id: 3,
      title: "Strength Master",
      icon: Dumbbell,
      progress: 60,
      current: "3",
      target: "5 sessions",
      daysLeft: 4,
    },
  ]

  return (
    <div className="space-y-4">
      {challenges.map((challenge) => {
        const Icon = challenge.icon
        return (
          <Card key={challenge.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-sky-100 p-2 rounded-lg">
                  <Icon className="h-5 w-5 text-sky-600" />
                </div>
                <div className="font-medium">{challenge.title}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{challenge.progress}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    {challenge.current}/{challenge.target}
                  </span>
                  <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
                    {challenge.daysLeft} days left
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
