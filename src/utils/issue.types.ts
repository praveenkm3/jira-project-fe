export interface IssueUser {
  id: string;
  email: string;
}

export interface IssueType {
  issue_id: string;
  issue_number: number;
  issue_title: string;
  issue_description: string;
  issue_type: string;
  issue_priority: string;
  issue_status: string;
  assignee: IssueUser | null;
  reporter: IssueUser;
  issue_due_date: string;
  createdAt: string;
  updatedAt: string;
}

export type IssuesResponse = IssueType[];

export type IssueStatus = "Open" | "In Progress" | "Done";
export type IssuePriority = "Low" | "Medium" | "High";
export type IssueTypeFor = "Bug" | "Feature" | "Task";

export interface IssueFormData {
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  type: IssueTypeFor;
  assignee_id: string;
   due_date: string;
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
  issue_status: IssueStatus | string;
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
export interface cardIssueType{
    issue_title:string,
issue_type:string,
issue_priority:string,
issue_status:string,
reporter:{
    email:string
},
onClick:()=>void
}
export interface Member {
  id: string;
  name: string;
  email: string;
}