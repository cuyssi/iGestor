import { postLogin } from "../../services/loginService";
import { getCurrentUser } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../drawer/DrawerSlice";
import { login } from "./AuthSlice";
import { fetchTurns } from "../../pages/settings/turnsSlice";
import { useState } from "react";

export const useLogin = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e, email, password) => {
        e.preventDefault();
        console.log("onSubmit en useLogin con:", email, password);

        if (!email || !password) {
            console.error("Email o contraseña vacíos");
            return;
        }

        try {
            const data = await postLogin(email, password);

            localStorage.setItem("token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            const user = await getCurrentUser();

            dispatch(login({ token: data.access_token, user }));
            dispatch(closeDrawer());
            dispatch(fetchTurns());

            console.log("Estás logueado como:", user);
        } catch (error) {
            console.error("Error en login:", error);
            setErrorMessage("Email o contraseña incorrectos");
        }
    };

    return { onSubmit, errorMessage, setErrorMessage };
};
