import { useMutation ,useQuery} from "@tanstack/react-query"; 
import { fetchIssues } from "../api/issues.api";

export const useGetIssues = () => {
  return useQuery({
    queryKey:['get-issues'],
    queryFn:fetchIssues
  })
};
