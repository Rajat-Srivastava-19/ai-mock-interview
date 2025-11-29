/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/register", user);
      console.log("Registration success", response.data);
      toast.success("Account created successfully");
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Registration failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { username, email, password } = user;
    setButtonDisabled(!(username && email && password));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-900 via-violet-800 to-violet-700 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-xl border-t-4 border-violet-500">
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-2">
          {loading ? "Processing..." : "Create Account"}
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Join the AI Interview revolution today
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Choose a username"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <button
            onClick={onRegister}
            disabled={buttonDisabled}
            className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
              buttonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:opacity-90 shadow-md"
            }`}
          >
            {buttonDisabled ? "Fill in all fields" : "Register"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-violet-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}