import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Autocomplete,
  TextField,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useAddProjectMembers, useFetchAllUsers } from "../hooks/project.hooks";
import { UseAuth } from "../contexts/AuthContext";
import type{ AddMembersDialogType } from "../utils/dialog.types";
import type{ UserOption } from "../utils/use.types";
 

export default function AddMembers({
  open,
  onClose,
  projectId,
  existingMemberIds,
}:AddMembersDialogType) {
  const {currentUser}=UseAuth()!;
  const isAdmin:boolean =currentUser?.role ==='admin';
  const { data: allUsers } = useFetchAllUsers(isAdmin);
  const { mutate: addMembers, isPending } = useAddProjectMembers(isAdmin,projectId);

  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);

  const availableUsers = (allUsers ?? []).filter(
    (u: UserOption) => !existingMemberIds.includes(u.id)
  );

  const handleSubmit = () => {
    if (!selectedUsers.length) {
      toast.error("Select at least one member to add");
      return;
    }
    const membersToAdd:string[]=selectedUsers.map((u) => u.id);
    addMembers(membersToAdd,
      {
        onSuccess: () => {
          toast.success("Members added successfully");
          setSelectedUsers([]);
          onClose();
        },
        onError: () => toast.error("Failed to add members"),
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Add Members
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Autocomplete
          multiple
          options={availableUsers}
          value={selectedUsers}
          getOptionLabel={(u) => u.name}
          isOptionEqualToValue={(a, b) => a.id === b.id}
          onChange={(_, value) => setSelectedUsers(value)}
          renderOption={(props, u) => (
            <Box component="li" {...props} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                {u.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>{u.name}</Box>
              <Chip label={u.designation ? u.designation : u.role} size="small" variant="outlined" sx={{ height: 20, fontSize: 10 }} />
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select developers or admins" sx={{ mt: 1 }} />
          )}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isPending}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          {isPending ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}