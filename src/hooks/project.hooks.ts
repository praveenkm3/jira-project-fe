import { useQuery, useMutation } from "@tanstack/react-query";
import queryClient from "./queryClient";
import {
  fetchProjects,
  addProjects,
  fetchSpecificProject,
  updateProject,
  getAllUsers,
  addProjectMembers,
  removeProjectMember,
  updateProjectMembers,
  deleteProject,
  getMyProjectForSearch
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
    queryKey: ["get-specific-projects", projectId],
    queryFn: async () => {
      const response = await fetchSpecificProject(projectId);
      return response;
    },
    enabled: !!projectId,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-projects"] }); 
      queryClient.invalidateQueries({ queryKey: ["my-project-search"] });
    },
  });
};
export const useUpdateProject = (isAdmin: boolean, projectId: string) => {
  return useMutation({
    mutationFn: async (data: ProjectFormData) => {
      if (!isAdmin) {
        throw new Error("Only admins can update projects");
      }
      const response = await updateProject(projectId, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-specific-projects"] });
    },
  });
};
export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ["fetch-users"],
    queryFn: getAllUsers,
  });
};
export const useAddProjectMembers = (isAdmin: boolean, projectId: string) => {
  return useMutation({
    mutationFn: async (data: string[]) => {
      if (!isAdmin) {
        throw new Error("Only admins can Add project members");
      }
      const response = await addProjectMembers(projectId, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-projects"] });
    },
  });
};
export const useUpdateMembers = (isAdmin: boolean, projectId: string) => {
  return useMutation({
    mutationFn: async (data: string[]) => {
      if (!isAdmin) {
        throw new Error("Only admins can Add project members");
      }
      const response = await updateProjectMembers(projectId, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-projects"] });
    },
  });
};
export const useRemoveMembers = (isAdmin: boolean, projectId: string) => {
  return useMutation({
    mutationFn: async (userId: string) => {
      if (!isAdmin) {
        throw new Error("Only admins can Add project members");
      }
      const response = await removeProjectMember(projectId, userId);
      return response;
    },
  });
};
export const useProjectDelete = () => {
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-projects"] });
    },
  });
};
export const useGetMyProjectForSearch = () => {
  return useQuery({
    queryKey: ["my-project-search"],
    queryFn:getMyProjectForSearch
  });
};
