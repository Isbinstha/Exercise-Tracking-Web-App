import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClientSessionProvider } from "@/components/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FitTrack - Exercise Tracking App",
  description: "Track your workouts and fitness progress",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
