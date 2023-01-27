import { commonrequest } from "./ApiCall"
import { BASE_URL } from "./helper"

export const sendMessage = async (data) => {
  return await commonrequest("POST", `${BASE_URL}/send`, data);
}

export const getAllMessages = async () => {
  return await commonrequest("GET", `${BASE_URL}/all`, "");
}