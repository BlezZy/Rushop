"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import UserProfile from "@/components/Header/UserProfile";
import Button from "@/components/General/Button";

export default function UserMenu() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        <Link href="/public" />
    };

    return (
        <div className="flex items-center space-x-4">
            {isLoggedIn ? (
                <UserProfile onLogout={handleLogout} />
            ) : (
                <>
                    <Link href="/login">
                        <Button variant="primary" size="small">Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="secondary" size="small">Register</Button>
                    </Link>
                </>
            )}
        </div>
    );
}
