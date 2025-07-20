"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {
        console.log("Logging in", user);
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="backdrop-blur-md bg-white/10 border border-white/30 shadow-xl rounded-2xl p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>

                <div className="flex flex-col gap-4 text-white">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                            className="p-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter your password"
                            className="p-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <button
                        onClick={onLogin}
                        className="mt-4 bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200"
                    >
                        Login
                    </button>

                    <Link href="/auth/register" className="text-sm text-blue-300 hover:underline text-center mt-4">
                        Don’t have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
