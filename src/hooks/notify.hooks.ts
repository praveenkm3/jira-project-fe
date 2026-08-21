import { useMutation, useQuery } from "@tanstack/react-query";

import { getNotifications, readNotifications } from "../api/notify.api";
import queryClient from "./queryClient";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
};

export const useReadNotification = () => {
  return useMutation({
    mutationFn: async (notification_id: string) => {
      return readNotifications(notification_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
