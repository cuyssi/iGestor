import api from "./axiosInstance";

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    console.log("Token desde localStorage:", token);
    console.log("Authorization header:", `Bearer ${token}`);

    try {
        const res = await api.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Respuesta de /me:", res.status);
        return res.data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error.response?.data || error.message);
        throw new Error("No se pudo obtener el usuario");
    }
};
