import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productApi } from "../../api/productApi";

axios.defaults.baseURL = "https://fakestoreapi.com/"

export const fetchAll = createAsyncThunk("products", async (products, thunkAPI) => {
    try {
        const response = await productApi.get("/products")
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

