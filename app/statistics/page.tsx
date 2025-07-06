"use client";

import { Sidebar } from "@/components/sidebar"
import { ProgressChart } from "@/components/progress-chart"
import { WorkoutStats } from "@/components/workout-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StatisticsPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b px-6 py-3">
          <h1 className="text-2xl font-bold">Statistics</h1>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Workout Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <WorkoutStats />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
