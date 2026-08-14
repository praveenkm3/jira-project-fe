import Popover from "@mui/material/Popover";
import { Box, Typography } from "@mui/material";
import { useGetNotifications } from "../hooks/notify.hooks";
import PageLoader from "./Loader";
import type { notifyType } from "../utils/use.types";
import dayjs from "dayjs";

export default function Notifications({
  anchorEl,
  onClose,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) {
  const { data, isLoading } = useGetNotifications();
  const open = Boolean(anchorEl);

  const getCurrentHours = (date: string) => {
    const hrs = dayjs().diff(dayjs(date), "hour");
    if (hrs >= 24) {
      return `${dayjs().diff(dayjs(date), "days")} days`;
    }
    return `${hrs} hrs`;
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            width: 500,
            maxHeight: 420,
            mt: 1,
            borderRadius: 2,
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #E5E7EB" }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
          Recent Notifications
        </Typography>
      </Box>

      <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1, overflowY: "auto" }}>
        {isLoading ? (
          <PageLoader />
        ) : data?.length ? (
          data.map((item: notifyType) => (
            <Box
              key={item.notification_id}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                px: 2,
                py: 1.5,
                borderRadius: "8px"
              }}
            >
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.message}
              </Typography>

              <Typography sx={{ ml: 2, flexShrink: 0, fontSize: 11, color: "#9CA3AF" }}>
                {getCurrentHours(item.createdAt)}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ fontSize: 13, color: "#9CA3AF", textAlign: "center", py: 2 }}>
            No notifications yet.
          </Typography>
        )}
      </Box>
    </Popover>
  );
}