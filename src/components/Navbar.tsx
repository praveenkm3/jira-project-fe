import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip"; 
import jiraSvg from "../../public/jira_logo.svg"; 
import { useNavigate } from "react-router";
import { UseAuth } from "../contexts/AuthContext"; 
import Notifications from "./Notifications";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import { useGetMyProjectForSearch } from "../hooks/project.hooks";
import { find_prefix_matches } from "../algorithms/binary_search";
import type { ProjectSearchType } from "../utils/project.types"; 
import { Profile } from "./Profile";

export default function Navbar() { 
  const navigate = useNavigate();
  const { data } = useGetMyProjectForSearch();
  const { currentUser } = UseAuth()!; 
//  console.log(currentUser)
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [search, setSearch] = useState<string>("");
  const matchedresult = find_prefix_matches(search, data ?? []);
   

  return (
    <Toolbar sx={{ gap: 1.5 }}>
      <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
        <Box
          component="img"
          src={jiraSvg}
          alt="Jira logo"
          sx={{ width: 40, height: 40 }}
        />
        <Typography
          noWrap
          sx={{ fontWeight: 500, fontSize: 22, color: "#003049" }}
        >
          Jira
        </Typography>
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Box
        sx={{
          position: "relative",
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.5,
          borderRadius: "8px",
          bgcolor: "rgba(0,0,0,0.04)",
          width: 300,
        }}
      >
        <SearchIcon fontSize="small" sx={{ color: "black" }} />

        <InputBase
          placeholder="Search for projects..."
          sx={{
            fontSize: 14,
            flex: 1,
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {matchedresult.length > 0 && search && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              mt: 1,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
              zIndex: 1300,
              overflow: "hidden",
            }}
          >
            {matchedresult.map((item: ProjectSearchType) => (
              <Box
                key={item.project_id}
                onClick={() => {
                  navigate(`/projects/${item.project_id}`);
                  setSearch("");
                }}
                sx={{
                  px: 2,
                  py: 1.5,
                  cursor: "pointer",

                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                {item.project_name}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <IconButton onClick={(e) => setNotifAnchorEl(e.currentTarget)}>
        <NotificationsIcon />
      </IconButton>

      <Notifications
        anchorEl={notifAnchorEl}
        onClose={() => setNotifAnchorEl(null)}
      />
      <Tooltip title="Account" > 
        <IconButton onClick={(e)=>setProfileAnchorEl(e.currentTarget)} sx={{ p: 0, ml: 0.5 }}>
          <Avatar
            sx={{ width: 34, height: 34, fontSize: 13, bgcolor: "#6366F1" }}
          >
            {currentUser?.email ? currentUser?.email[0].toUpperCase() : "Z"}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Profile
            anchorEl={profileAnchorEl}
            onClose={() => setProfileAnchorEl(null)}
          />

    </Toolbar>
  );
}
