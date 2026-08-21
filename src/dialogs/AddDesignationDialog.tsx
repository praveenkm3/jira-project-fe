import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import type { AddDesignationDialogProps } from "../utils/dialog.types";
import { useAddDesignation } from "../hooks/designation.hooks";
import { toast } from "react-toastify";
export default function AddDesignationDialog({
  open,
  onClose,
}: AddDesignationDialogProps) {
  const [designation, setDesignation] = useState("");
  const { mutate } = useAddDesignation();
  const handleSubmit = () => {
    const value = designation.trim();

    if (!value) return;
    mutate(designation, {
      onSuccess: () => {
        toast.success("New Designation Added");
      },
      onError: () => {
        toast.error("Designation Not Added");
      },
    });
    setDesignation("");
    onClose();
  };

  const handleClose = () => {
    setDesignation("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Designation</DialogTitle>

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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
