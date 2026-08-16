import { useState } from "react";
import { Box, Avatar, Typography, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useUpdateComment,useDeleteComment } from "../hooks/comment.hooks";
import type {commentUpdateType,CommentItemProps } from "../utils/comments.types";
import { initials } from "../algorithms/strings_operations";
import { toTitleCase } from "../algorithms/strings_operations";



export default function CommentItem({ comment, currentUserId }: CommentItemProps) {
  const isAuthor = comment.creator.id === currentUserId;

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);

  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment(comment.comment_id);
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    const payload:commentUpdateType={ message: editText };
    updateComment(payload,
      {
        onSuccess: () => {
          toast.success("Comment updated");
          setIsEditing(false);
        },
        onError: () => toast.error("Failed to update comment"),
      }
    );
  };

  const handleDelete = () => {
    deleteComment(comment.comment_id, {
      onSuccess: () => toast.success("Comment deleted"),
      onError: () => toast.error("Failed to delete comment"),
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 1.5, py: 1 }}>
      <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>
        {initials(comment.creator.name)}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
            {toTitleCase(comment.creator.name)}
          </Typography>
          <Typography sx={{ fontSize: 11, color: "#9CA3AF" }}>
            {dayjs(comment.createdAt).format("MMM D, h:mm A")}
          </Typography>

          {isAuthor && !isEditing && (
            <Box sx={{display:"flex",ml:"auto"}}>
              <Button  onClick={() => setIsEditing(true)} sx={{width:"10px"}}><EditIcon sx={{ fontSize: 25 }} /></Button>
              <Button onClick={handleDelete} disabled={isDeleting}> <DeleteIcon sx={{ fontSize: 25 }} color="error" /></Button>
            </Box>
          )}
        </Box>

        {isEditing ? (
          <Box sx={{ mt: 1 }}>
            <TextField
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              fullWidth
              multiline
              size="small"
              autoFocus
            />
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Button
                size="small"
                variant="contained"
                onClick={handleSaveEdit}
                disabled={isUpdating}
                sx={{ textTransform: "none" }}
              >
                {isUpdating ? "Saving..." : "Save"}
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(comment.comment);
                }}
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography sx={{ fontSize: 13, color: "#374151", mt: 0.5, whiteSpace: "pre-wrap" }}>
            {comment.comment}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
