import {useGetProjectIssues } from "../hooks/issues.hook";
import PageLoader from "./Loader";
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "issue_title", headerName: "Issue Title",width:300 },
  { field: "issue_number", headerName: "Number"},
  { field: "issue_description", headerName: "Description",width:300 },
  { field: "issue_type", headerName: "Type" },
  { field: "issue_priority", headerName: "Priority" },
  { field: "issue_status", headerName: "Status" },
  { field: "reporter", headerName: "Creator",width:200},
  { field: "assignee", headerName: "Assignee",width:200 },
];
import type { IssueType } from "../utils/issue.types";

export const IssueTable = ({projectId}:{projectId:string}) => {
  const { data, isLoading } = useGetProjectIssues(projectId);
  const rows :GridRowsProp[]= data?.map((issue: IssueType) => ({
    id: issue.issue_id,
    issue_title: issue.issue_title,
    issue_number:issue.issue_number,
    issue_description: issue.issue_description,
    issue_type: issue.issue_type,
    issue_priority: issue.issue_priority, 
    issue_status: issue.issue_status,
    reporter: issue.reporter.email,
    assignee: issue.assignee?.email,
  }));
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
};
