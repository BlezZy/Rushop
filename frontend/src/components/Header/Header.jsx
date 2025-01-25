import Logo from "@/components/Header/Logo";
import SearchBar from "@/components/Header/SearchBar";
import CartIcon from "@/components/Header/CartIcon";
import UserMenu from "@/components/Header/UserMenu";
import CategoriesMenu from "@/components/Header/CategoriesMenu";


export default function Header() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[160px] z-0 bg-lightPink"></div>

            <header className="relative z-10 flex items-center justify-between px-8 py-4">
                <Logo />
                <SearchBar />
                <div className="flex items-center space-x-6">
                    <CartIcon />
                    <UserMenu />
                </div>
            </header>

            <CategoriesMenu />
        </div>
    );
}
