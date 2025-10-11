import { useDispatch } from "react-redux";
import { closeModal } from "./modalSlice";
import { createUser } from "../../services/createUser";

export const useRegister = (name, email, password) => {
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados al registro:", { name, email, password });
        try {
            const response = await createUser({ name, email, password });
            console.log("Registro exitoso:", response);
            dispatch(closeModal());
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    };

    return { onSubmit };
};
