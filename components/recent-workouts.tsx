"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Flame, MapPin, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for recent workouts
const recentWorkouts = [
  {
    id: 1,
    type: "Running",
    date: "Today, 8:30 AM",
    duration: "45 min",
    calories: 420,
    distance: "5.2 km",
    location: "Central Park",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg",
      initials: "JD",
    },
  },
  {
    id: 2,
    type: "Strength Training",
    date: "Yesterday, 6:15 PM",
    duration: "60 min",
    calories: 380,
    location: "Home Gym",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg",
      initials: "JD",
    },
  },
  {
    id: 3,
    type: "Cycling",
    date: "Jun 10, 7:00 AM",
    duration: "75 min",
    calories: 650,
    distance: "25 km",
    location: "Riverside Trail",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg",
      initials: "JD",
    },
  },
]

export function RecentWorkouts() {
  return (
    <div className="space-y-4">
      {recentWorkouts.map((workout) => (
        <div
          key={workout.id}
          className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={workout.user.avatar || "/placeholder.svg"} alt={workout.user.name} />
            <AvatarFallback>{workout.user.initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{workout.type}</span>
                <Badge variant="outline" className="text-xs font-normal bg-sky-50 text-sky-700 border-sky-200">
                  {workout.calories} cal
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{workout.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{workout.duration}</span>
              </div>
              {workout.distance && (
                <div className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5" />
                  <span>{workout.distance}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{workout.location}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
