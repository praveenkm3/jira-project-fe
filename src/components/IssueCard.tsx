import { Avatar, Box, Chip, MenuItem, Select, Typography } from "@mui/material";
import highIcon from "../../public/highPriority.png";
import mediumIcon from "../../public/equal.svg";
import lowIcon from "../../public/down.png";
import type { IssueCardProps } from "../utils/issue.types";
import { stringToColor } from "../algorithms/strings_operations";
import { useGetSpecificProjectStatuses } from "../hooks/project.hooks";
import type { statusType } from "../utils/use.types";


export default function IssueCard({
  title,
  typeText,
  status_id,
  priorityText,
  reporter_email,
  onClick,
  issue_id,
  onStatusChange,
  project_id
}: IssueCardProps) {
const{data:projectStatuses,isFetching:statusesFetching}=useGetSpecificProjectStatuses(project_id);

  return (
    <Box
      key={issue_id}
      onClick={onClick}
      sx={{
        p: 2,
        mb: 1.5,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        bgcolor: "#fff",
        cursor: onClick ? "pointer" : "default",
        boxShadow: 10,
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
        <Select
          value={status_id}
          size="small"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => { 
            e.stopPropagation();
            onStatusChange?.(issue_id, e.target.value);
          }}
          sx={{
            height: 28,
            fontSize: 11,
            fontWeight: 600,
            width:120
          }}
        >
          {
            !statusesFetching && projectStatuses.map((item:statusType)=>{
              return <MenuItem value={item.status_id} key={item.status_name}>{item.status_name}</MenuItem>
            })
          }
        </Select>
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
