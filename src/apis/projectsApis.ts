import axios from "axios"
import { appConst } from "../utils/AppConst"

const endPoint = appConst.serverUrl + "/api/project"
export async function getAll() {
    return await axios.get(endPoint)
}
export async function getById(itemId: string) {
    return await axios.get(`${endPoint}/${itemId}`)
}
export async function createItem(payload) {
    return await axios.post(endPoint, payload)
}
export async function updateItem(itemId, payload) {
    return await axios.put(endPoint + `/${itemId}`, payload)
}
export async function deleteItem(itemId) {
    return await axios.delete(endPoint + `/${itemId}`)
}
export async function joinUser(itemId, userIds) {
    return await axios.patch(endPoint + `/${itemId}/joinUser?userIds[0]=${userIds}`,)
}
export async function removeUser(itemId, userIds) {
    return await axios.patch(endPoint + `/${itemId}/removeUser?userIds[0]=${userIds}`)
}