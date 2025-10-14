import { useState, useEffect } from "react";

export const Counter = ({ onChange, min = 0, max = 31, value = 0 }) => {
    const [count, setCount] = useState(value);

    useEffect(() => {
        setCount(value);
    }, [value]);

    const handleUpdate = (newCount) => {
        setCount(newCount);
        onChange(newCount);
    };

    return (
        <div className="flex items-center border-2 border-gray-400 bg-gray-100 rounded-lg">
            <button
                type="button"
                onClick={() => handleUpdate(count > min ? count - 1 : min)}
                className="px-1 text-gray-900 bg-gray-200 hover:bg-gray-400 rounded-tl-lg rounded-bl-lg"
            >
                –
            </button>
            <input
                value={count}
                type="number"
                min={min}
                max={max}
                onChange={(e) => handleUpdate(Number(e.target.value))}
                className="text-center w-12 border-x border-gray-600 rounded-lg font-normal"
            />
            <button
                type="button"
                onClick={() => handleUpdate(count < max ? count + 1 : max)}
                className="px-1 text-gray-900 bg-gray-200 hover:bg-gray-400 rounded-tr-lg rounded-br-lg"
            >
                +
            </button>
        </div>
    );
};
