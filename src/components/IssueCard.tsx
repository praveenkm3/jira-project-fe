import { Avatar, Box, Chip, Typography } from "@mui/material";
import highIcon from "../../public/highPriority.png";
import mediumIcon from "../../public/equal.svg";
import lowIcon from "../../public/down.png";
interface IssueCardProps {
  title: string;
  typeText: string;
  statusText: string;
  priorityText: string;
  reporter_email: string;
  onClick?: () => void;
}

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 60%, 55%)`;
};

export default function IssueCard({
  title,
  typeText,
  statusText,
  priorityText,
  reporter_email,
  onClick,
}: IssueCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        mb: 1.5,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        bgcolor: "#fff",
        cursor: onClick ? "pointer" : "default",
        boxShadow:10
      }}
    >
      <Typography
        sx={{ fontSize: 14.5, fontWeight: 500, mb: 1.5, lineHeight: 1.4 }}
      >
        {title}
      </Typography>
      <Chip
        label={typeText}
        size="small"
        sx={{
          bgcolor:
            typeText === "Task"
              ? "#3B82F6"
              : typeText === "Feature"
                ? "#8B5CF6"
                : typeText === "Bug"
                  ? "#EF4444"
                  : "#6B7280",
          color: "#fff",
          fontWeight: 600,
          fontSize: 11,
          height: 22,
          borderRadius: "6px",
          mb: 1.5,
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Chip
            label={statusText}
            variant="outlined"
            size="small"
            sx={{
              color:
                statusText === "Open"
                  ? "#3B82F6"
                  : statusText === "In Progress"
                    ? "#F59E0B"
                    : statusText === "Done"
                      ? "#22C55E"
                      : "#6B7280",
              fontWeight: 600,
              fontSize: 11,
              height: 22,
              borderRadius: "6px",
              mb: 1.5,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              component="img"
              src={
                priorityText === "High"
                  ? highIcon
                  : priorityText === "Low"
                    ? lowIcon
                    : mediumIcon
              }
              alt="priority"
              sx={{ width: 16, height: 16 }}
            />
            <Typography sx={{ fontSize: 15, color: "#6B7280" }}>
              {priorityText}
            </Typography>
          </Box>

          <Avatar
            sx={{
              width: 26,
              height: 26,
              fontSize: 12,
              bgcolor: stringToColor(reporter_email),
            }}
          >
            {reporter_email[0].toUpperCase()}
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}
