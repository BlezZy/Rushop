import { FaShoppingCart } from "react-icons/fa";

export default function CartIcon() {
    const cartCount = 4;

    return (
        <div className="relative">
            <FaShoppingCart className="w-7 h-7 text-black transform transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-12 hover:text-darkPink" />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-lightPink text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-card">
          {cartCount}
        </span>
            )}
        </div>
    );
}
