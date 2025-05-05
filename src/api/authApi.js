import axios from "axios";
export const authApi = axios.create({
    baseURL: "https://connections-api.goit.global/"
})
