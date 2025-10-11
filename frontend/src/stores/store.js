import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/register/modalSlice";
import authReducer from "../components/login/AuthSlice";
import drawerReducer from "../components/drawer/DrawerSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
        drawer: drawerReducer,
    },
});
