import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridFilterModel,
  type GridRowsProp,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UseAuth } from "../contexts/AuthContext";
import { IssueDeleteDialog } from "../dialogs/IssueDeleteDialog";
import IssueFormDialog from "../dialogs/IssueForm";
import { useGetProjectIssues } from "../hooks/issues.hook";
import type { IssueType } from "../utils/issue.types";
import PageLoader from "./Loader";

export const IssueTable = ({ projectId }: { projectId: string }) => {
  const { currentUser } = UseAuth()!;
  const navigate = useNavigate();
  const [editIssue, setEditIssue] = useState<IssueType | null>(null);
  const [deleteIssue, setDeleteIssue] = useState<IssueType | null>(null);
  const columns: GridColDef[] = [
    { field: "issue_title", headerName: "Issue Title", flex: 1, minWidth: 150 },
    {
      field: "issue_description",
      headerName: "Description",
      flex: 1.5,
      minWidth: 200,
    },
    { field: "issue_type", headerName: "Type", flex: 0.7, minWidth: 100 },
    {
      field: "issue_priority",
      headerName: "Priority",
      flex: 0.7,
      minWidth: 100,
    },
    { field: "issue_status", headerName: "Status", flex: 0.7, minWidth: 100 },
    { field: "reporter", headerName: "Creator", flex: 1, minWidth: 150 },
    { field: "assignee", headerName: "Assignee", flex: 1, minWidth: 150 },

    {
      field: "issue_start_date",
      headerName: "Start Date",
      flex: 0.5,
      minWidth: 130,
      renderCell(params) {
        if(params.row.issue_start_date){
          return dayjs(params.row.issue_start_date).format("DD MMM YYYY");
        }else{
          return "Not Started";
        }
      },
    },
    {
      field: "issue_due_date",
      headerName: "Due Date",
      flex: 1,
      minWidth: 150,
      renderCell(params) {
        return dayjs(params.row.issue_due_date).format("DD MMM YYYY");
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      maxWidth: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              gap: 0.5,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{
                minWidth: 32,
                width: 32,
                height: 32,
                padding: 0,
              }}
              onClick={() => navigate(`/issues/${params.row.id}`)}
            >
              <VisibilityIcon />
            </Button>

            {currentUser?.id === params.row.reporter_id ||
            currentUser?.id === params.row.assignee_id ? (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 32,
                    width: 32,
                    height: 32,
                    padding: 0,
                    color: "black",
                    border: 0.5,
                  }}
                  onClick={() => setEditIssue(params.row.originalIssue)}
                >
                  <EditIcon />
                </Button>
              </>
            ) : (
              <></>
            )}
            {currentUser?.id === params.row.reporter_id && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{
                  minWidth: 32,
                  width: 32,
                  height: 32,
                  padding: 0,
                }}
                onClick={() => setDeleteIssue(params.row)}
              >
                <DeleteIcon />
              </Button>
            )}
          </Box>
        );
      },
    },
  ];
  const [filterDataSend, setFilterDataSend] = useState({
    field: "",
    value: "",
  });
  const [filterData, setFilterData] = useState({
    field: "",
    value: "",
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      const field = filterData.field.trim();
      const value = filterData.value.trim();
      setFilterDataSend({ field, value });
    }, 2000);
    return () => clearTimeout(timer);
  }, [filterData]);
  const handleFilter = (e: GridFilterModel) => {
    setFilterData({
      field: e.items[0].field.trim(),
      value: e.items[0].value ?? "",
    });
    // console.log(e.items[0].field);
    // console.log(e.items[0].value);
  };
  const { data, isLoading } = useGetProjectIssues(
    projectId,
    paginationModel.page,
    paginationModel.pageSize,
    filterDataSend.field,
    filterDataSend.value,
  );
  const rows: GridRowsProp[] = data?.result?.map((issue: IssueType) => ({
    id: issue.issue_id,
    issue_title: issue.issue_title,
    issue_number: issue.issue_number,
    issue_description: issue.issue_description,
    issue_type: issue.issue_type,
    issue_priority: issue.issue_priority,
    issue_status: issue.issue_status.status_name,
    reporter: issue.reporter.name,
    reporter_id: issue.reporter.id,
    assignee: issue.assignee?.name,
    assignee_id: issue.assignee?.id,
    issue_due_date: issue.issue_due_date,
    issue_start_date: issue.issue_start_date,
    originalIssue: issue,
    issue_id: issue.issue_id,
  }));
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <Box style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows ?? []}
          columns={columns}
          sx={{
            width: "100%",
            height: "100%",
          }}
          getRowId={(row) => row.issue_id}
          paginationMode="server"
          filterMode="server"
          onFilterModelChange={handleFilter}
          onPaginationModelChange={setPaginationModel}
          rowCount={data?.totalRecords ?? 0}
          pageSizeOptions={[1, 5, 10, 25, 50]}
          paginationModel={{
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
          }}
          slotProps={{
            filterPanel: {
              disableAddFilterButton: true,
              filterFormProps: {
                operatorInputProps: {
                  sx: { display: "none" },
                },
              },
            },
          }}
        />
        <IssueFormDialog
          projectId={projectId}
          issue={editIssue}
          onClose={() => setEditIssue(null)}
          open={editIssue !== null}
        />
        <IssueDeleteDialog
          onClose={() => setDeleteIssue(null)}
          selectedValue={deleteIssue?.issue_title as string}
          open={deleteIssue !== null}
          issueId={deleteIssue?.issue_id as string}
          projectId={projectId}
        />
      </Box>
    </>
  );
};
