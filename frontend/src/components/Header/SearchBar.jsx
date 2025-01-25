import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
        <div className="bg-white lg:flex items-center px-4 py-3 rounded-full shadow-card border hidden border-gray w-full max-w-xl">
            <input
                type="text"
                className="flex-grow bg-transparent text-black placeholder-gray-500 focus:outline-none text-md px-4"
                placeholder="Search for clothing..."
            />
            <button className="ml-2">
                <FaSearch className="w-5 h-5 text-black transform transition-transform duration-500 ease-in-out hover:scale-110 hover:text-darkPink" />
            </button>
        </div>
    );
}
