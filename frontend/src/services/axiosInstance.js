import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) {
                console.warn("⚠️ No hay refresh token disponible.");
                return Promise.reject(error);
            }

            try {
                const refreshResponse = await axios.post(`${API_URL}/refresh`, {
                    refresh_token: refreshToken,
                });

                const newToken = refreshResponse.data.access_token;
                localStorage.setItem("token", newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("❌ Error al refrescar el token:", refreshError);
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
