import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export const Input = ({ label, type, placeholder, className, onChange, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className="relative w-full mb-3">
            {label && <label className="text-base text-gray-600">{label}</label>}
            <div className="relative">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={`w-full bg-gray-100 border border-gray-300 focus:border-blue-500 outline-none rounded p-1 text-base text-center  ${className}`}
                    onChange={onChange}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <Eye size={18} className="cursor-pointer" />
                        ) : (
                            <EyeClosed size={18} className="cursor-pointer" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
