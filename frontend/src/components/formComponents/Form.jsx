import { Input } from "./Input";
import { ButtonDefault } from "../buttons/ButtonDefault";
import { useDispatch } from "react-redux";
import { openModal } from "../register/modalRegisterSlice";

export const Form = ({ mode, onSubmit, onChangeMail, onChangePassword }) => {
    const dispatch = useDispatch();
    return (
        <form className="mt-4 p-2 w-full border-none" onSubmit={onSubmit}>
            <p className={`text-blue-500 font-semibold ${mode === "register" ? "mt-4 text-center text-2xl" : ""}`}>
                {mode === "login" ? "Inicia sesión" : "Registro"}
            </p>
            <div className="mt-2 px-4">
                <Input label="Usuario" placeholder="Correo electrónico" type="email" onChange={onChangeMail} required />
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="Contraseña"
                    onChange={onChangePassword}
                    required
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
