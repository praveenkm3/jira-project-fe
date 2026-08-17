import { Box, Button, Typography } from "@mui/material";
import IssueCard from "../components/IssueCard";
import { useGetIssues } from "../hooks/issues.hook";
import PageLoader from "../components/Loader";
import type { cardIssueType } from "../utils/issue.types";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router";
import { useUpdateIssueStatus } from "../hooks/issues.hook";

export const Issues = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, isLoading } = useGetIssues(searchValue);
  const [search, setSearch] = useState<string>("");
  const { mutate: changeTaskStatus } = useUpdateIssueStatus();
  function handleSearch(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) {
    setSearch(e.target.value);
  }
  function sumbitSearch() {
    setSearchValue(search);
    setSearch("");
  }
  if (isLoading) {
    return <PageLoader />;
  }
  const open = data["Open"] ?? [];
  const inprogress = data["In Progress"] ?? [];
  const done = data["Done"] ?? [];

  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.5,
            borderRadius: "8px",
            bgcolor: "rgba(0,0,0,0.04)",
            width: 400,
          }}
        >
          <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <InputBase
            placeholder="Search for issues..."
            sx={{ fontSize: 14, flex: 1 }}
            onChange={handleSearch}
          />
          <Button variant="outlined" onClick={sumbitSearch}>
            Search
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ flex: 1, minWidth: 260 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 2 }}>
            Open {open.length}
          </Typography>
          {open.map((item: cardIssueType) => {
            return (
              <IssueCard
                key={item.issue_id}
                issue_id={item.issue_id}
                title={item.issue_title}
                typeText={item.issue_type}
                priorityText={item.issue_priority}
                statusText={item.issue_status}
                reporter_email={item.reporter.email}
                onClick={() => {
                  navigate(`/issues/${item.issue_id}`);
                }}
                onStatusChange={(issueId: string, newStatus: string) => {
                  changeTaskStatus({
                    issueId: issueId,
                    status: newStatus,
                  });
                }}
              />
            );
          })}
        </Box>
        <Box sx={{ flex: 1, minWidth: 260 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 2 }}>
            In Progress {inprogress.length}
          </Typography>
          {inprogress.map((item: cardIssueType) => {
            return (
              <IssueCard
                key={item.issue_id}
                issue_id={item.issue_id}
                title={item.issue_title}
                typeText={item.issue_type}
                priorityText={item.issue_priority}
                statusText={item.issue_status}
                reporter_email={item.reporter.email}
                onClick={() => {
                  navigate(`/issues/${item.issue_id}`);
                }}
                onStatusChange={(issueId: string, newStatus: string) => {
                  changeTaskStatus({
                    issueId: issueId,
                    status: newStatus,
                  });
                }}
              />
            );
          })}
        </Box>
        <Box sx={{ flex: 1, minWidth: 260 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 2 }}>
            Done {done.length}
          </Typography>
          {done.map((item: cardIssueType) => {
            return (
              <IssueCard
                key={item.issue_id}
                issue_id={item.issue_id}
                title={item.issue_title}
                typeText={item.issue_type}
                priorityText={item.issue_priority}
                statusText={item.issue_status}
                reporter_email={item.reporter.email}
                onClick={() => {
                  navigate(`/issues/${item.issue_id}`);
                }}
                onStatusChange={(issueId: string, newStatus: string) => {
                  changeTaskStatus({
                    issueId: issueId,
                    status: newStatus,
                  });
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
