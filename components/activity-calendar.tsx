"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

// Mock data for the GitHub-style activity calendar
const generateMockCalendarData = () => {
  const data = []
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 120) // Go back ~4 months

  const exerciseTypes = ["Running", "Cycling", "Swimming", "Gym", "Yoga", "Walking", "Rest Day"]
  const durations = [15, 30, 45, 60, 75, 90]
  const distances = [2, 3, 5, 7, 10, 15]
  const calories = [100, 200, 300, 400, 500, 600, 700]

  for (let i = 0; i < 120; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    // Random activity level: 0-4 (0 = no activity, 4 = highest activity)
    const activityLevel = Math.floor(Math.random() * 5)

    // Generate workout details if there was activity
    let workout = null
    if (activityLevel > 0) {
      const exerciseType = exerciseTypes[Math.floor(Math.random() * (exerciseTypes.length - 1))]
      const duration = durations[Math.floor(Math.random() * durations.length)]
      const distance =
        exerciseType === "Running" || exerciseType === "Cycling" || exerciseType === "Swimming"
          ? distances[Math.floor(Math.random() * distances.length)]
          : null
      const calorie = calories[Math.floor(Math.random() * calories.length)]

      workout = {
        type: exerciseType,
        duration,
        distance,
        calories: calorie,
        time: `${Math.floor(Math.random() * 12) + 1}:${Math.random() > 0.5 ? "30" : "00"} ${Math.random() > 0.5 ? "AM" : "PM"}`,
      }
    }

    data.push({
      date: date.toISOString().split("T")[0],
      count: activityLevel,
      workout,
    })
  }

  return data
}

// Add Activity type

type Workout = {
  type: string;
  duration: number;
  distance: number | null;
  calories: number;
  time: string;
};

type Activity = {
  date: string;
  count: number;
  workout: Workout | null;
};

export function ActivityCalendar() {
  const [activityData, setActivityData] = useState<Activity[] | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<(Activity & { day: number }) | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const prevMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  const nextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  useEffect(() => {
    setActivityData(generateMockCalendarData())
  }, [])

  // Show loading state until activityData is ready
  if (!activityData) {
    return <div>Loading...</div>
  }

  // Get activity level for a specific date
  const getActivityLevel = (dateStr: string) => {
    const activity = activityData!.find((d) => d.date === dateStr)
    return activity ? activity.count : 0
  }

  // Get workout details for a specific date
  const getWorkoutDetails = (dateStr: string) => {
    const activity = activityData!.find((d) => d.date === dateStr)
    return activity ? activity.workout : null
  }

  // Get color based on activity level
  const getActivityColor = (level: number) => {
    if (level === 0) return "bg-gray-100"
    if (level === 1) return "bg-sky-100"
    if (level === 2) return "bg-sky-300"
    if (level === 3) return "bg-sky-500"
    return "bg-sky-700"
  }

  // Handle day click
  const handleDayClick = (day: (Activity & { day: number }) | null) => {
    if (day && day.workout) {
      setSelectedDay(day)
      setIsDialogOpen(true)
    }
  }

  // Generate calendar grid
  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const calendar: (Array<(Activity & { day: number }) | null>)[] = []
    let day = 1

    // Create weeks
    for (let i = 0; i < 6; i++) {
      const week: ((Activity & { day: number }) | null)[] = []

      // Create days in a week
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startingDayOfWeek) || day > daysInMonth) {
          // Empty cell
          week.push(null)
        } else {
          // Format date as YYYY-MM-DD
          const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          const count = getActivityLevel(date)
          const workout = getWorkoutDetails(date)

          week.push({
            day,
            date,
            count,
            workout,
          })

          day++
        }
      }

      calendar.push(week)

      // Stop if we've used all days
      if (day > daysInMonth) break
    }

    return calendar
  }

  // Only call renderCalendar after activityData is available
  const calendar = renderCalendar()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-medium">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day} className="text-xs text-center font-medium text-gray-500">
            {day}
          </div>
        ))}

        {calendar.map((week, weekIndex) =>
          week.map((day: (Activity & { day: number }) | null, dayIndex: number) => {
            if (day) {
              return (
                <div key={`${weekIndex}-${dayIndex}`} className="aspect-square flex items-center justify-center">
                  <div
                    className={`w-full h-full flex items-center justify-center text-xs rounded-sm cursor-pointer ${getActivityColor(
                      day.count,
                    )} ${day.workout ? "hover:ring-2 hover:ring-sky-400" : ""}`}
                    title={day.workout ? `${day.date}: ${day.workout.type}` : `${day.date}: No activity`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day.day}
                  </div>
                </div>
              )
            } else {
              return (
                <div key={`${weekIndex}-${dayIndex}`} className="aspect-square flex items-center justify-center">
                  <div className="w-full h-full"></div>
                </div>
              )
            }
          })
        )}
      </div>

      <div className="flex items-center justify-end gap-1 text-xs">
        <span className="text-gray-500">Less</span>
        <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
        <div className="w-3 h-3 bg-sky-100 rounded-sm"></div>
        <div className="w-3 h-3 bg-sky-300 rounded-sm"></div>
        <div className="w-3 h-3 bg-sky-500 rounded-sm"></div>
        <div className="w-3 h-3 bg-sky-700 rounded-sm"></div>
        <span className="text-gray-500">More</span>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Workout Details
              <DialogClose className="h-4 w-4 opacity-70" />
            </DialogTitle>
            <DialogDescription>{selectedDay && selectedDay.date}</DialogDescription>
          </DialogHeader>

          {selectedDay && selectedDay.workout && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100">{selectedDay.workout.type}</Badge>
                <span className="text-sm text-gray-500">{selectedDay.workout.time}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold">{selectedDay.workout.duration} min</div>
                  </CardContent>
                </Card>

                {selectedDay.workout.distance && (
                  <Card>
                    <CardContent className="p-3 text-center">
                      <div className="text-xs text-gray-500">Distance</div>
                      <div className="font-semibold">{selectedDay.workout.distance} km</div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-xs text-gray-500">Calories</div>
                    <div className="font-semibold">{selectedDay.workout.calories} cal</div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-sm">
                <p className="text-gray-500">
                  {selectedDay.workout.type === "Running" && "Great pace! Keep up the good work."}
                  {selectedDay.workout.type === "Cycling" && "Nice ride! You're making progress."}
                  {selectedDay.workout.type === "Swimming" && "Excellent swim session!"}
                  {selectedDay.workout.type === "Gym" && "Strong workout at the gym today."}
                  {selectedDay.workout.type === "Yoga" && "Namaste! Great flexibility improvement."}
                  {selectedDay.workout.type === "Walking" && "Good steps today, keep moving!"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
