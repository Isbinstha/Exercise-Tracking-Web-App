"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Award,
  Calendar,
  Clock,
  Flame,
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Search,
  Share2,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react"

// Mock data for social feed
const socialPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      initials: "SJ",
    },
    time: "2 hours ago",
    content:
      "Just completed my first 10K run! So proud of this achievement. The weather was perfect and I managed to maintain a steady pace throughout.",
    workout: {
      type: "Running",
      distance: "10 km",
      duration: "55 min",
      calories: 550,
      location: "Central Park",
    },
    likes: 24,
    comments: 8,
    liked: true,
  },
  {
    id: 2,
    user: {
      name: "Mike Wilson",
      avatar: "/placeholder.svg",
      initials: "MW",
    },
    time: "Yesterday",
    content: "Hit a new personal record on bench press today! Hard work is paying off.",
    workout: {
      type: "Strength Training",
      duration: "65 min",
      calories: 420,
      location: "City Gym",
    },
    achievement: {
      title: "New PR",
      description: "Bench Press: 100kg",
    },
    likes: 18,
    comments: 5,
    liked: false,
  },
  {
    id: 3,
    user: {
      name: "Emma Davis",
      avatar: "/placeholder.svg",
      initials: "ED",
    },
    time: "2 days ago",
    content: "Morning yoga session to start the day right. Feeling centered and energized!",
    workout: {
      type: "Yoga",
      duration: "45 min",
      calories: 180,
      location: "Home",
    },
    likes: 12,
    comments: 3,
    liked: false,
  },
]

const friendRequests = [
  {
    id: 1,
    name: "David Lee",
    avatar: "/placeholder.svg",
    initials: "DL",
    mutualFriends: 3,
    time: "2 days ago",
  },
  {
    id: 2,
    name: "Jessica Taylor",
    avatar: "/placeholder.svg",
    initials: "JT",
    mutualFriends: 5,
    time: "1 week ago",
  },
]

const suggestedFriends = [
  {
    id: 1,
    name: "Robert Chen",
    avatar: "/placeholder.svg",
    initials: "RC",
    mutualFriends: 2,
  },
  {
    id: 2,
    name: "Lisa Wong",
    avatar: "/placeholder.svg",
    initials: "LW",
    mutualFriends: 4,
  },
  {
    id: 3,
    name: "Mark Johnson",
    avatar: "/placeholder.svg",
    initials: "MJ",
    mutualFriends: 1,
  },
]

const leaderboard = [
  { rank: 1, name: "Alex Thompson", points: 2450, change: "+2" },
  { rank: 2, name: "Sarah Johnson", points: 2380, change: "+1" },
  { rank: 3, name: "Mike Wilson", points: 2320, change: "-1" },
  { rank: 4, name: "Emma Davis", points: 2280, change: "0" },
  { rank: 5, name: "John Doe", points: 2250, change: "+3" },
]

export function SocialFeed() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="feed" className="space-y-4">
          <TabsList>
            <TabsTrigger value="feed">Activity Feed</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="requests">
              Requests <Badge className="ml-1 bg-sky-500">2</Badge>
            </TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4">
            {socialPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                        <AvatarFallback>{post.user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.user.name}</p>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p>{post.content}</p>

                  {post.achievement && (
                    <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 flex items-center gap-3">
                      <div className="bg-sky-600 text-white p-2 rounded-full">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sky-900">{post.achievement.title}</p>
                        <p className="text-sm text-sky-700">{post.achievement.description}</p>
                      </div>
                    </div>
                  )}

                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
                          {post.workout.type}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{post.workout.location}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        {post.workout.distance && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-sky-500" />
                            <span>{post.workout.distance}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-sky-500" />
                          <span>{post.workout.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-sky-500" />
                          <span>{post.workout.calories} cal</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 ${post.liked ? "text-sky-600" : ""}`}
                      >
                        <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="friends">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Your Friends</h3>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search friends..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Sarah Johnson", "Mike Wilson", "Emma Davis", "Alex Thompson"].map((friend) => (
                    <div key={friend} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt={friend} />
                          <AvatarFallback>
                            {friend
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{friend}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-medium">Friend Requests</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {friendRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                            <AvatarFallback>{request.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{request.name}</p>
                            <p className="text-sm text-gray-500">
                              {request.mutualFriends} mutual friends • {request.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                            Accept
                          </Button>
                          <Button variant="outline" size="sm">
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-medium">People You May Know</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suggestedFriends.map((suggestion) => (
                      <div key={suggestion.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={suggestion.avatar || "/placeholder.svg"} alt={suggestion.name} />
                            <AvatarFallback>{suggestion.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{suggestion.name}</p>
                            <p className="text-sm text-gray-500">{suggestion.mutualFriends} mutual friends</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <UserPlus className="h-4 w-4" />
                          Add Friend
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="challenges">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">30-Day Running Challenge</h3>
                    <Badge className="bg-sky-500">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Run at least 5km every day for 30 days</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-sky-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <span className="text-sm font-medium">18/30 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>24 participants</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Weekly Strength Challenge</h3>
                    <Badge variant="outline">Join</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Complete 3 strength training sessions this week</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>12 participants</span>
                    <Calendar className="h-4 w-4 ml-2" />
                    <span>Ends in 3 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-sky-600" />
              <h3 className="font-medium">Leaderboard</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.rank === 1
                          ? "bg-yellow-100 text-yellow-800"
                          : user.rank === 2
                            ? "bg-gray-100 text-gray-800"
                            : user.rank === 3
                              ? "bg-orange-100 text-orange-800"
                              : "bg-sky-100 text-sky-800"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{user.points}</div>
                    <div
                      className={`text-xs ${
                        user.change.startsWith("+")
                          ? "text-green-600"
                          : user.change.startsWith("-")
                            ? "text-red-600"
                            : "text-gray-500"
                      }`}
                    >
                      {user.change !== "0" && user.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-sky-600" />
              <h3 className="font-medium">Recent Achievements</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-sky-100 p-2 rounded-full">
                  <Trophy className="h-4 w-4 text-sky-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">5K Runner</p>
                  <p className="text-xs text-gray-500">Sarah Johnson</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-sky-100 p-2 rounded-full">
                  <Award className="h-4 w-4 text-sky-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Strength Master</p>
                  <p className="text-xs text-gray-500">Mike Wilson</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-sky-100 p-2 rounded-full">
                  <Trophy className="h-4 w-4 text-sky-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Consistency King</p>
                  <p className="text-xs text-gray-500">Alex Thompson</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
