import { Input } from "./Input";
import { ButtonDefault } from "../buttons/ButtonDefault";
import { useDispatch } from "react-redux";
import { openModal } from "../register/modalRegisterSlice";

export const Form = ({ mode, onSubmit, onChangeName, onChangeMail, onChangePassword, onChangeRole }) => {
    const dispatch = useDispatch();
    return (
        <form className="mt-4 p-2 w-full border-none" onSubmit={onSubmit}>
            <p className={`text-blue-500 font-semibold ${mode === "register" ? "mt-4 text-center text-2xl" : ""}`}>
                {mode === "login" ? "Inicia sesión" : "Registro"}
            </p>
            <div className="mt-2 px-4">
                {mode === "register" && (
                    <Input label="Nombre" placeholder="Nombre" type="text" onChange={onChangeName} required />
                )}
                <Input
                    label="Usuario"
                    placeholder="Correo electrónico"
                    type="email"
                    onChange={onChangeMail}
                    autoComplete="username"
                    required
                />
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="Contraseña"
                    onChange={onChangePassword}
                    autoComplete={mode === "register" ? "new-password" : "current-password"}
                    required
                />
                {mode === "register" && (
                    <div className="mt-4 text-gray-600 text-base">
                        <p>Puesto</p>
                        <select
                            className="w-full mt-2 p-1.5 bg-gray-100 border border-gray-300 rounded text-gray-500 text-center outline-none focus:border-blue-500"
                            name="role"
                            onChange={onChangeRole}
                            defaultValue="cocinero"
                        >
                            <option value="Cocinera/o">Cocinera/o</option>
                            <option value="Ayudante de cocina">Ayudante de cocina</option>
                            <option value="Limpiador/a">Limpiador/a</option>
                            <option value="Jefe/a de cocina">Jefe/a de cocina</option>
                        </select>
                    </div>
                )}
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
                <div className="mt-6 w-full">
                    <ButtonDefault type="submit" text="Enviar" className="w-full" />
                </div>
            </div>
        </form>
    );
};
