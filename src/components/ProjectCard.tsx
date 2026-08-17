import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { useNavigate } from "react-router";
import { useState } from "react";
import type { ProjectType } from "../utils/project.types";
import { UseAuth } from "../contexts/AuthContext";
import AddMembers from "../dialogs/AddMembers";
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import EditMembers from "../dialogs/EditMembers";
import { initials } from "../algorithms/strings_operations";



export default function ProjectCard({ project }: { project: ProjectType }) {
  const navigate = useNavigate();
  const { currentUser } = UseAuth()!;
  const isAdmin = currentUser ? currentUser.role === "admin" : false;
  const [manageMembersOpen, setManageMembersOpen] = useState(false);
  const [addMembersOpen, setAddMembersOpen] = useState(false);
  const existedMembers = project.members.map((m) => m.user.id) as string[];

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "12px",
        borderColor: "#EAEAEC", 
        boxShadow: 10,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/projects/${project.project_id}`)}
        sx={{ p: 2.25, flex: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 600,
                color: "#1A1A1F",
                lineHeight: 1.3,
              }}
              noWrap
            >
              {project.project_name}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "#8A8B95", mt: 0.25 }}>
              {project.project_key}
            </Typography>
          </Box>

          <Chip
            label={project.project_status}
            size="small"
            sx={{
              
              bgcolor: project.project_status==='ACTIVE' ? "rgba(34,197,94,0.12)" :"rgba(99,102,241,0.12)",
              color:project.project_status==='ACTIVE'? "#15803D" :  "#4338CA",
              fontWeight: 600,
              fontSize: 11,
              height: 22,
              borderRadius: "6px",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              minWidth: 0,
            }}
          >
            <Avatar
              sx={{ width: 22, height: 22, fontSize: 11, bgcolor: "#6366F1" }}
            >
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
              <Tooltip
                key={m.project_members_id}
                title={`${m.user.name} · ${m.user.role}`}
              >
                <Avatar sx={{ bgcolor: "#EEF0FF", color: "#4338CA" }}>
                  {initials(m.user.name)}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </CardActionArea>

      {isAdmin && (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            startIcon={<PersonRemoveAlt1OutlinedIcon fontSize="small" />}
            onClick={(e) => {
              e.stopPropagation();
              setManageMembersOpen(true);
            }}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,
              py: 1.25,
            }}
          >
            Remove Members
          </Button>
          <Button
            startIcon={<PersonAddAlt1OutlinedIcon fontSize="small" />}
            onClick={(e) => {
              e.stopPropagation();
              setAddMembersOpen(true);
            }}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 0,
              py: 1.25,
            }}
          >
            Add Members
          </Button>
        </Box>
      )}

      <AddMembers
        open={addMembersOpen}
        onClose={() => setAddMembersOpen(false)}
        projectId={project.project_id}
        existingMemberIds={existedMembers}
      />

      <EditMembers
        open={manageMembersOpen}
        onClose={() => setManageMembersOpen(false)}
        projectId={project.project_id}
        members={project.members}
      />
    </Card>
  );
}
