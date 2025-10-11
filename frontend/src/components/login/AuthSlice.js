import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user || null;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
        setTokenFromStorage(state, action) {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
        },
    },
});

export const { login, logout, setTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
