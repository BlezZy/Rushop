"use client";

import { useState } from "react";
import Button from "@/_components/general/Button";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid login credentials");
            }

            const data = await response.json();

            localStorage.setItem("authToken", data.token);
            window.location.href = "/";
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-24">
            <form
                onSubmit={handleLogin}
                className="w-1/2 bg-lightPink p-8 rounded-card shadow-card flex flex-col justify-center space-y-6"
            >
                <h1 className="text-4xl py-4 font-primary text-darkPink text-center">
                    Welcome Back
                </h1>
                <p className="text-gray-600 text-sm text-center py-2">
                    Please log in to continue to your account.
                </p>
                <div className="space-y-4 w-1/4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray rounded-card focus:outline-none focus:ring-2 focus:ring-darkPink text-sm"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray rounded-card focus:outline-none focus:ring-2 focus:ring-darkPink text-sm"
                    />
                </div>
                <div className="flex justify-center">
                    <Button
                        variant="primary"
                        size="small"
                        className="px-6 py-2 transition-transform transform hover:scale-105"
                    >
                        Login
                    </Button>
                </div>
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-darkPink hover:underline"
                    >
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
