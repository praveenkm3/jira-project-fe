import { api } from "./axios_client";

export async function addDesignation(designation: string) {
  const response = await api.post("/designations/create", { designation });
  return response.data;
}
