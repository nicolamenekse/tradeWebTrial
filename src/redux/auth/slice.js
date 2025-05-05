import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh, register } from "./operations";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: { name: null, email: null },
        token: null,
        isLoggedIn: false,
        isRefreshing: false
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token;
            console.log(state.token)
            state.isLoggedIn = true
        })

            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = { name: null, email: null };
                state.token = null,
                    state.isLoggedIn = false
            })


            .addCase(refresh.pending, (state) => {
                state.isRefreshing = true
            })


            .addCase(refresh.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isLoggedIn = true
                state.isRefreshing = false
            })

            .addCase(refresh.rejected, (state) => {
                state.isRefreshing = false
            })
    }

})

export default authSlice.reducer