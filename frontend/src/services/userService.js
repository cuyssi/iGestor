export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    console.log("Token desde localStorage:", token);
    console.log("Authorization header:", `Bearer ${token}`);

    const res = await fetch("http://localhost:8000/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("Respuesta de /me:", res.status); // 👀

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error al obtener el usuario:", errorText);
        throw new Error("No se pudo obtener el usuario");
    }

    return await res.json();
};
