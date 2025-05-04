import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./operations";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: { email: null },
        token: null
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.email
            state.token = action.payload.token;
            console.log(state.token)
        })

            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.email
                state.token = action.payload.token;
            });
    }

})

export default authSlice.reducer