import { useMutation ,useQuery} from "@tanstack/react-query"; 
import queryClient from "./queryClient";
import {updateComment,deleteComment, fetchComments, addComment} from "../api/comments.api";
import type{ commentUpdateType } from "../utils/comments.types";

export const useUpdateComment = (commentId:string) => {
  return useMutation({ 
    mutationFn:async (data:commentUpdateType) => {
        return updateComment(commentId,data);
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['fetch-comments']})
    }
  })
};
export const useDeleteComment = () => {
  return useMutation({
    mutationFn:async (commentId:string) => {
        return deleteComment(commentId);
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['fetch-comments']})
    }
  })
};
export const useFetchComments = (issueId:string) => {
  return useQuery(
    {
        queryKey:['fetch-comments'],
        queryFn:async ()=>{
            return fetchComments(issueId);
        }
    }
  )
};
export const useAddComment = (issueId:string) => {
  return useMutation({
    mutationFn:async (message:string) => {
        return addComment(issueId,message);
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['fetch-comments']})
    }
  })
};