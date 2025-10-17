import { postLogin } from "../../services/loginService";
import { getCurrentUser } from "../../services/userService";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../drawer/DrawerSlice";
import { login } from "./AuthSlice";
import { fetchTurns } from "../../pages/settings/turnsSlice";

export const useLogin = (email, password) => {
    const dispatch = useDispatch();

    const handleLogin = async (email, password) => {
        try {
            const token = await postLogin(email, password);
            localStorage.setItem("token", token.access_token);
            const user = await getCurrentUser();
            dispatch(login({ token, user }));
            dispatch(closeDrawer());
            console.log("Login exitoso ✅");
            return true;
        } catch (error) {
            console.error("Error en login:", error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const success = await handleLogin(email, password);
        if (success) {
            dispatch(fetchTurns());
        }
    };

    return { onSubmit };
};
