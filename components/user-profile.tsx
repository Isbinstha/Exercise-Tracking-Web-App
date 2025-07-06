"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Camera, Edit } from "lucide-react"

export function UserProfile() {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user?email=${encodeURIComponent(session.user.email)}`)
        .then(res => res.json())
        .then(data => {
          setUserDetails(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session]);

  if (status === "loading" || loading) return <div>Loading...</div>;
  if (!session || !userDetails) return <div>No user data found.</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userDetails.avatar || "/placeholder.svg"} alt={userDetails.name || "User"} />
                <AvatarFallback>{userDetails.name ? userDetails.name.split(" ").map((n: string) => n[0]).join("") : "U"}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">{userDetails.name}</h2>
              <p className="text-gray-500">{userDetails.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {userDetails.achievements && userDetails.achievements.length > 0 ? (
                  userDetails.achievements.map((ach: any, idx: number) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      <span>{ach.title}</span>
                    </Badge>
                  ))
                ) : (
                  <Badge variant="secondary">No Achievements</Badge>
                )}
              </div>
            </div>

            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="goals">Fitness Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue={userDetails.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={userDetails.email} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={userDetails.username} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Fitness Goals</CardTitle>
              <CardDescription>Set and track your fitness objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userDetails.goals ? (
                <div>{userDetails.goals}</div>
              ) : (
                <div>No fitness goals set.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your fitness milestones and badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userDetails.achievements && userDetails.achievements.length > 0 ? (
                  userDetails.achievements.map((ach: any, idx: number) => (
                    <div key={idx} className="flex flex-col items-center p-4 border rounded-lg">
                      <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                        {/* You can add an icon here if available */}
                      </div>
                      <span className="font-medium text-center">{ach.title}</span>
                      <span className="text-xs text-gray-500">{ach.date || ""}</span>
                    </div>
                  ))
                ) : (
                  <div>No achievements yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
