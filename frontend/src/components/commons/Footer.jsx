import { CalendarDays, House } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="flex justify-between w-full h-auto py-2 px-5 z-50 bg-dynamic border-t border-gray-200">
            <Link to="/calendar">
                <CalendarDays className="icons-dynamic" />
            </Link>

            <Link to="/">
                <House className="icons-dynamic" />
            </Link>
        </div>
    );
};
