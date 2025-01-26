'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        router.push(`/search?title=${encodeURIComponent(searchQuery)}`);
        setSearchQuery('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-white flex items-center px-4 py-3 rounded-full shadow-card border border-gray w-full max-w-xl">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for clothing..."
                className="flex-grow bg-transparent text-black placeholder-gray-500 focus:outline-none text-md px-4"
            />
            <button onClick={handleSearch} className="ml-2 focus:outline-none">
                <FaSearch className="w-5 h-5 text-black transform transition-transform duration-500 ease-in-out hover:scale-110 hover:text-darkPink" />
            </button>
        </div>
    );
}
