import { Box, Button, Typography } from "@mui/material";
import IssueCard from "../components/IssueCard";
import { useGetIssues } from "../hooks/issues.hook";
import PageLoader from "../components/Loader";
import type { cardIssueType } from "../utils/issue.types";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

export const Issues = () => {
  const { data, isLoading } = useGetIssues();
  const [search, setSearch] = useState<string>("");
  function handleSearch(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>){
    setSearch(e.target.value);
    console.log(search)
  }
  if (isLoading) {
    return <PageLoader />;
  }
  const open = data["Open"] ?? [];
  const inprogress = data["In Progress"] ?? [];
  const done = data["Done"] ?? [];

  return (
    <Box>
      <Box sx={{mb:5}}>
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
        <SearchIcon fontSize="small" sx={{ color: "text.secondary" }}  />
        <InputBase placeholder="Search for issues..." sx={{ fontSize: 14, flex: 1 }} onChange={handleSearch} />
        <Button variant="outlined">Search</Button>
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
                title={item.issue_title}
                typeText={item.issue_type}
                priorityText={item.issue_priority}
                statusText={item.issue_status}
                reporter_email={item.reporter.email}
                onClick={() => {}}
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
                title={item.issue_title}
                typeText={item.issue_type}
                priorityText={item.issue_priority}
                statusText={item.issue_status}
                reporter_email={item.reporter.email}
                onClick={() => {}}
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
                title={item.issue_title}
                typeText={item.issue_type}
                priorityText={item.issue_priority}
                statusText={item.issue_status}
                reporter_email={item.reporter.email}
                onClick={() => {}}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
