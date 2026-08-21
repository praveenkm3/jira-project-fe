import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useUpdateMembers } from "../hooks/project.hooks";
import { UseAuth } from "../contexts/AuthContext";
import type { RemoveMembersDialogProps } from "../utils/dialog.types";

function titleCase(name: string) {
  return name.trim().charAt(0).toUpperCase() + name.slice(1);
}

export default function EditMembers({
  open,
  onClose,
  projectId,
  members,
}: RemoveMembersDialogProps) {
  const { currentUser } = UseAuth()!;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isAdmin: boolean = currentUser?.role === "admin";

  const { mutate: removeMembers, isPending } = useUpdateMembers(
    isAdmin,
    projectId,
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleRemove = () => {
    if (!selectedIds.length) return;
    removeMembers(selectedIds, {
      onSuccess: () => {
        toast.success("Members removed successfully");
        setSelectedIds([]);
        onClose();
      },
      onError: () => {
        toast.error("Failed to remove members");
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-around", gap: 40 }}
      >
        Remove Members
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {members.length === 0 ? (
          <Typography>No members to remove.</Typography>
        ) : (
          <Box>
            {members.map((m) => {
              return (
                <Box
                  key={m.project_members_id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={selectedIds.includes(m.user.id as string)}
                    onChange={() => toggleSelect(m.user.id as string)}
                    disabled={currentUser?.id === m.user.id}
                  />

                  <Box sx={{ ml: 1 }}>
                    <Typography>{titleCase(m.user.email)}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          onClick={handleRemove}
          variant="contained"
          color="error"
          disabled={!selectedIds.length || isPending}
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}
