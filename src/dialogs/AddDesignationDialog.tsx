import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import type { AddDesignationDialogProps } from "../utils/dialog.types";
import {
  useAddDesignation,
  useUpdateDesignation,
} from "../hooks/designation.hooks";
import { toast } from "react-toastify";
export default function AddDesignationDialog({
  open,
  onClose,
  designationToEdit,
}: AddDesignationDialogProps) {
  const [designation, setDesignation] = useState("");
  const { mutate } = useAddDesignation();
  const isEditMode = Boolean(designationToEdit);

  const { mutate: updateDesignation } = useUpdateDesignation(
    designationToEdit?.designation_id ?? "",
  );
  useEffect(() => {
    if (open) {
      setDesignation(designationToEdit?.designation_name ?? "");
    }
  }, [open, designationToEdit]);
  const handleSubmit = () => {
    const value = designation.trim();

    if (!value) return;
    if (isEditMode) {
      updateDesignation(value, {
        onSuccess: () => {
          toast.success("Designation Updated");
          setDesignation("");
          onClose();
        },
        onError: () => {
          toast.error("Designation Not Updated");
        },
      });

      return;
    } else {
      mutate(designation, {
        onSuccess: () => {
          toast.success("New Designation Added");
        },
        onError: () => {
          toast.error("Designation Not Added");
        },
      });
    }

    setDesignation("");
    onClose();
  };

  const handleClose = () => {
    setDesignation("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {isEditMode ? "Update Designation" : "Add Designation"}
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!designation.trim()}
        >
          {isEditMode ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
