import { createSlice } from "@reduxjs/toolkit";
import { addGame, deleteGame, fetchAll } from "./productOperations";

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

        .addCase(addGame.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })


        .addCase(deleteGame.fulfilled,(state,action)=>{
            state.items = state.items.filter((item)=>item.id !== action.payload);
        })
    }
})

export default productSlice.reducer

