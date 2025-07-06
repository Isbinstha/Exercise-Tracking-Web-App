"use client";
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function SettingsPage() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user?email=${encodeURIComponent(session.user.email)}`)
        .then(res => res.json())
        .then(data => {
          setSettings(data.settings || {});
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleChange = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess("");
    await fetch("/api/user/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session?.user?.email, settings }),
    });
    setSaving(false);
    setSuccess("Settings saved!");
  };

  if (loading) return <div>Loading...</div>;
  if (!session) return <div>Please log in to view settings.</div>;

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b px-6 py-3">
          <h1 className="text-2xl font-bold">Settings</h1>
        </header>
        <main className="p-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your app preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="units">Measurement Units</Label>
                  <Select value={settings?.units || "metric"} onValueChange={v => handleChange("units", v)}>
                    <SelectTrigger id="units">
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, km)</SelectItem>
                      <SelectItem value="imperial">Imperial (lb, mi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">App Theme</Label>
                  <Select value={settings?.theme || "light"} onValueChange={v => handleChange("theme", v)}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Workout Reminders</Label>
                  <p className="text-sm text-gray-500">Get reminded about your scheduled workouts</p>
                </div>
                <Switch checked={!!settings?.workoutReminders} onCheckedChange={v => handleChange("workoutReminders", v)} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Achievement Notifications</Label>
                  <p className="text-sm text-gray-500">Get notified when you earn new achievements</p>
                </div>
                <Switch checked={!!settings?.achievementNotifications} onCheckedChange={v => handleChange("achievementNotifications", v)} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Social Activity</Label>
                  <p className="text-sm text-gray-500">Get notified about friend activities</p>
                </div>
                <Switch checked={!!settings?.socialActivity} onCheckedChange={v => handleChange("socialActivity", v)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Manage your privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-visibility">Profile Visibility</Label>
                <Select value={settings?.profileVisibility || "friends"} onValueChange={v => handleChange("profileVisibility", v)}>
                  <SelectTrigger id="profile-visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show in Leaderboards</Label>
                  <p className="text-sm text-gray-500">Allow others to see your ranking</p>
                </div>
                <Switch checked={!!settings?.showInLeaderboards} onCheckedChange={v => handleChange("showInLeaderboards", v)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Storage</CardTitle>
              <CardDescription>Manage your data and storage preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-sync with fitness devices</Label>
                  <p className="text-sm text-gray-500">Automatically import data from connected devices</p>
                </div>
                <Switch checked={!!settings?.autoSync} onCheckedChange={v => handleChange("autoSync", v)} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Data Export</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save All Settings"}
            </Button>
            {success && <span className="ml-4 text-green-600">{success}</span>}
          </div>
        </main>
      </div>
    </div>
  )
}
