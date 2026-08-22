import { addDesignation,updateDesignation,deleteDesignation } from "../api/designation.api";
import { useMutation } from "@tanstack/react-query";
import queryClient from "./queryClient";

export function useAddDesignation() {
  return useMutation({
    mutationFn: async (designation: string) => {
      return await addDesignation(designation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-designations"] });
    },
  });
}
export function useUpdateDesignation(designation_id:string) {
  return useMutation({
    mutationFn: async (designation_name:string) => {
      return await updateDesignation(designation_id,designation_name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-designations"] });
    },
  });
}

export function useDeleteDesignation() {
  return useMutation({
    mutationFn: async (designation_id: string) => {
      return await deleteDesignation(designation_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-designations"] });
    },
  });
}
