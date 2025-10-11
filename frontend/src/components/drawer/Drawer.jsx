import { useSelector, useDispatch } from "react-redux";
import { openDrawer, closeDrawer } from "./DrawerSlice";
import { Menu } from "lucide-react";
import { ButtonClose } from "../commons/buttons/ButtonClose";

export const Drawer = ({ children }) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.drawer.isOpen);

    return (
        <div className="z-50 overflow-hidden">
            <button
                aria-label="Abrir menú"
                onClick={() => dispatch(openDrawer())}
                className="text-blue-500 h-full pr-3 hover:text-blue-700 transition"
            >
                <Menu />
            </button>

            <div
                className={`absolute top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => dispatch(closeDrawer())}
                aria-hidden={!isOpen}
            />

            <aside
                className={`absolute top-0 right-0 h-full w-70 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "-translate-x-0" : "translate-x-full"}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-blue-700">Menú</h2>
                    <ButtonClose onClick={() => dispatch(closeDrawer())} />
                </div>
                {children}
            </aside>
        </div>
    );
};
