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
  Autocomplete,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAddIssues, useGetProjectMembers } from "../hooks/issues.hook";
import type {
  IssueFormData,
  IssueStatus,
  IssuePriority,
  IssueTypeFor,
  Member
} from "../utils/issue.types";

const STATUS_OPTIONS: IssueStatus[] = ["Open", "In Progress", "Done"];
const PRIORITY_OPTIONS: IssuePriority[] = ["Low", "Medium", "High"];
const TYPE_OPTIONS: IssueTypeFor[] = ["Bug", "Feature", "Task"];

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    "& fieldset": { borderColor: "#cbd5e1", borderWidth: 1.5 },
    "&:hover fieldset": { borderColor: "#94a3b8" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6", borderWidth: 2 },
  },
};

const emptyForm: IssueFormData = {
  title: "",
  description: "",
  status: "Open",
  priority: "Medium",
  type: "Bug",
  assignee_id: "",
  due_date: "",
};

interface IssueFormDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export default function IssueFormDialog({
  open,
  onClose,
  projectId,
}: IssueFormDialogProps) {
  const { mutate: addIssue, isPending } = useAddIssues(projectId);
  const { data: members } = useGetProjectMembers(projectId);

  const [formData, setFormData] = useState<IssueFormData>(emptyForm);
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (open) {
      setFormData(emptyForm);
      setDueDate(null);
    }
  }, [open]);

  const handleChange =
    (field: keyof IssueFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!dueDate) {
      toast.error("Due date is required");
      return;
    }
    const payload = { ...formData, due_date: dueDate.format("YYYY-MM-DD") };

    addIssue(payload, {
      onSuccess: () => {
        toast.success("Issue created successfully");
        onClose();
      },
      onError: () => toast.error("Issue not created"),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add Issue
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
          <TextField
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            fullWidth
            sx={textFieldSx}
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            rows={3}
            sx={textFieldSx}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              select
              label="Status"
              value={formData.status}
              onChange={handleChange("status")}
              fullWidth
              sx={textFieldSx}
            >
              {STATUS_OPTIONS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.replace("_", " ")}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Priority"
              value={formData.priority}
              onChange={handleChange("priority")}
              fullWidth
              sx={textFieldSx}
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Priority"
              value={formData.type}
              onChange={handleChange("type")}
              fullWidth
              sx={textFieldSx}
            >
              {TYPE_OPTIONS.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            minDate={dayjs()} // restricts to today or later — blocks past dates
            slotProps={{
              textField: {
                fullWidth: true,
                sx: textFieldSx,
              },
            }}
          />

          <Autocomplete<Member>
            options={members ?? []}
            getOptionLabel={(member) => member.name}
            renderOption={(props, member) => (
              <Box
                component="li"
                {...props}
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                  {member.name.charAt(0).toUpperCase()}
                </Avatar>

                {member.name}
              </Box>
            )}
            onChange={(_, value) =>
              setFormData((prev) => ({
                ...prev,
                assignee_id: value?.id ?? "",
              }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Assignee" sx={textFieldSx} />
            )}
          />
        </Box>
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
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
