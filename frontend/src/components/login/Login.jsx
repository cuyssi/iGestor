import { useState } from "react";
import { useLogin } from "./useLogin";
import { Form } from "../commons/formComponents/Form";

export const Login = ({ mode }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { onSubmit } = useLogin(email, password);

    return (
        <div>
            <Form
                onChangeMail={(e) => setEmail(e.target.value)}
                onChangePassword={(e) => setPassword(e.target.value)}
                onSubmit={onSubmit}
                mode={mode}
            />
        </div>
    );
};
