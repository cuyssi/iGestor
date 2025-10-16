import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "./DrawerSlice";
import { ButtonClose } from "../buttons/ButtonClose";
import { AuthStatus } from "../login/AuthStatus";
import { MenuSection } from "../menu/MenuSection";

export const Drawer = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.drawer.isOpen);

    return (
        <div className="z-60 overflow-hidden">
            <div
                className={`absolute top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => dispatch(closeDrawer())}
                aria-hidden={!isOpen}
            />

            <aside
                className={`absolute top-0 right-0 h-full w-70 subbg-dynamic shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "-translate-x-0" : "translate-x-full"}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="relative flex items-center justify-between p-4 border-b bg-dynamic">
                    <h2 className="text-lg font-semibold text-blue-700">Menú</h2>
                    <ButtonClose onClick={() => dispatch(closeDrawer())} />
                </div>
                <AuthStatus />
                <MenuSection />
            </aside>
        </div>
    );
};
