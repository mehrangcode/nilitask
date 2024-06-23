import axios from "axios"
import { appConst } from "../utils/AppConst"

const endPoint = appConst.serverUrl + "/api/sprint"
// export async function getAll(projectId) {
//     return await axios.get(`endPoint?projectId=${projectId}`)
// }
export async function getById(itemId: string) {
    return await axios.get(endPoint + `/${itemId}`)
}
export async function createItem(payload) {
    return await axios.post(endPoint + "?projectId=" + payload.projectId, payload)
}
export async function updateItem(itemId, payload) {
    return await axios.put(endPoint + `/${itemId}`, payload)
}
export async function deleteItem(itemId) {
    return await axios.delete(endPoint + `/${itemId}`)
}