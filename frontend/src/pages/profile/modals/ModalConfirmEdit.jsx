import { useState } from "react";
import { Modal } from "../../../components/commons/Modal";
import { ButtonDefault } from "../../../components/buttons/ButtonDefault";
import { useProfile } from "../useProfile";

export const ModalConfirmEdit = ({ isOpen, onClose, type, date }) => {
    const { editProfile } = useProfile();

    const [value, setValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");

    const handleSave = () => {
        if (date === "contraseña" && value !== confirmValue) {
            alert("Las contraseñas no coinciden!");
            return;
        }
        const fieldMap = {
            contraseña: "password",
            nombre: "name",
            email: "email",
            role: "role",
        };

        const fieldName = fieldMap[date];
        const payload = { [fieldName]: value };

        editProfile(payload);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose} className="mx-4">
            <div className="mt-10 px-2 flex flex-col justify-center items-center w-full">
                {date === "role" ? (
                    <div>
                        <p className="text-dynamic text-base">Selecciona un nuevo puesto</p>
                        <select
                            className="mt-4 w-full p-1.5 bg-gray-100 border border-gray-300 rounded text-gray-500 text-center outline-none focus:border-blue-500"
                            type={type}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            defaultValue="cocinero"
                        >
                            <option value="Cocinera/o">Cocinera/o</option>
                            <option value="Ayudante de cocina">Ayudante de cocina</option>
                            <option value="Limpiador/a">Limpiador/a</option>
                            <option value="Jefe/a de cocina">Jefe/a de cocina</option>
                        </select>
                    </div>
                ) : (
                    <div>
                        <p className="text-dynamic text-base">
                            {date === "contraseña" ? "Introduce una nueva contraseña" : `Introduce un nuevo ${date}`}
                        </p>
                        <input
                            type={type}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="mt-4 p-2 border border-gray-300 rounded w-full"
                        />

                        {date === "contraseña" && (
                            <>
                                <p className="mt-4 text-dynamic text-base">Repite la nueva contraseña</p>
                                <input
                                    type={type}
                                    value={confirmValue}
                                    onChange={(e) => setConfirmValue(e.target.value)}
                                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                                />
                            </>
                        )}
                    </div>
                )}

                <div className="mt-8 w-full flex justify-between">
                    <ButtonDefault onClick={onClose} text="Cancelar" className="text-sm bg-blue-400" />
                    <ButtonDefault onClick={handleSave} text="Guardar" className="text-sm bg-green-400" />
                </div>
            </div>
        </Modal>
    );
};
