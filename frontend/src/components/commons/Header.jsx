import { Drawer } from "../drawer/Drawer";

export const Header = () => {
    return (
        <div className="flex justify-between items-center w-full h-[10%] shadow-[0px_2px_10px_rgba(0,0,0,0.5)] z-50 bg-dynamic p-1">
            <img src="logo.png" className="h-full" />
            <Drawer />
        </div>
    );
};
