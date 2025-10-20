import api from "./axiosInstance";

export const createUser = async ({ name, email, password, role }) => {
    try {
        const response = await api.post("/users", {
            name,
            email,
            password,
            role,
        });
        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const res = await api.get("/me");
        return res.data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error.response?.data || error.message);
        throw new Error("No se pudo obtener el usuario");
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const editUser = async (updatedData) => {
    const res = await api.put("/me", updatedData);
    return res.data;
};

export const deleteUser = async (userId) => {
    const res = await api.delete(`/users/${userId}`);
    return res.data;
};
