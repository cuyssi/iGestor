import { Form } from "../formComponents/Form";
import { Modal } from "../commons/Modal";
import { useState } from "react";
import { useRegister } from "./useRegister";

export const ModalRegister = ({ open, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("cocinero");

    const { onSubmit } = useRegister(name, email, password, role);

    return (
        <Modal open={open} onClose={onClose}>
            <Form
                text="Registro"
                mode="register"
                onSubmit={onSubmit}
                onChangeMail={(e) => setEmail(e.target.value)}
                onChangePassword={(e) => setPassword(e.target.value)}
                onChangeName={(e) => setName(e.target.value)}
                onChangeRole={(e) => setRole(e.target.value)}
            />
        </Modal>
    );
};
