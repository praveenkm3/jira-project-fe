import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "../api/notify.api";




export const useGetNotifications=()=>{
    return useQuery({
        queryKey:['get-notifications'],
        queryFn:getNotifications
    })
}
