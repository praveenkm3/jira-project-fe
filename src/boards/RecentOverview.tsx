import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import PageLoader from "../components/Loader"
import type { notifyType } from "../utils/use.types"
import { getCurrentHours } from "../algorithms/strings_operations"
import { useGetNotifications } from "../hooks/notify.hooks";


export const RecentOverview=()=>{
    const { data, isLoading } = useGetNotifications();
    return (
        <>
        <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #E5E7EB" }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
          Recent Activity
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
            No Activity yet.
          </Typography>
        )}
      </Box></>
    )
}