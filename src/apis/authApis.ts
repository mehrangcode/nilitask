import axios from "axios";
import { appConst } from "../utils/AppConst";

export async function fetchAllUsers() {
    return await axios.get(appConst.serverUrl + `/api/user`)
}

export async function login(payload) {
    return await axios.get(appConst.serverUrl + `/api/login?username=${payload.userName}&password=${payload.password}`)
}
export async function register(payload) {
    return await axios.post(appConst.serverUrl + `/api/register`, payload)
}