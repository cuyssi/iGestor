import { CalendarDays, House } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="flex justify-between w-full h-auto py-2 px-5 bg-blue-600 border-none">
            <Link to="/calendar">
                <CalendarDays className="text-white" />
            </Link>

            <Link to="/">
                <House className="text-white" />
            </Link>
        </div>
    );
};
