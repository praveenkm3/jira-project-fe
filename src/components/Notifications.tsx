import Popover from "@mui/material/Popover";
import { Box, Typography } from "@mui/material"; 
import { useEffect, useState } from "react";

export default function Notifications({
  anchorEl,
  onClose,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) { 
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = useState<string[]>([]);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5700");

    socket.onopen = () => {
      console.log("WebSocket connected");

      socket.send("Hello from frontend!");
    };
    socket.onmessage = (event) => {
      console.log("Message from backend:", event.data);
      setNotifications((prev: string[]) => [...prev, event.data]);
    };

    return () => {
      socket.close();
    };
  }, []);

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
        {notifications.map((item: string) => (
          <Box
            key={item}
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
              {item}
            </Typography>
          </Box>
        ))} 
      </Box>
    </Popover>
  );
}
