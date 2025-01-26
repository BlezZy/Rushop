'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

export default function CategoriesMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    setError('Failed to fetch categories.');
                }
            } catch (err) {
                setError('An error occurred while fetching categories.');
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        router.push(`/search?category=${categoryId}`);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <nav className="bg-gradient-to-r from-darkPink to-lightPink py-4 shadow-card relative z-10">
            <div className="flex justify-center items-center px-4 md:hidden">
                <button onClick={toggleMenu} className="text-white text-2xl">
                    {isMenuOpen ? <AiOutlineClose /> : <FaBars />}
                </button>
            </div>

            <ul className="hidden md:flex justify-center space-x-6 text-black font-secondary text-md">
                {categories.map((category) => (
                    <li
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        className="hover:underline hover:text-darkPink cursor-pointer transition-all duration-300"
                    >
                        {category.name}
                    </li>
                ))}
            </ul>

            {isMenuOpen && (
                <ul className="flex flex-col items-center space-y-4 mt-4 px-4 md:hidden text-white font-secondary text-md">
                    {categories.map((category) => (
                        <li
                            key={category._id}
                            onClick={() => handleCategoryClick(category._id)}
                            className="hover:underline hover:text-gray cursor-pointer transition-all duration-300"
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
