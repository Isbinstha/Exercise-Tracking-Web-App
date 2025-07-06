"use client"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Target } from "lucide-react"

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      title: "5K Runner",
      description: "Complete your first 5K run",
      icon: Trophy,
      earned: true,
      date: "Jun 2023",
      color: "text-purple-600 bg-purple-100",
    },
    {
      id: 2,
      title: "30-Day Streak",
      description: "Work out for 30 consecutive days",
      icon: Medal,
      earned: true,
      date: "May 2023",
      color: "text-purple-600 bg-purple-100",
    },
    {
      id: 3,
      title: "100 Workouts",
      description: "Complete 100 total workouts",
      icon: Award,
      earned: true,
      date: "Apr 2023",
      color: "text-purple-600 bg-purple-100",
    },
    {
      id: 4,
      title: "10K Runner",
      description: "Complete your first 10K run",
      icon: Target,
      earned: false,
      progress: 75,
      color: "text-gray-400 bg-gray-100",
    },
    {
      id: 5,
      title: "Strength Master",
      description: "Lift 1000kg total in one session",
      icon: Trophy,
      earned: false,
      progress: 45,
      color: "text-gray-400 bg-gray-100",
    },
    {
      id: 6,
      title: "Marathon Ready",
      description: "Complete a marathon distance",
      icon: Medal,
      earned: false,
      progress: 20,
      color: "text-gray-400 bg-gray-100",
    },
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b px-6 py-3">
          <h1 className="text-2xl font-bold">Achievements</h1>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <Card key={achievement.id} className={achievement.earned ? "border-purple-200" : "border-gray-200"}>
                  <CardHeader className="text-center">
                    <div
                      className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-2 ${achievement.color}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        Earned {achievement.date}
                      </Badge>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">{achievement.progress}% complete</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
