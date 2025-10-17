import { twMerge } from "tailwind-merge";

export const ButtonDefault = ({ type = "button", onClick, className, text }) => {
    return (
        <div>
            <button
                type={type}
                onClick={onClick}
                className={twMerge(
                    "px-5 py-2 bg-blue-500 rounded-lg text-white cursor-pointer hover:bg-blue-600",
                    className
                )}
            >
                {text}
            </button>
        </div>
    );
};
