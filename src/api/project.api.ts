import { api } from "./axios_client"; 
import type{ ProjectFormData } from "../utils/project.types";

export async function fetchProjects(){
    const response=await api.get('/api/project/all-projects');
    return response.data;
}
export async function addProjects(data:ProjectFormData){
    const response=await api.post('/api/project/create',data);
    return response.data;
}
export async function fetchSpecificProject(projectId:string){
    const response=await api.get(`/api/project/${projectId}`);
    return response.data;
}
export async function updateProject(projectId:string,data:ProjectFormData){
    const response=await api.put(`/api/project/update/${projectId}`,data);
    return response.data;
}
