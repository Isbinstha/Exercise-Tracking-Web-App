"use client"
import { Sidebar } from "@/components/sidebar"
import { LogWorkoutForm } from "@/components/log-workout-form"

export default function LogWorkoutPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b px-6 py-3">
          <h1 className="text-2xl font-bold">Log Workout</h1>
        </header>
        <main className="p-6">
          <LogWorkoutForm />
        </main>
      </div>
    </div>
  )
}
