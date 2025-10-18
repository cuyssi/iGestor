import api from "./axiosInstance";

export const createTurn = async (turn) => {
    const token = localStorage.getItem("token");

    const {
        date,
        start_time,
        end_time,
        morning_start_time,
        morning_end_time,
        afternoon_start_time,
        afternoon_end_time,
        shift,
        days,
    } = turn;

    try {
        const payload = {
            date: new Date(date).toISOString(),
            shift,
            days,
        };

        if (shift === "partido") {
            Object.assign(payload, {
                morning_start_time,
                morning_end_time,
                afternoon_start_time,
                afternoon_end_time,
            });
        } else {
            Object.assign(payload, {
                start_time,
                end_time,
            });
        }

        console.log("Enviando a backend:", payload);

        const response = await api.post("/turns", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error al crear turno:", error.response?.data || error);
        throw error;
    }
};

export const getTurns = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await api.get("/turns", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("respuesta del getTurns:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching turns:", error.response?.data || error.message);
        throw error;
    }
};
