import { useMutation ,useQuery} from "@tanstack/react-query"; 
import { fetchIssues,fetchProjectIssues,addIssue, fetchProjectMembers } from "../api/issues.api"; 
import type{ IssueFormData } from "../utils/issue.types";
import queryClient from "./queryClient";



export const useGetIssues = () => {
  return useQuery({
    queryKey:['get-issues'],
    queryFn:fetchIssues
  })
};

export const useGetProjectIssues = (prjectId:string) => {
  return useQuery({
    queryKey:['get-project-issues',prjectId],
    queryFn:async ()=>{
      const response=await fetchProjectIssues(prjectId);
      return response;
    }
  })
};

export const useAddIssues = (projectId:string) => {
  return useMutation({
    mutationFn:async (data:IssueFormData)=>{
      const response = await addIssue(projectId,data);
      return response;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['get-project-issues']})
    }
  })
};

export const useGetProjectMembers = (prjectId:string) => {
  return useQuery({
    queryKey:['get-project-members',prjectId],
    queryFn:async ()=>{
      const response=await fetchProjectMembers(prjectId);
      return response;
    },
    enabled:!!prjectId,
  })
};
