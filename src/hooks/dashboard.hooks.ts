import { useQuery } from "@tanstack/react-query";
import {
  boardProgressCounts,
  boardStatusCounts,
  boardPriorityCounts,
  boardTypeCounts,
} from "../api/dashboard.api";

export const useGetBoardProgressCounts = () => {
  return useQuery({
    queryKey: ["progress-counts"],
    queryFn: boardProgressCounts,
  });
};

export const useGetBoardStatusCounts = () => {
  return useQuery({
    queryKey: ["status-counts"],
    queryFn: boardStatusCounts,
  });
};
export const useGetBoardPriorityCounts = () => {
  return useQuery({
    queryKey: ["priority-counts"],
    queryFn: boardPriorityCounts,
  });
};

export const useGetBoardTypeCounts = () => {
  return useQuery({
    queryKey: ["type-counts"],
    queryFn: boardTypeCounts,
  });
};
