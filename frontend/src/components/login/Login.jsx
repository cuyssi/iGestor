import { useState, useEffect } from "react";
import { useLogin } from "./useLogin";
import { Form } from "../formComponents/Form";
import { Modal } from "../commons/Modal";

export const Login = ({ mode }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { onSubmit, errorMessage, setErrorMessage } = useLogin();
    const [isOpen, setIsOpen] = useState(false);

    console.log("email y password en Login.jsx:", email, password);
    console.log("errorMessage en Login.jsx:", errorMessage);

    useEffect(() => {
        if (errorMessage) {
            setIsOpen(true);
            console.log("Modal abierto por error de login", errorMessage);
        }
    }, [errorMessage]);

    return (
        <div>
            <Form
                onChangeMail={(e) => setEmail(e.target.value)}
                onChangePassword={(e) => setPassword(e.target.value)}
                onSubmit={(e) => onSubmit(e, email, password)}
                mode={mode}
            />
            <Modal
                open={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setErrorMessage("");
                }}
                className="mx-2"
                text={errorMessage}
            />
        </div>
    );
};
