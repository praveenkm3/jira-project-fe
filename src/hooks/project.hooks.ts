import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchProjects,
  addProjects,
  fetchSpecificProject,
  updateProject,
} from "../api/project.api";
import type { ProjectFormData } from "../utils/project.types";

export const useFetchProjects = () => {
  return useQuery({
    queryKey: ["all-projects"],
    queryFn: fetchProjects,
  });
};
export const useFetchSpecificProject = (projectId: string) => {
  return useQuery({
    queryKey: ["all-projects", projectId],
    queryFn: async () => {
      const response = await fetchSpecificProject(projectId);
      return response;
    },
  });
};
export const useAddProject = (isAdmin: boolean) => {
  return useMutation({
    mutationFn: addProjects,
    onMutate: () => {
      if (!isAdmin) {
        throw new Error("Only admins can add projects");
      }
    },
  });
};
export const useUpdateProject = (isAdmin: boolean, projectId: string) => {
  return useMutation({
    mutationFn: async(data: ProjectFormData) => {
      if (!isAdmin) {
        throw new Error("Only admins can update projects");
      }
      const response =await updateProject(projectId, data);
      return response;
    },
  });
};
