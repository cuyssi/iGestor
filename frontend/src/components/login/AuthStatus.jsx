import { useSelector } from "react-redux";
import { Login } from "./Login";
import { UnLogin } from "./UnLogin";

export const AuthStatus = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return <>{isAuthenticated ? <UnLogin /> : <Login mode="login" />}</>;
};
