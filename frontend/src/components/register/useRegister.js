import { useDispatch } from "react-redux";
import { closeModal } from "./modalRegisterSlice";
import { createUser, getCurrentUser } from "../../services/userServices";
import { postLogin } from "../../services/loginService";
import { closeDrawer } from "../drawer/DrawerSlice";
import { login } from "../login/AuthSlice";

const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const useRegister = (name, email, password, role) => {
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados al registro:", { name, email, password });

        try {
            await createUser({
                name: capitalize(name),
                email,
                password,
                role,
            });
            const token = await postLogin(email, password);
            localStorage.setItem("token", token.access_token);
            const user = await getCurrentUser();
            dispatch(login({ token: token.access_token, user }));
            dispatch(closeModal());
            dispatch(closeDrawer());

            console.log("Registro y login exitoso");
        } catch (error) {
            console.error("Error en registro/login:", error);
        }
    };

    return { onSubmit };
};
