import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createUser = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${API_URL}/users`, {
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
