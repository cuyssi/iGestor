import { useDispatch } from "react-redux";
import { closeDrawer } from "../drawer/DrawerSlice";
import { useNavigate } from "react-router-dom";

export const ContainerMenu = ({ link, text, children, className }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        if (link) {
            dispatch(closeDrawer());
            navigate(link);
        }
    };

    return (
        <div className={`w-[90%] h-10 p-2 bg-blue-100 border border-blue-400 rounded ${className}`}>
            <button onClick={handleClick} className="w-full text-left">
                <p>{text}</p>
            </button>
            {children}
        </div>
    );
};
