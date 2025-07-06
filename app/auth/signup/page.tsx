"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [code, setCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [verifySuccess, setVerifySuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setShowVerify(false);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess("Registration successful! Please check your email for a verification code.");
        setShowVerify(true);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError("");
    setVerifySuccess("");
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, code }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setVerifyError(data.message || "Verification failed");
    } else {
      setVerifySuccess("Email verified! Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 1500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" value={form.username} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <div className="text-center text-sm mt-2">
              Already have an account? <a href="/auth/login" className="text-sky-600 hover:underline">Login</a>
            </div>
          </form>
          {showVerify && (
            <form onSubmit={handleVerify} className="space-y-4 mt-6">
              <div>
                <Label htmlFor="code">Verification Code</Label>
                <Input id="code" name="code" value={code} onChange={e => setCode(e.target.value)} required />
              </div>
              {verifyError && <div className="text-red-500 text-sm">{verifyError}</div>}
              {verifySuccess && <div className="text-green-600 text-sm">{verifySuccess}</div>}
              <Button type="submit" className="w-full">Verify Email</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 