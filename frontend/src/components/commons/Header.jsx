import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { openDrawer } from "../drawer/DrawerSlice";

export const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between items-center w-full h-[10%]  z-50 bg-dynamic p-1">
            <img src="logo.png" className="h-full" />
            <button
                aria-label="Abrir menú"
                onClick={() => dispatch(openDrawer())}
                className="text-blue-500 h-full pr-3 hover:text-blue-700 transition"
            >
                <Menu className="icons-dynamic" />
            </button>
        </div>
    );
};
