import { Drawer } from "./Drawer";
import { AuthStatus } from "../login/AuthStatus";

export const Header = () => {
    return (
        <div className="flex justify-between items-center w-full h-[10%] p-1 shadow-xl bg-white">
            <img src="logo.png" className="h-full" />
            <Drawer>
                <AuthStatus />
            </Drawer>
        </div>
    );
};
