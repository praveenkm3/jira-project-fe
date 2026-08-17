import { api } from "./axios_client";

export async function boardProgressCounts(){
    const response=await api.get('/api/boards/progress-counts');
    return response.data;   
}

export async function boardStatusCounts(){
    const response=await api.get('/api/boards/status-counts');
    return response.data;   
}

export async function boardPriorityCounts(){
    const response=await api.get('/api/boards/priority-counts');
    return response.data;   
}

export async function boardTypeCounts(){
    const response=await api.get('/api/boards/type-counts');
    return response.data;   
}
