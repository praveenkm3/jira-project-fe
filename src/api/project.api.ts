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
export async function getAllUsers(){
    const response=await api.get(`/api/users`);
    return response.data;
}

export async function addProjectMembers(projectId:string,data:string[]){
    const response=await api.post(`/api/project/${projectId}/members`,{data});
    return response.data;
}
export async function updateProjectMembers(projectId:string,data:string[]){
    const response=await api.put(`/api/project/${projectId}/members`,{data});
    return response.data;
}

export async function removeProjectMember(projectId:string,userId:string){
    const response=await api.delete(`/api/project/${projectId}/members/${userId}`);
    return response.data;
}

export async function deleteProject(projectId:string){
    const response=await api.delete(`/api/project/delete/${projectId}`);
    return response.data;
}