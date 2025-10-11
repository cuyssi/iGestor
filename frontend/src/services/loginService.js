import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const postLogin = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};
