import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchIssues,
  fetchProjectIssues,
  addIssue,
  fetchProjectMembers,
  getFetchIssueById,
  updateIssueStatus,
  updateIssue,
  deleteIssue, 
} from "../api/issues.api";
import type { IssueFormData } from "../utils/issue.types";
import queryClient from "./queryClient";

export const useGetIssues = (search:string) => {
  return useQuery({
    queryKey: ["get-issues",search],
    queryFn: async ()=>{
      return fetchIssues(search);
    },
  });
};

export const useGetProjectIssues = (projectId: string) => {
  return useQuery({
    queryKey: ["get-project-issues", projectId],
    queryFn: async () => {
      const response = await fetchProjectIssues(projectId);
      return response;
    },
  });
};

export const useAddIssues = (projectId: string) => {
  return useMutation({
    mutationFn: async (data: IssueFormData) => {
      const response = await addIssue(projectId, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-project-issues"] });
    },
  });
};

export const useGetProjectMembers = (prjectId: string) => {
  return useQuery({
    queryKey: ["get-project-members", prjectId],
    queryFn: async () => {
      const response = await fetchProjectMembers(prjectId);
      return response;
    },
    enabled: !!prjectId,
  });
};
export const useGetIssueById = (issueId: string) => {
  return useQuery({
    queryKey: ["get-issues-by-id", issueId],
    queryFn: async () => {
      return getFetchIssueById(issueId);
    },
  });
};
export const useUpdateIssueStatus = () => {
  return useMutation({
    mutationFn: async ({
      issueId,
      status,
    }: {
      issueId: string;
      status: string;
    }) => {
      const response = await updateIssueStatus(issueId, status);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-issues"] });
    },
  });
};

export const useUpdateIssue = (projectId: string, isAuthor: boolean) => {
  return useMutation({
    mutationFn: async ({
      issueId,
      data,
    }: {
      issueId: string;
      data: IssueFormData;
    }) => {
      if (!isAuthor) {
        throw new Error("Only issue creators can update issues");
      }
      const response = await updateIssue(issueId, data);
      return response;
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:["get-project-issues", projectId]})
    }
  });
};
export const useIssueDelete = (projectId:string) => {
  return useMutation({
    mutationFn: deleteIssue,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:["get-project-issues", projectId]})
    }
  });
};