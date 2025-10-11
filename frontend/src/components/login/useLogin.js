import { postLogin } from "../../services/loginService";
import { getCurrentUser } from "../../services/userService";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../drawer/DrawerSlice";
import { login } from "./AuthSlice";

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
        } catch (error) {
            console.error("Error en login:", error);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return { onSubmit };
};
