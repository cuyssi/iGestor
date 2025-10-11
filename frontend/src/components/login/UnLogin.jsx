import { useSelector, useDispatch } from "react-redux";
import { logout } from "./AuthSlice";

export const UnLogin = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    console.log("Usuario en Redux:", user);

    return (
        <div className="mt-4 flex flex-col items-center gap-2">
            <h1 className="text-2xl text-gray-600">{user ? `👋 Hola ${user.name}! ` : "Usuario no cargado"}</h1>
            <button onClick={handleLogout} className="fixed bottom-5 text-blue-500">
                Cerrar sesión
            </button>
        </div>
    );
};
