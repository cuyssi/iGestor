import { Modal } from "../../../components/commons/Modal";
import { ButtonDefault } from "../../../components/buttons/ButtonDefault";
import { useProfile } from "../../profile/useProfile";
import { useSelector } from "react-redux";

export const ModalConfirmDelete = ({ isOpen, onClose }) => {
    const user = useSelector((state) => state.auth.user);
    const { deleteProfile } = useProfile();

    return (
        <Modal open={isOpen} onClose={onClose} className="mx-4">
            <div className="mt-8 px-2 flex flex-col justify-center items-center">
                <p className="text-dynamic text-base">¿Estás seguro de que deseas borrar tu cuenta?</p>
                <p className="mt-4 text-red-400 text-sm"> Esta acción no se puede deshacer.</p>
                <div className="mt-8 w-full flex justify-between">
                    <ButtonDefault onClick={onClose} text="Cancelar" className="text-sm bg-blue-400" />
                    <ButtonDefault
                        onClick={() => {
                            deleteProfile(user.id);
                            onClose();
                        }}
                        text="Eliminar"
                        className="text-sm bg-red-400"
                    />
                </div>
            </div>
        </Modal>
    );
};
