import { api } from "./axios_client";
import type{ IssueFormData } from "../utils/issue.types";



export async function fetchIssues(){
    const response=await api.get('/api/issues/');
    return response.data;
}

export async function fetchProjectIssues(projectId:string){
    const response=await api.get(`/api/issues/${projectId}`);
    return response.data;
}

export async function addIssue(projectId:string,data:IssueFormData){
    const response=await api.post(`/api/issues/${projectId}`,data);
    return response.data;
}
export async function fetchProjectMembers(projectId:string){
    const response=await api.get(`/api/issues/${projectId}/members`);
    return response.data;
} 
export async function getFetchIssueById(issueId:string){
    const response=await api.get(`/api/issues/by/${issueId}`);
    return response.data;
}
export async function updateIssueStatus(issueId:string,status:string){
    const response=await api.patch(`/api/issues/${issueId}/change-status`,{status});
    return response.data;
}
export async function deleteIssue(issueId:string){
    const response=await api.delete(`/api/issues/${issueId}`);
    return response.data;
}