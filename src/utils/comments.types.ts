export interface CommentUser {
  id: string;
  name: string;
  email: string;
}

export interface CommentType {
  comment_id: string;
  issue_id: string;
  comment: string;
  creator: CommentUser;
  createdAt: string;
  updatedAt: string;
}
export type commentUpdateType = { 
  message: string;
};
export interface CommentItemProps {
  comment: CommentType;
  currentUserId: string;
  issueId: string;
}
