import api from "./axiosInstance";

export const createUser = async ({ name, email, password }) => {
    try {
        const response = await api.post("/users", {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
};
