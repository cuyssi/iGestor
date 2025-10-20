import { useSelector } from "react-redux";
import { useState } from "react";
import { ModalConfirmDelete } from "./modals/ModalConfirmDelete";
import { ModalConfirmEdit } from "./modals/ModalConfirmEdit";

export const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [newType, setNewType] = useState("");
    const [newValue, setNewValue] = useState("");
    const [date, setDate] = useState("");

    return (
        <div className="w-full h-full subbg-dynamic p-4">
            <h1 className="text-2xl font-semibold text-dynamic text-center">Gestión del perfil</h1>
            {user ? (
                <div>
                    <fieldset className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-2">
                        <legend className="px-2 subtext-dynamic">Datos</legend>
                        <div className="flex justify-between items-center">
                            <p className="text-dynamic">
                                Nombre: <span className="subtext-dynamic">{user.name}</span>
                            </p>
                            <button
                                onClick={() => {
                                    setIsEditOpen(true);
                                    setNewType("text");
                                    setNewValue(user.name);
                                    setDate("nombre");
                                }}
                                className="inline text-sm text-yellow-600 cursor-pointer"
                            >
                                Editar
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-dynamic">
                                Email: <span className="subtext-dynamic">{user.email}</span>
                            </p>
                            <button
                                onClick={() => {
                                    setIsEditOpen(true);
                                    setNewType("email");
                                    setNewValue(user.email);
                                    setDate("email");
                                }}
                                className="inline text-sm text-yellow-600 cursor-pointer"
                            >
                                Editar
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-dynamic">
                                Rol: <span className="subtext-dynamic">{user.role}</span>
                            </p>
                            <button
                                onClick={() => {
                                    setIsEditOpen(true);
                                    setNewType("text");
                                    setNewValue(user.role);
                                    setDate("role");
                                }}
                                className="inline text-sm text-yellow-600 cursor-pointer"
                            >
                                Editar
                            </button>
                        </div>
                    </fieldset>
                    <fieldset className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-2">
                        <legend className="px-2 subtext-dynamic">Seguridad</legend>
                        <div className="flex flex-col justify-between items-center">
                            <p className="text-dynamic">
                                Contraseña: <span className="subtext-dynamic">********</span>
                            </p>
                            <button
                                onClick={() => {
                                    setIsEditOpen(true);
                                    setNewType("password");
                                    setNewValue(user.password);
                                    setDate("contraseña");
                                }}
                                className="mt-4 text-sm text-yellow-600 cursor-pointer"
                            >
                                Cambiar contraseña
                            </button>
                        </div>
                    </fieldset>
                    <fieldset className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-2">
                        <legend className="px-2 subtext-dynamic">Cuenta</legend>
                        <div className="flex justify-between items-center">
                            <p className="text-dynamic">Eliminar cuenta</p>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="inline text-sm text-red-400 cursor-pointer"
                            >
                                Eliminar
                            </button>
                        </div>
                    </fieldset>
                </div>
            ) : (
                <p className="mt-8 text-center subtext-dynamic">Algo ha salido mal vuelve a logearte</p>
            )}
            <ModalConfirmDelete isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <ModalConfirmEdit
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                type={newType}
                value={newValue}
                date={date}
            />
        </div>
    );
};
