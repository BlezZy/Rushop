"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function CategoriesMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const categories = [
        "Men's Wear",
        "Women's Wear",
        "Accessories",
        "Footwear",
        "New Arrivals",
        "Sale",
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-darkPink to-lightPink py-4 shadow-card relative z-10">
            <div className="flex justify-center items-center px-4 md:hidden">
                <button onClick={toggleMenu} className="text-white text-2xl">
                    {isMenuOpen ? <AiOutlineClose /> : <FaBars />}
                </button>
            </div>

            <ul className="hidden md:flex justify-center space-x-6 text-black font-secondary text-md">
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className="hover:underline hover:text-darkPink cursor-pointer transition-all duration-300"
                    >
                        {category}
                    </li>
                ))}
            </ul>

            {isMenuOpen && (
                <ul className="flex flex-col items-center space-y-4 mt-4 px-4 md:hidden text-white font-secondary text-md">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className="hover:underline hover:text-gray cursor-pointer transition-all duration-300"
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
