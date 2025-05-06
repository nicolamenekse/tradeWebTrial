import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productApi } from "../../api/productApi";

axios.defaults.baseURL = "https://fakestoreapi.com/"

export const fetchAll = createAsyncThunk("products/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await productApi.get("/products")
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})


export const addGame = createAsyncThunk("products/addGame", async (product, thunkAPI) => {
    try {
        const response = await productApi.post("/products/", product)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})


export const deleteGame = createAsyncThunk("products/deleteGame", async (contactId, thunkAPI) => {
    try {
        await axios.delete(`/products/${contactId}`)
        return contactId
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})