import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../api/authApi'

axios.defaults.baseURL = "https://connections-api.goit.global/"

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ""
}


export const register = createAsyncThunk("users/signup", async (userData, thunkAPI) => {
  try {
    const response = await authApi.post("/users/signup", userData)
    if (response.data.token) {
      setAuthHeader(response.data.token)
    } else {
      return thunkAPI.rejectWithValue("token bulunamadı")
    }
    return response.data

  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const login = createAsyncThunk("users/login", async (userData, thunkAPI) => {
  try {
    const response = await authApi.post("/users/login", userData)
    if (response.data.token) {
      setAuthHeader(response.data.token)
    } else {
      return thunkAPI.rejectWithValue("token bulunamadı")
    }
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    await authApi.post("/users/logout")
    clearAuthHeader()
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }

})


export const refresh = createAsyncThunk("users/current", async (_, thunkAPI) => {
  const state = thunkAPI.getState()
  const token = state.auth.token
  if (!token) return thunkAPI.rejectWithValue("Token bulunamadı")
  setAuthHeader(token)
  try {
    const response = await authApi.get("/users/current")
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})


