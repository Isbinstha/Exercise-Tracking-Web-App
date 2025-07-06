"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, Home, MessageSquare, PlusCircle, Settings, Trophy, User, Users, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/calendar", icon: Calendar, label: "Activity Calendar" },
    { href: "/statistics", icon: BarChart3, label: "Statistics" },
    { href: "/achievements", icon: Trophy, label: "Achievements" },
    { href: "/social", icon: Users, label: "Friends" },
    { href: "/messages", icon: MessageSquare, label: "Messages" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="w-64 h-full bg-white border-r flex flex-col">
      <div className="p-4 flex items-center gap-2">
        <div className="bg-sky-500 text-white p-2 rounded-lg">
          <BarChart3 className="h-5 w-5" />
        </div>
        <span className="font-semibold text-lg">FitTrack</span>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive ? "text-sky-600 bg-sky-50" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
          {/* Logout button below settings */}
          {session && (
            <li>
              <Button
                variant="ghost"
                className="flex items-center gap-3 w-full mt-4 text-gray-700 hover:bg-sky-50 justify-start"
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
              >
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </Button>
            </li>
          )}
        </ul>
      </nav>

      <div className="p-4">
        <Link href="/log-workout">
          <button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2 transition-colors">
            <PlusCircle className="h-5 w-5" />
            <span>Log Workout</span>
          </button>
        </Link>
      </div>
    </div>
  )
}
