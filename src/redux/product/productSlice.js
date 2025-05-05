import { createSlice } from "@reduxjs/toolkit";
import { fetchAll } from "./productOperations";

export const productSlice = createSlice({
    name: "products",
    initialState: {
        items: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.items = action.payload
            console.log(state.items)
        })
    }
})

export default productSlice.reducer

