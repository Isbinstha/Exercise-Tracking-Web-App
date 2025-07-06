"use client"

import { useState } from "react"
import { Bell, ChevronDown, Download, MoreHorizontal, Search, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ActivityCalendar } from "@/components/activity-calendar"
import { WorkoutStats } from "@/components/workout-stats"
import { EnhancedProgressChart } from "@/components/enhanced-progress-chart"
import { RecentWorkouts } from "@/components/recent-workouts"
import { FitnessCard } from "@/components/fitness-card"
import { WorkoutChallenges } from "@/components/workout-challenges"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signIn } from "next-auth/react"

export function Dashboard() {
  const { data: session, status } = useSession()
  const [searchQuery, setSearchQuery] = useState("")

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="text-2xl font-bold mb-4">Welcome to Exercise Tracker</div>
        <Button onClick={() => signIn()} className="absolute top-6 right-6">Login</Button>
        <div className="text-gray-600 mt-2">Please log in to use the system features.</div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <header className="sticky top-0 z-10 bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 w-full max-w-md">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search exercises, workouts..."
            className="border-none shadow-none focus-visible:ring-0 pl-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-sky-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3">
                  <div className="font-medium">New Friend Request</div>
                  <div className="text-sm text-gray-500">Sarah Johnson sent you a friend request</div>
                  <div className="text-xs text-gray-400 mt-1">2 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3">
                  <div className="font-medium">Workout Reminder</div>
                  <div className="text-sm text-gray-500">Your scheduled run is in 30 minutes</div>
                  <div className="text-xs text-gray-400 mt-1">15 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3">
                  <div className="font-medium">Achievement Unlocked!</div>
                  <div className="text-sm text-gray-500">You've earned the "5-Day Streak" badge</div>
                  <div className="text-xs text-gray-400 mt-1">Yesterday</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center font-medium text-sky-500">
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/profile">
            <Avatar className="cursor-pointer">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <span>This Week</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <EnhancedProgressChart />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <FitnessCard />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Activity Calendar</CardTitle>
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ActivityCalendar />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Workout Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <WorkoutStats />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Recent Workouts</CardTitle>
                <Link href="/statistics">
                  <Button variant="link" className="text-sky-600">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <RecentWorkouts />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Challenges</CardTitle>
                <Link href="/social">
                  <Button variant="link" className="text-sky-600">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <WorkoutChallenges />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
