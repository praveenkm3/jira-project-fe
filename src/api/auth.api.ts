import { api } from "./axios_client";
import type{ loginType ,registerType} from "../utils/auth.types";
import type {  UserOption } from "../utils/use.types";


export async function login(body:loginType){
    const response=await api.post('/auth/login',body);
    return response.data;
    
}

export async function register(body:registerType){
    const response=await api.post('/auth/register',body);
    return response.data;
}


export async function profile():Promise<UserOption>{
    const response=await api.get('/api/users/me');
    return response.data;
}
export async function logout(){
    const response=await api.post('/auth/logout');
    return response.data;
}
export async function fetchUsers() {
    const response=await api.get('/api/users');
    return response.data;
}
export async function fetchRoleService() {
    const response=await api.get('/auth/roles');
    return response.data;
}
