import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PageLoader from "../components/Loader";
import MembersTable from "../components/MembersTable";
import { useGetMyProjectForSearch } from "../hooks/project.hooks";
import { useGetSpecificProjectMembers } from "../hooks/project.hooks";
import { useState } from "react";
export default function Members() {
  const { data, isLoading } = useGetMyProjectForSearch();
  const [project, setProject] = useState<string>(
    data ? (data[0]?.project_id ?? "") : "",
  );
  const { data: projectMembers, isFetching: membersFetching } =
    useGetSpecificProjectMembers(project);
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Box sx={{ maxWidth: 450, mb: 10 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={project}
            label="Select Project"
            onChange={(e) => {
              setProject(e.target.value);
            }}
          >
            {JSON.stringify(projectMembers)}
            {data.map((item: { project_id: string; project_name: string }) => {
              return (
                <MenuItem value={item.project_id}>{item.project_name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {!membersFetching && <MembersTable rows={projectMembers} />}
    </>
  );
}
