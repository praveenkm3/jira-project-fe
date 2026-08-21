import { api } from "./axios_client"; 
import type{ commentUpdateType } from "../utils/comments.types";

 
export async function fetchComments(issueId:string){
    const response=await api.get(`/api/comments/${issueId}`);
    return response.data;
}
export async function updateComment(commentId:string,data:commentUpdateType){
    const response=await api.patch(`/api/comments/edit/${commentId}`,data);
    return response.data;
}
export async function deleteComment(commentId:string){
    const response=await api.delete(`/api/comments/delete/${commentId}`);
    return response.data;
}
export async function addComment(issueId:string,comment:string){
    const response=await api.post(`/api/comments/${issueId}`,{comment});
    return response.data;
}

export async function getMyComments(){
    const response=await api.get('/api/comments/my-comments');
    return response.data;
}
