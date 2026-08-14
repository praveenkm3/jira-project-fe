import { api } from "./axios_client";

export async function fetchIssues(){
    const response=await api.get('/api/issues/');
    return response.data;
}