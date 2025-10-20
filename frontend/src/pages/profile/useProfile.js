import { useDispatch } from "react-redux";
import { deleteUser, editUser } from "../../services/userServices";
import { setUser, logout } from "../../components/login/AuthSlice";

export const useProfile = () => {
    const dispatch = useDispatch();

    const editProfile = async (updatedData) => {
        try {
            const updatedUser = await editUser(updatedData);
            dispatch(setUser(updatedUser));
            alert("Perfil actualizado correctamente.");
        } catch (error) {
            console.error("Error al editar el perfil:", error);
        }
    };

    const deleteProfile = async (userId) => {
        try {
            await deleteUser(userId);
            dispatch(logout());
            alert("Tu cuenta ha sido eliminada correctamente.");
        } catch (error) {
            console.error("Error al borrar el perfil:", error);
            alert("No se pudo eliminar el perfil. Intenta de nuevo más tarde.");
        }
    };

    return { deleteProfile, editProfile };
};
