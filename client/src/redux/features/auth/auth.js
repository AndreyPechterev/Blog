import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
};

export const registerUser = createAsyncThunk(
    "/auth/register",
    async ({ username, password }) => {
        try {
            const { data } = await axios.post("/auth/register", {
                username,
                password,
            });
            if (data.token) {
                window.localStorage.setItem("token", data.token);
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    "/auth/login",
    async ({ username, password }) => {
        try {
            const { data } = await axios.post("/auth/login", {
                username,
                password,
            });
            if (data.token) {
                window.localStorage.setItem("token", data.token);
            }
            return data;
        } catch (error) {}
    }
);

export const getMe = createAsyncThunk("/auth/getMe", async () => {
    try {
        const { data } = await axios.get("/auth/me");
        return data;
    } catch (error) {}
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null;
        },
    },
    extraReducers: {
        // Register
        [registerUser.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
        },
        // Login
        [loginUser.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
        },
        // getMe
        [getMe.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = null;
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        },
        [getMe.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});
export const { logout } = authSlice.actions;
export const checkIsAuth = (state) => Boolean(state.auth.token);
export default authSlice.reducer;
