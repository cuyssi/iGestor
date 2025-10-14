import { Form } from "../formComponents/Form";
import { Modal } from "../commons/Modal";

export const ModalRegister = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Form text="Registro" mode="register" />
        </Modal>
    );
};
