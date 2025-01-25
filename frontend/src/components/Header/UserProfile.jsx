import { FaUserCircle } from "react-icons/fa";

import Link from "next/link";
import Button from "@/components/General/Button";

export default function UserProfile({ onLogout }) {
    return (
        <div className="flex items-center space-x-3">
            <Link href="/profile">
                <FaUserCircle className="w-10 h-10 text-black hover:text-darkPink transition-all" />
            </Link>
            <Button
                variant="secondary"
                size="small"
                onClick={onLogout}
            >
                Logout
            </Button>
        </div>
    );
}
