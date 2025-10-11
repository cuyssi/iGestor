import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/register/modalSlice";
import authReducer from "../components/login/AuthSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
    },
});
