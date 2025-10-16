import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/register/modalRegisterSlice";
import authReducer from "../components/login/AuthSlice";
import drawerReducer from "../components/drawer/DrawerSlice";
import turnsReducer from "../pages/settings/turnsSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
        drawer: drawerReducer,
        turns: turnsReducer,
    },
});
