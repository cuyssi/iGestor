import api from "./axiosInstance";

export const postLogin = async (email, password) => {
    try {
        console.log(email, password);
        const response = await api.post("/login", {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};
