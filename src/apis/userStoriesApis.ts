import axios from "axios"
import { appConst } from "../utils/AppConst"

const endPoint = appConst.serverUrl + "/api/userStory"
export async function getAll(projectId) {
    return await axios.get(endPoint+ "/" + projectId)
}
export async function getById(itemId: string) {
    return await axios.get(endPoint + `/${itemId}`)
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
export async function changeItemStatus(itemId, status) {
    return await axios.patch(endPoint + `/${itemId}/${status}`)
}
export async function saveNewMasseage(itemId, payload) {
    return await axios.post(endPoint + `/${itemId}/message`, payload)
}
export async function updateMasseage(itemId, messageId, payload) {
    return await axios.put(endPoint + `/${itemId}/message/${messageId}`, payload)
}
export async function deleteMasseage(itemId, messageId) {
    return await axios.delete(endPoint + `/${itemId}/message/${messageId}`)
}