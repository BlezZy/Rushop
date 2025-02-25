"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/General/Button";
import UserPanel from "@/components/General/UserPanel";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: "", surname: "", email: "" });
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:4000/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    setFormData({
                        name: userData.name,
                        surname: userData.surname,
                        email: userData.email,
                    });
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserProfile();
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch("http://localhost:4000/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser.user);
                setIsEditing(false);
            } else {
                console.error("Failed to update user profile.");
            }
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <UserPanel />
            <div className="w-full md:w-3/4 p-6">
                <div className="p-6 bg-lightPink rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-darkPink mb-4">Personal Information</h2>
                    {isEditing ? (
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray rounded-lg focus:ring focus:ring-darkPink"
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray rounded-lg focus:ring focus:ring-darkPink"
                                placeholder="Surname"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray rounded-lg focus:ring focus:ring-darkPink"
                                placeholder="Email"
                            />
                            <div className="flex space-x-4">
                                <Button variant="primary" size="medium" onClick={handleSave}>
                                    Save
                                </Button>
                                <Button variant="secondary" size="medium" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p>
                                <strong>Name:</strong> {user?.name}
                            </p>
                            <p>
                                <strong>Surname:</strong> {user?.surname}
                            </p>
                            <p>
                                <strong>Email:</strong> {user?.email}
                            </p>
                            <Button variant="primary" size="medium" onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
