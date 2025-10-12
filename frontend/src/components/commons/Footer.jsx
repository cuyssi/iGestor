import { CalendarDays, House } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="flex justify-between w-full h-auto py-2 px-5 shadow-[0px_2px_10px_rgba(0,0,0,0.5)] z-50 bg-dynamic border-none">
            <Link to="/calendar">
                <CalendarDays className="icons-dynamic" />
            </Link>

            <Link to="/">
                <House className="icons-dynamic" />
            </Link>
        </div>
    );
};
