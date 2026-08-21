import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { useReadNotification } from "../hooks/notify.hooks";
import type { Notification } from "../utils/issue.types";
export default function Notifications({
  anchorEl,
  onClose,
  notifications,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  notifications: Notification[];
}) {
  const open = Boolean(anchorEl);
  const { mutate } = useReadNotification();
  const handleRead = (notify_id: string) => {
    mutate(notify_id);
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

      <Box
        sx={{
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowY: "auto",
        }}
      >
        {notifications?.length > 0 ? (
          notifications.map((item: Notification) => (
            <Box
              key={item.notification_id}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                px: 2,
                py: 1.5,
                borderRadius: "8px",
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
              <Button
                onClick={() => handleRead(item.notification_id)}
                sx={{
                  minWidth: 100,
                  height: 30,
                  fontSize: 10,
                  whiteSpace: "nowrap",
                  px: 1,
                }}
              >
                Mark as Read
              </Button>
            </Box>
          ))
        ) : (
          <Typography sx={{ p: 10, ml: 10 }}>No Notifications</Typography>
        )}
      </Box>
    </Popover>
  );
}
