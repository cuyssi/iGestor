import { useState } from "react";
import { Menu } from "lucide-react";
import { ButtonClose } from "./buttons/ButtonClose";

export const Drawer = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="z-50 overflow-hiden">
            <button
                aria-label="Abrir menú"
                onClick={() => setOpen(true)}
                className="text-blue-500 h-full pr-3 hover:text-blue-700 transition"
            >
                <Menu />
            </button>

            <div
                className={`absolute top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                    open ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setOpen(false)}
                aria-hidden={!open}
            />

            <aside
                className={`absolute top-0 right-0 h-full w-70 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${open ? "-translate-x-0" : "translate-x-full"}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-blue-700">Menú</h2>
                    <ButtonClose onClick={() => setOpen(false)} />
                </div>
                {children}
            </aside>
        </div>
    );
};
