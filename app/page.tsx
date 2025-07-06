"use client";

import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <Dashboard />
    </div>
  )
}
