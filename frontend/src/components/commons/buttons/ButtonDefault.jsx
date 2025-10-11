export const ButtonDefault = ({ type = "button", onClick, className, text }) => {
    return (
        <div>
            <button
                type={type}
                onClick={onClick}
                className={`px-5 py-2 bg-blue-500 rounded-lg text-white cursor-pointer ${className} hover:bg-blue-600`}
            >
                {text}
            </button>
        </div>
    );
};
