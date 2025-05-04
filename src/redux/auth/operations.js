import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

axios.defaults.baseURL = "https://reqres.in/"
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers["x-api-key"] = "reqres-free-v1";



export const register = createAsyncThunk("api/register", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("/api/register", userData)
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const login = createAsyncThunk("api/login", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("/api/login", userData)
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})


