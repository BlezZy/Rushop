"use client";

import { useRouter, usePathname } from "next/navigation";

export default function UserPanel() {
    const router = useRouter();
    const pathname = usePathname();

    const panelItems = [
        { label: "Profile", path: "/profile" },
        { label: "Addresses", path: "/profile/addresses" },
        { label: "Orders", path: "/profile/orders" },
    ];

    return (
        <div className="w-full md:w-1/4 bg-lightPink p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-darkPink mb-6">User Panel</h2>
            <ul className="space-y-4">
                {panelItems.map((item) => (
                    <li key={item.path}>
                        <button
                            className={`w-full text-left px-4 py-2 rounded-lg ${
                                pathname === item.path ? "bg-darkPink text-white" : "bg-white text-darkPink hover:bg-gray-200"
                            }`}
                            onClick={() => router.push(item.path)}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
