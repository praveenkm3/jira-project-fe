import type { ProjectMemberType } from "./project.types";
export interface RemoveMembersDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  members: ProjectMemberType[];
}
export interface AddMembersDialogType {
  open: boolean;
  onClose: () => void;
  projectId: string;
  existingMemberIds: string[];
}
export interface AddStatusDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}
export interface AddDesignationDialogProps {
  open: boolean;
  onClose: () => void;
}
