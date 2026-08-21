import { useFetchProjects } from "../hooks/project.hooks";
import PageLoader from "../components/Loader";
import { Box } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import type { ProjectType } from "../utils/project.types";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { UseAuth } from "../contexts/AuthContext";
import ProjectForm from "../dialogs/ProjectForm";

export const Projects = () => {
  const { data, isLoading } = useFetchProjects();
  const { currentUser } = UseAuth()!;
  const isAdmin = currentUser ? currentUser.role === "admin" : false;
  const [open, setOpen] = useState(false);
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Projects
        </Typography>

        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Add New Project
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 2,
        }}
      >
        {data.map((project: ProjectType) => (
          <ProjectCard key={project.project_id} project={project} />
        ))}
      </Box>

      <ProjectForm open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};
