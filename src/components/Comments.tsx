import { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { toast } from "react-toastify";
import { useFetchComments,useAddComment } from "../hooks/comment.hooks";
import { UseAuth } from "../contexts/AuthContext";
import CommentItem from "../components/CommentItem";
import type { CommentType } from "../utils/comments.types";


export default function CommentSection({ issueId }: { issueId: string }) {
  const { currentUser } = UseAuth()!;
  const { data: comments, isLoading } = useFetchComments(issueId);
  const { mutate: addComment, isPending } = useAddComment(issueId);

  const [newComment, setNewComment] = useState<string>("");

  const handleAdd = () => {
    if (!newComment.trim()) return;
    addComment(newComment, {
      onSuccess: () => {setNewComment("");toast.success("New Comment Added")},
      onError: () => toast.error("Failed to add comment"),
    });
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1.5 }}>
        Comment Section
      </Typography>

      <TextField
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        fullWidth
        multiline
        minRows={2}
        size="small"
        sx={{ mb: 1 }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleAdd}
          disabled={isPending || !newComment.trim()}
          sx={{ textTransform: "none" }}
        >
          {isPending ? "Posting..." : "Comment"}
        </Button>
      </Box>

      {isLoading ? (
        <Typography sx={{ fontSize: 13, color: "#9CA3AF" }}>Loading comments...</Typography>
      ) : comments?.length ? (
        comments.map((comment:CommentType, i:number) => (
          <Box key={comment.comment_id}>
            <CommentItem comment={comment} currentUserId={currentUser!.id as string} issueId={issueId} />
            {i < comments.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))
      ) : (
        <Typography sx={{ fontSize: 13, color: "#9CA3AF" }}>
          No comments yet.
        </Typography>
      )}
    </Box>
  );
}