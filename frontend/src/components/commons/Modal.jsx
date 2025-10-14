import { ButtonClose } from "../buttons/ButtonClose";

export const Modal = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div
            className={`absolute inset-0 top-0 left-0 w-full h-full bg-black/85 z-50 flex items-center justify-center border-none ${
                open ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <div className="relative flex flex-col bg-white rounded-xl py-2">
                <ButtonClose size="35" className="absolute top-0 right-0" onClick={onClose} />
                {children}
            </div>
        </div>
    );
};
