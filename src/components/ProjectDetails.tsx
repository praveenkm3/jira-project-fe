import { useParams } from "react-router";
import { useFetchSpecificProject } from "../hooks/project.hooks";
import PageLoader from "./Loader";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UseAuth } from "../contexts/AuthContext";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ProjectForm from "./ProjectForm";
import { IssueDetails } from "./IssueDetails";



export const ProjectDetails = () => {
  const { projectId } = useParams();
  const { data: project, isLoading } = useFetchSpecificProject(
    projectId as string,
  );
  const { currentUser } = UseAuth()!;
  const isAdmin = currentUser ? currentUser.role === "admin" : false;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <> 
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {project.project_name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Chip label={project.project_key} size="small" variant="outlined" />
            <Chip
              label={project.project_status}
              size="small"
              color={
                project.project_status === "ACTIVE" ? "success" : "default"
              }
            />
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1.5, maxWidth: 600 }}
          >
            {project.project_description}
          </Typography>
        </Box>

        {isAdmin && (
          <>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setEditOpen(true);
                  setAnchorEl(null);
                }}
              >
                Edit Project
              </MenuItem>
              <MenuItem
                sx={{ color: "error.main" }}
                onClick={() => {
                 setAnchorEl(null);
                 alert('Delete Project');
                }}
              >
                Delete Project
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
 
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Issues
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIssueDialogOpen(true)}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Add Issue
        </Button>
      </Box>
      {issueDialogOpen && <h5>Add New Issue</h5>}

      {/* <IssueTable issues={issues} /> */}
      <IssueDetails />

      <ProjectForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialData={project}
      />
    </>
  );
};