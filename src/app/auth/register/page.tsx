"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    console.log(router)

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/auth/register", user); 
            console.log("Signup successfull", response.data);
            router.push("/auth/login");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="backdrop-blur-md bg-white/10 border border-white/30 shadow-xl rounded-2xl p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">{loading ? "Processing" : "Signup"}</h1>

                <div className="flex flex-col gap-4 text-white">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-1 text-sm font-medium">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Enter your username"
                            className="p-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

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
                        onClick={onSignup}
                        className="mt-4 bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200"
                    >
                        {buttonDisabled ? "No signup" : "Signup"}
                    </button>

                    <Link href="/auth/login" className="text-sm text-blue-300 hover:underline text-center mt-4">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
