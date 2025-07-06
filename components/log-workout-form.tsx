"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, MapPin, Mic, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export function LogWorkoutForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [workoutType, setWorkoutType] = useState("running")

  return (
    <Tabs defaultValue="quick" className="space-y-4">
      <TabsList>
        <TabsTrigger value="quick">Quick Add</TabsTrigger>
        <TabsTrigger value="detailed">Detailed</TabsTrigger>
        <TabsTrigger value="voice">Voice Input</TabsTrigger>
      </TabsList>

      <TabsContent value="quick" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Add Workout</CardTitle>
            <CardDescription>Log your workout with minimal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workout-type">Workout Type</Label>
                <Select value={workoutType} onValueChange={setWorkoutType}>
                  <SelectTrigger id="workout-type">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="cycling">Cycling</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="gym">Gym Workout</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workout-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="45" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input id="distance" type="number" placeholder="5.0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input id="calories" type="number" placeholder="350" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex">
                  <Input id="location" placeholder="Central Park" />
                  <Button variant="ghost" size="icon" className="ml-2">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Save Workout</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="detailed">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Workout</CardTitle>
            <CardDescription>Log comprehensive details about your workout</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="detailed-workout-type">Workout Type</Label>
                <Select defaultValue="gym">
                  <SelectTrigger id="detailed-workout-type">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="cycling">Cycling</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="gym">Gym Workout</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="detailed-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>8:30 AM</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Exercises</h3>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Add Exercise
                </Button>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="exercise-name">Exercise</Label>
                      <Select defaultValue="bench-press">
                        <SelectTrigger id="exercise-name">
                          <SelectValue placeholder="Select exercise" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bench-press">Bench Press</SelectItem>
                          <SelectItem value="squat">Squat</SelectItem>
                          <SelectItem value="deadlift">Deadlift</SelectItem>
                          <SelectItem value="shoulder-press">Shoulder Press</SelectItem>
                          <SelectItem value="pull-up">Pull Up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sets">Sets</Label>
                      <Input id="sets" type="number" placeholder="3" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reps">Reps</Label>
                      <Input id="reps" type="number" placeholder="10" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" type="number" placeholder="60" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="exercise-name-2">Exercise</Label>
                      <Select defaultValue="squat">
                        <SelectTrigger id="exercise-name-2">
                          <SelectValue placeholder="Select exercise" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bench-press">Bench Press</SelectItem>
                          <SelectItem value="squat">Squat</SelectItem>
                          <SelectItem value="deadlift">Deadlift</SelectItem>
                          <SelectItem value="shoulder-press">Shoulder Press</SelectItem>
                          <SelectItem value="pull-up">Pull Up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sets-2">Sets</Label>
                      <Input id="sets-2" type="number" placeholder="4" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reps-2">Reps</Label>
                      <Input id="reps-2" type="number" placeholder="8" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight-2">Weight (kg)</Label>
                      <Input id="weight-2" type="number" placeholder="80" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Add notes about your workout..." />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Save Workout</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="voice">
        <Card>
          <CardHeader>
            <CardTitle>Voice Input</CardTitle>
            <CardDescription>Log your workout using voice commands</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-6">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
              <Mic className="h-10 w-10 text-purple-600" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-500">Press the button and start speaking</p>
              <p className="text-sm text-gray-400">Try saying: "I ran 5 kilometers in 30 minutes today"</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">Start Recording</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
