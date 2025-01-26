"use client";

import { useState, useEffect } from "react";
import UserPanel from "@/components/General/UserPanel";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/orders/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                setError("Failed to fetch orders.");
            }
        } catch (error) {
            setError("Error fetching orders.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <UserPanel />
            <div className="w-full md:w-3/4 p-6">
                <div className="p-6 bg-lightPink rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-darkPink mb-4">Orders</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {!error && orders.length > 0 ? (
                        <ul className="space-y-4">
                            {orders.map((order, index) => (
                                <li
                                    key={index}
                                    className="p-4 border border-gray rounded-lg bg-white shadow-sm"
                                >
                                    <p><strong>Order ID:</strong> {order._id}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
