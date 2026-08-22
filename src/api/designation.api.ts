import { api } from "./axios_client";

export async function addDesignation(designation: string) {
  const response = await api.post("/designations/create", { designation });
  return response.data;
}
export async function updateDesignation(designation_id: string,designation_name:string) {
  const response = await api.put(`/designations/update/${designation_id}`, { designation_name});
  return response.data;
}
export async function deleteDesignation(designation_id: string) {
  const response = await api.delete(`/designations/delete/${designation_id}`);
  return response.data;
}