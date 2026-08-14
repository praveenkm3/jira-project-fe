import { api } from "./axios_client";  


export async function getNotifications(){
    const response=await api.get('/api/notifications/');
    return response.data;
    
}