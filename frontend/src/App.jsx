import { Routes, Route } from "react-router-dom";
import { Header } from "./components/commons/Header";
import { Footer } from "./components/commons/Footer";
import { Home } from "./pages/home/Home";
import { Calendar } from "./pages/calendar/Calendar";
import { Modal } from "./components/register/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "./components/register/modalSlice";
import { useEffect } from "react";
import { getCurrentUser } from "./services/userService";
import { login, setTokenFromStorage } from "./components/login/AuthSlice"; // ajusta la ruta si es distinta

import "./App.css";

function App() {
    const dispatch = useDispatch();
    const openModal = useSelector((state) => state.modal.open);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(setTokenFromStorage(token));
            getCurrentUser()
                .then((user) => {
                    console.log("Usuario recibido desde /me:", user);
                    dispatch(login({ token, user }));
                })
                .catch((err) => {
                    console.error("Error al obtener el usuario:", err);
                });
        }
    }, []);

    return (
        <div
            className="
        fixed inset-0
        sm:flex sm:items-center sm:justify-center sm:bg-gray-400
        bg-white
      "
        >
            <div
                className="relative
          flex flex-col text-lg bg-white
          w-full h-full
          sm:max-w-[360px] sm:max-h-[720px]
          sm:rounded-2xl sm:shadow-lg
          overflow-hidden
        "
            >
                <Header />
                <main className="flex-1 overflow-y-auto bg-bg">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calendar" element={<Calendar />} />
                    </Routes>
                    <Modal open={openModal} onClose={() => dispatch(closeModal())} />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
