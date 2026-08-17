import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PageLoader from "../components/Loader";
import { useAddProject, useUpdateProject } from "../hooks/project.hooks";
import { UseAuth } from "../contexts/AuthContext";
import type { ProjectFormData, ProjectStatus } from "../utils/project.types";
import { toast } from "react-toastify";
const STATUS_OPTIONS: ProjectStatus[] = ["ACTIVE", "COMPLETED"];

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    "& fieldset": { borderColor: "#cbd5e1", borderWidth: 1.5 },
    "&:hover fieldset": { borderColor: "#94a3b8" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6", borderWidth: 2 },
  },
};

interface ProjectForm {
  open: boolean;
  onClose: () => void;
  initialData?: ProjectFormData & { project_id?: string };
}

const emptyForm: ProjectFormData = {
  project_name: "",
  project_key: "",
  project_description: "",
  project_status: "ACTIVE",
};

export default function ProjectForm({
  open,
  onClose,
  initialData,
}: ProjectForm) {
  const { currentUser } = UseAuth()!;
  const isAdmin = currentUser ? currentUser.role === "admin" : false;

  const isEditMode = !!initialData;

  const { mutate: addProject, isPending: isAdding } = useAddProject(isAdmin);
  const { mutate: updateProject, isPending: isUpdating } =useUpdateProject(isAdmin,initialData?.project_id as string);

  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);

  useEffect(() => {
    if (open) {
      setFormData(initialData ?? emptyForm);
    }
  }, [open, initialData]);

  const handleChange =
    (field: keyof ProjectFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = () => {
    if (isEditMode && initialData?.project_id) {
      updateProject(formData, {
        onSuccess: () => {
          toast.success("Project Updated successfully");
          onClose();
        },
        onError: () => toast.error("Project not updated"),
      });
    } else {
      addProject(formData, {
        onSuccess: () => {
          toast.success("Project created successfully");
          onClose();
        },
        onError: () => toast.error("Project not created"),
      });
    }
  };
  if (isAdding || isUpdating) {
    return <PageLoader />;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEditMode ? "Edit Project" : "Add Project"}
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
          <TextField
            label="Project Name"
            value={formData.project_name}
            onChange={handleChange("project_name")}
            fullWidth
            sx={textFieldSx}
          />
          <TextField
            label="Project Key"
            value={formData.project_key}
            onChange={handleChange("project_key")}
            fullWidth
            sx={textFieldSx}
            disabled={isEditMode}
          />
          <TextField
            label="Project Description"
            value={formData.project_description}
            onChange={handleChange("project_description")}
            fullWidth
            multiline
            rows={4}
            sx={textFieldSx}
          />
          <TextField
            select
            label="Project Status"
            value={formData.project_status}
            onChange={handleChange("project_status")}
            fullWidth
            sx={textFieldSx}
          >
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          {isEditMode ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
