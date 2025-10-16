import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTurns } from "../../services/turnsServices";

export const fetchTurns = createAsyncThunk("turns/fetchTurns", async () => {
    const turns = await getTurns();
    console.log("🔥 getTurns devolvió:", turns);
    return turns;
});

const turnsSlice = createSlice({
    name: "turns",
    initialState: {
        turns: [],
        loading: false,
        error: null,
    },
    reducers: {
        setTurns(state, action) {
            state.turns = action.payload;
        },
        addTurn(state, action) {
            state.turns.push(action.payload);
        },
        updateTurn(state, action) {
            const index = state.turns.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) state.turns[index] = action.payload;
        },
        removeTurn(state, action) {
            state.turns = state.turns.filter((t) => t.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTurns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTurns.fulfilled, (state, action) => {
                state.loading = false;
                state.turns = action.payload;
            })
            .addCase(fetchTurns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setTurns, addTurn, updateTurn, removeTurn } = turnsSlice.actions;
export default turnsSlice.reducer;
