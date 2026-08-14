import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router";
import type{ProjectType } from "../utils/project.types";


const statusColors: Record<ProjectType["project_status"], { bg: string; text: string }> = {
  ACTIVE: { bg: "rgba(34,197,94,0.12)", text: "#15803D" },
  COMPLETED: { bg: "rgba(99,102,241,0.12)", text: "#4338CA" }
};

function initials(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

export default function ProjectCard({ project }: { project: ProjectType }) {
  const navigate = useNavigate();
  const status = statusColors[project.project_status] ?? statusColors.ACTIVE;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "12px",
        borderColor: "#EAEAEC",
        transition: "border-color 120ms ease, box-shadow 120ms ease",
        boxShadow: 10
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/projects/${project.project_id}`)}
        sx={{ p: 2.25 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{ fontSize: 15, fontWeight: 600, color: "#1A1A1F", lineHeight: 1.3 }}
              noWrap
            >
              {project.project_name}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "#8A8B95", mt: 0.25 }}>
              {project.project_key}
            </Typography>
          </Box>

          <Chip
            label={project.project_status.replace("_", " ")}
            size="small"
            sx={{
              bgcolor: status.bg,
              color: status.text,
              fontWeight: 600,
              fontSize: 11,
              height: 22,
              borderRadius: "6px",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
            <Avatar sx={{ width: 22, height: 22, fontSize: 11, bgcolor: "#6366F1" }}>
              {initials(project.created_by.name)}
            </Avatar>
            <Typography sx={{ fontSize: 12.5, color: "#63656F" }} noWrap>
              {project.created_by.name}
            </Typography>
          </Box>

          <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": {
                width: 26,
                height: 26,
                fontSize: 11,
                border: "2px solid #fff",
              },
            }}
          >
            {project.members.map((m) => (
              <Tooltip key={m.project_members_id} title={`${m.user.name} · ${m.user.role}`}>
                <Avatar sx={{ bgcolor: "#EEF0FF", color: "#4338CA" }}>
                  {initials(m.user.name)}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </CardActionArea>
    </Card>
  );
}