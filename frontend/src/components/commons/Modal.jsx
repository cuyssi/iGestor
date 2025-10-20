import { ButtonClose } from "../buttons/ButtonClose";
import { twMerge } from "tailwind-merge";

export const Modal = ({ open, onClose, children, text, className }) => {
    if (!open) return null;

    return (
        <div
            className={`absolute inset-0 top-0 left-0 w-full h-full bg-black/85 z-150 flex items-center justify-center border-none ${
                open ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <div className={twMerge("relative flex flex-col bg-white rounded-xl p-4", className)}>
                <ButtonClose size="35" className="absolute top-0 right-0" onClick={onClose} />
                {children}
                {text && <p className="mt-8 text-center">{text}</p>}
            </div>
        </div>
    );
};
