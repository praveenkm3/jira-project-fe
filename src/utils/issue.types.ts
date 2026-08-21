export interface IssueUser {
  id: string;
  email: string;
  name: string;
}

export interface IssueType {
  issue_id: string;
  issue_number: number;
  issue_title: string;
  issue_description: string;
  issue_type: string;
  issue_priority: string;
  assignee: IssueUser | null;
  reporter: IssueUser;
  issue_due_date: string;
  issue_start_date?: string;
  createdAt: string;
  updatedAt: string;
  issue_status: {
    status_id: string;
    status_name: string;
  };
}

export type IssuesResponse = IssueType[];

export type IssuePriority = "Low" | "Medium" | "High";
export type IssueTypeFor = "Bug" | "Feature" | "Task";

export interface IssueFormData {
  title: string;
  description: string;
  status_id: string;
  priority: IssuePriority | string;
  type: IssueTypeFor | string;
  assignee_id: string;
  due_date: string;
  start_date?: string;
}

export interface IssueCardType {
  issue_id: string;
  project: {
    project_id: string;
    project_name: string;
  };
  issue_number: number;
  issue_title: string;
  issue_description: string;
  issue_type: IssueTypeFor | string;
  issue_priority: IssuePriority | string;
  assignee: {
    id: string;
    email: string;
  } | null;
  reporter: {
    id: string;
    email: string;
  };
  issue_due_date: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface cardIssueType {
  issue_title: string;
  issue_id: string;
  issue_type: string;
  issue_priority: string;
  assignee_email: string;
  assignee_id: string;
  reporter_email: string;
  reporter_id: string;
  onClick: () => void;
  project_id: string;
  status_id: string;
  status_name: string;
}
export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  designation: string;
}
export interface IssueCardProps {
  issue_id: string;
  title: string;
  typeText: string;
  status_id: string;
  priorityText: string;
  reporter_email: string;
  onClick?: () => void;
  onStatusChange?: (issueId: string, newStatus: string) => void;
  project_id: string;
}
export interface IssueFormDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  issue?: IssueType | null;
}
export interface IssueDeleteDialogProps {
  open: boolean;
  selectedValue: string;
  issueId: string;
  onClose: () => void;
  projectId: string;
}
export type Notification = {
  notification_id: string;
  message: string;
  is_read: boolean;
  createdAt: string;
};
