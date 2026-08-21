import { useParams } from "react-router";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs";
import { useGetIssueById } from "../hooks/issues.hook";
import PageLoader from "../components/Loader";
import CommentSection from "../components/Comments";
import { initials } from "../algorithms/strings_operations";
import { toTitleCase } from "../algorithms/strings_operations";
export default function IssueDetail() {
  const { issueId } = useParams();

  const { data: issue, isLoading } = useGetIssueById(issueId as string);

  if (isLoading) return <PageLoader />;
  if (!issue) return <Typography sx={{ p: 3 }}>Issue not found.</Typography>;

  const isOverdue = dayjs(issue.issue_due_date).isBefore(dayjs(), "day");

  return (
    <Box sx={{ width: "90%", mx: "auto", boxShadow: 2, p: 4 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 600, mb: 2 }}>
        {issue.project.project_name} · {issue.project.project_key}-
        {issue.issue_number}
      </Typography>

      <Typography sx={{ fontSize: 15, mb: 2, fontWeight: 600 }}>
        {issue.issue_title}
      </Typography>

      <Typography
        sx={{ fontSize: 13.5, color: "#374151", mb: 2, whiteSpace: "pre-wrap" }}
      >
        {issue.issue_description || "No description provided."}
      </Typography>

      <Box sx={{ display: "flex", gap: 4, mb: 3, flexWrap: "wrap" }}>
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            Type
          </Typography>

          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {issue.issue_type}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            Status
          </Typography>

          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {issue.issue_status}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            Priority
          </Typography>

          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {issue.issue_priority}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 3 }}>
        <EventIcon
          sx={{ fontSize: 16, color: isOverdue ? "#EF4444" : "#374151" }}
        />
        <Typography
          sx={{ fontSize: 13, color: isOverdue ? "#EF4444" : "#374151" }}
        >
          Due {dayjs(issue.issue_due_date).format("MMM D, YYYY")}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography sx={{ fontSize: 12.5, width: 80, fontWeight: 600 }}>
            Assignee
          </Typography>
          {issue.assignee ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{ width: 26, height: 26, fontSize: 12, bgcolor: "#6366F1" }}
              >
                {initials(issue.assignee.name)}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: 15 }}>
                  {toTitleCase(issue.assignee.email)}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography sx={{ fontSize: 13 }}>Unassigned</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography sx={{ fontSize: 12.5, width: 80, fontWeight: 600 }}>
            Reporter
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 26, height: 26, fontSize: 12 }}>
              {initials(issue.reporter.name)}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: 15 }}>
                {toTitleCase(issue.reporter.email)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <CommentSection issueId={issue.issue_id} />
    </Box>
  );
}
