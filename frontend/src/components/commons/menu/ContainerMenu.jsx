export const ContainerMenu = ({ text, children, className }) => {
    return (
        <div className={`w-[90%] h-10 p-2 bg-blue-100 border border-blue-400 rounded ${className}`}>
            <p>{text}</p>
            {children}
        </div>
    );
};
