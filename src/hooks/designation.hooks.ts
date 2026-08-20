import { addDesignation } from "../api/designation.api";
import { useMutation } from "@tanstack/react-query";
import queryClient from "./queryClient";

export function useAddDesignation() {
    return useMutation({
        mutationFn:async (designation:string)=>{
            return await addDesignation(designation)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['user-designations']})
        }
    });
}