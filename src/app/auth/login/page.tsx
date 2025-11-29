/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/login", user);
      console.log("Login success", response.data);
      toast.success("Login Success");
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-900 via-violet-800 to-violet-700 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-xl border-t-4 border-violet-500">
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-2">
          {loading ? "Processing..." : "Welcome Back"}
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Login to continue your AI Interview journey
        </p>

        <div className="space-y-6">
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
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <button
            onClick={onLogin}
            disabled={buttonDisabled}
            className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
              buttonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:opacity-90 shadow-md"
            }`}
          >
            {buttonDisabled ? "Fill in details" : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link href="/auth/register" className="text-violet-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}