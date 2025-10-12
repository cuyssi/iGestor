export const Container = ({ children, className = "", w = "200px", h = "100px" }) => {
    return (
        <div
            className={`p-5 border border-dynamic shadow-box rounded-lg ${className} shadow-lg`}
            style={{ width: w, height: h }}
        >
            {children}
        </div>
    );
};
