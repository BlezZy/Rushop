import Link from "next/link";

export default function Logo() {
    return (
        <div className="flex items-center">
            <Link
                href="/"
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-darkPink to-inkBlue hover:opacity-70 transition-all"
            >
                Rushop
            </Link>
        </div>
    );
}
