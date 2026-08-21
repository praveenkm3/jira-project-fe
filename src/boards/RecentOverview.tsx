import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PageLoader from "../components/Loader";
import { getCurrentHours } from "../algorithms/strings_operations";
import { useGetMyComments } from "../hooks/comment.hooks";
import type { UserComments } from "../utils/comments.types";

export const RecentOverview = () => {
  const { data, isLoading } = useGetMyComments();
  return (
    <>
      <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #E5E7EB" }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
          Recent Activity
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
        {isLoading ? (
          <PageLoader />
        ) : data?.length ? (
          data.map((item: UserComments) => (
            <Box
              key={item.comment_id}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                px: 2,
                py: 1.5,
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "#F9FAFB",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.comment}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 12,
                  color: "#6990dd",
                }}
              >
                On issue: <strong>{item.issue.title}</strong>
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 11,
                }}
              >
                {getCurrentHours(item.createdAt)}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography
            sx={{ fontSize: 13, color: "#9CA3AF", textAlign: "center", py: 2 }}
          >
            No Activity yet.
          </Typography>
        )}
      </Box>
    </>
  );
};
