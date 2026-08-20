import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify"; 
import { UseAuth } from "../contexts/AuthContext";
import type { AddStatusDialogProps } from "../utils/dialog.types";
import { useAddProjectStatuses } from "../hooks/project.hooks";
 

export default function AddNewStatus({
  open,
  onClose,
  projectId,
}: AddStatusDialogProps) {
  const { currentUser } = UseAuth()!; 

  const isAdmin: boolean = currentUser?.role === "admin";
 const {mutate:addNewStatus}=useAddProjectStatuses(projectId,isAdmin)
const[statusName,setStatusName]=useState("");
const handleStatus=()=>{
    if(!statusName.trim()){
        toast.error("Status Name Required")
        return ;
    }
    addNewStatus(statusName,{
        onSuccess:()=>{
            toast.success("New status added Successfully");
            onClose();
            return;
        },
        onError:()=>{
            toast.error("New status not added");
            onClose();
            return;
        }
    })
}
  return (
    <Dialog
  open={open}
  onClose={onClose}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: 3,
      py: 2,
      fontWeight: 600,
    }}
  >
    Add New Status

    <IconButton
      onClick={onClose}
      size="small"
      sx={{
        color: "text.secondary",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <Divider />

  <DialogContent sx={{ px: 3, py: 4 }}>
    <TextField
      fullWidth
      autoFocus
      label="Status Name"
      placeholder="Enter status name"
      value={statusName}
      onChange={(e) => setStatusName(e.target.value)}
      variant="outlined"
    />
  </DialogContent>

  <DialogActions
    sx={{
      px: 3,
      py: 2,
      gap: 1,
    }}
  >
    <Button
      onClick={onClose}
      color="inherit"
    >
      Cancel
    </Button>

    <Button
      onClick={handleStatus}
      variant="contained"
      disabled={!statusName.trim()}
    >
      Add Status
    </Button>
  </DialogActions>
</Dialog>
  );
}
