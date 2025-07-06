"use client"
import { Sidebar } from "@/components/sidebar"
import { ActivityCalendar } from "@/components/activity-calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function CalendarPage() {
  const [activityData, setActivityData] = useState(null)

  useEffect(() => {
    // setActivityData(generateMockCalendarData())
  }, [])

  if (!activityData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b px-6 py-3">
          <h1 className="text-2xl font-bold">Activity Calendar</h1>
        </header>
        <main className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Workout Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityCalendar />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
