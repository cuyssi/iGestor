import { Routes, Route } from "react-router-dom";
import { Header } from "./components/commons/Header";
import { Drawer } from "./components/drawer/Drawer";
import { Footer } from "./components/commons/Footer";
import { Home } from "./pages/home/Home";
import { Settings } from "./pages/settings/Settings";
import { CalendarPage } from "./pages/calendar/CalendarPage";
import { ModalRegister } from "./components/register/ModalRegister";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "./components/register/modalRegisterSlice";
import { useEffect } from "react";
import { getCurrentUser } from "./services/userService";
import { login, setTokenFromStorage } from "./components/login/AuthSlice";

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
          w-full h-full border border-black
          sm:max-w-[360px] sm:max-h-[720px]
          sm:rounded-2xl sm:shadow-lg
          overflow-hidden
        "
            >
                <Header />
                <Drawer />
                <main className="w-full h-full overflow-y-auto subbg-dynamic">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                    <ModalRegister open={openModal} onClose={() => dispatch(closeModal())} />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
