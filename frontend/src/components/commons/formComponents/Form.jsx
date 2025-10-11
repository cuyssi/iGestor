import { Input } from "./Input";
import { ButtonDefault } from "../buttons/ButtonDefault";
import { useDispatch } from "react-redux";
import { openModal } from "../../register/modalSlice";
import { useRegister } from "../../register/useRegister";
import { useLogin } from "../../login/useLogin";
import { useState } from "react";

export const Form = ({ mode }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const register = useRegister(name, email, password);
    const login = useLogin(email, password);

    const onSubmit = mode === "register" ? register.onSubmit : login.onSubmit;

    return (
        <form className="mt-4 p-2 w-full border-none" onSubmit={onSubmit}>
            <p className={`text-blue-500 font-semibold ${mode === "register" ? "mt-4 text-center text-2xl" : ""}`}>
                {mode === "login" ? "Inicia sesión" : "Registro"}
            </p>
            <div className="mt-2 px-4">
                {mode === "register" && (
                    <Input
                        label="Nombre"
                        placeholder="Nombre"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                        required
                    />
                )}

                <Input
                    label="Usuario"
                    placeholder="Correo electrónico"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    required
                />

                <Input
                    label="Contraseña"
                    type="password"
                    pattern="^(?=.*[A-Z])(?=.*\d).{8,}$"
                    placeholder="Contraseña"
                    onInvalid={(e) =>
                        e.target.setCustomValidity(
                            "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número"
                        )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                />

                {mode === "login" && (
                    <div className="mt-4 flex justify-center">
                        <button
                            type="button"
                            onClick={() => dispatch(openModal())}
                            className="text-sm text-blue-500 cursor-pointer"
                        >
                            No tienes cuenta? Registrate
                        </button>
                    </div>
                )}

                <div className="mt-4 flex w-full justify-center items-center">
                    <ButtonDefault type="submit" text="Enviar" />
                </div>
            </div>
        </form>
    );
};
