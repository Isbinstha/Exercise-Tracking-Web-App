"use client"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      initials: "SJ",
      lastMessage: "Great workout today! Want to go for a run tomorrow?",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      name: "Mike Wilson",
      avatar: "/placeholder.svg",
      initials: "MW",
      lastMessage: "Thanks for the workout tips!",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "/placeholder.svg",
      initials: "ED",
      lastMessage: "See you at yoga class",
      time: "Yesterday",
      unread: false,
    },
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b px-6 py-3">
          <h1 className="text-2xl font-bold">Messages</h1>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    >
                      <Avatar>
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>{conversation.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.name}</p>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread && <div className="w-2 h-2 bg-purple-600 rounded-full"></div>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Sarah Johnson" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-96">
                <div className="flex-1 space-y-4 mb-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Hey! How was your workout today?</p>
                      <span className="text-xs text-gray-500">10:30 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-purple-600 text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">It was great! Hit a new PR on bench press 💪</p>
                      <span className="text-xs text-purple-200">10:32 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Awesome! Want to go for a run tomorrow morning?</p>
                      <span className="text-xs text-gray-500">10:35 AM</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
