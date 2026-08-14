export interface IssueUser {
  id: string;
  email: string;
}

export interface Issue {
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

export type IssuesResponse = Issue[];