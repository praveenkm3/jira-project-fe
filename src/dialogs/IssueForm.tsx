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
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAddIssues, useGetProjectMembers } from "../hooks/issues.hook";
import { useGetSpecificProjectStatuses } from "../hooks/project.hooks";
import { UseAuth } from "../contexts/AuthContext";
import type {
  IssueFormData,
  IssuePriority,
  IssueTypeFor,
  Member,
  IssueFormDialogProps,
} from "../utils/issue.types";
import type { statusType } from "../utils/use.types";
import { useUpdateIssue } from "../hooks/issues.hook";
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
  status_id: "",
  priority: "Medium",
  type: "Bug",
  assignee_id: "",
  due_date: "",
  start_date: "",
};

export default function IssueFormDialog({
  open,
  onClose,
  projectId,
  issue,
}: IssueFormDialogProps) {
  const { currentUser } = UseAuth()!;
  const { mutate: addIssue, isPending } = useAddIssues(projectId);
  const { data: members } = useGetProjectMembers(projectId);
  const { data: projectStatuses, isFetching: isStatusFetching } =
    useGetSpecificProjectStatuses(projectId);
  const [formData, setFormData] = useState<IssueFormData>(emptyForm);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);

  const isAuthor =
    currentUser?.id === issue?.reporter.id ||
    currentUser?.id === issue?.assignee!.id;
  const { mutate: updateIssue } = useUpdateIssue(projectId, isAuthor);
  useEffect(() => {
    if (!open) return;

    if (issue) {
      setFormData({
        title: issue.issue_title,
        description: issue.issue_description,
        status_id: issue.issue_status.status_id,
        priority: issue.issue_priority,
        type: issue.issue_type,
        assignee_id: issue.assignee?.id ?? "",
        start_date: issue.issue_start_date ?? "",
        due_date: issue.issue_due_date ?? "",
      });

      setStartDate(
        issue.issue_start_date ? dayjs(issue.issue_start_date) : null,
      );
      setDueDate(issue.issue_due_date ? dayjs(issue.issue_due_date) : null);
    } else {
      setFormData(emptyForm);
      setStartDate(null);
      setDueDate(null);
    }
  }, [open, issue]);

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
    if (startDate && dueDate && startDate.isAfter(dueDate, "day")) {
      toast.error("Start date cannot be after due date");
      return;
    }
    if (!formData.assignee_id) {
      toast.error("Assigned user is required");
      return;
    }
    const payload = {
      ...formData,
      start_date: startDate ? startDate.format("YYYY-MM-DD") : "",
      due_date: dueDate.format("YYYY-MM-DD"),
    };
    if (issue) {
      updateIssue(
        { issueId: issue.issue_id, data: payload },
        {
          onSuccess: () => {
            toast.success("Issue Updated Successfully");
            onClose();
          },
          onError: () => {
            toast.error("Issue Not Updated Successfully");
          },
        },
      );
    } else {
      addIssue(payload, {
        onSuccess: () => {
          toast.success("Issue created successfully");
          onClose();
        },
        onError: () => toast.error("Issue not created"),
      });
    }
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
              value={formData.status_id}
              onChange={handleChange("status_id")}
              fullWidth
              sx={textFieldSx}
            >
              {!isStatusFetching &&
                projectStatuses.map((status: statusType) => (
                  <MenuItem key={status.status_id} value={status.status_id}>
                    {status.status_name}
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
              label="Type"
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
          <Box sx={{ display: "flex", gap: 2 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              minDate={dayjs()}
              maxDate={dueDate ?? undefined}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: textFieldSx,
                },
              }}
              disabled={!dueDate}
            />
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              minDate={dayjs()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: textFieldSx,
                },
              }}
            />
          </Box>

          <Autocomplete<Member>
            options={members ?? []}
            value={
              members?.find(
                (member: { email: string; id: string }) =>
                  member.id === formData.assignee_id,
              ) ?? null
            }
            getOptionLabel={(member) => member.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, member) => (
              <Box
                component="li"
                {...props}
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                  {member.name.charAt(0).toUpperCase()}
                </Avatar>

                {member.name}
                <Chip
                  label={member.designation}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, fontSize: 10, ml: "auto" }}
                />
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
          {issue ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
