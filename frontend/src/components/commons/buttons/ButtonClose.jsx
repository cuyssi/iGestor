import { X } from "lucide-react";

export const ButtonClose = ({ onClick, className, size = 22 }) => {
    return (
        <div>
            <button onClick={onClick} className={`p-2 text-red-400 hover:text-red-500 transition ${className}`}>
                <X size={size} />
            </button>
        </div>
    );
};
