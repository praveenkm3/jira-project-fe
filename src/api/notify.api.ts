import { api } from "./axios_client";  


export async function getNotifications(){
    const response=await api.get('/api/notifications/');
    return response.data;
    
}
export async function readNotifications(notification_id:string){
    const response=await api.patch(`/api/notifications/${notification_id}`);
    return response.data;
    
}
