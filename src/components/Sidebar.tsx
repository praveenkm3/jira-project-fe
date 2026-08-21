import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import type { layoutProp } from "../utils/use.types";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router";
import { UseAuth } from "../contexts/AuthContext";
const drawerWidth = 260;

const mainNav = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardOutlinedIcon,
    path: "/dashboard",
    roles: ["admin", "user"],
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderOutlinedIcon,
    path: "/projects",
    roles: ["admin", "user"],
  },
  {
    id: "issues",
    label: "Issues",
    icon: BugReportOutlinedIcon,
    path: "/issues",
    roles: ["user"],
  },
  {
    id: "members",
    label: "Members",
    icon: GroupOutlinedIcon,
    path: "/members",
    roles: ["admin", "user"],
  },
  {
    id: "designations",
    label: "Add Designations",
    icon: PlaylistAddIcon,
    path: "/designations",
    roles: ["admin"],
  },
];

export default function Sidebar({ children }: layoutProp) {
  const { currentUser } = UseAuth()!;
  const role = currentUser?.role as string;
  const navigate = useNavigate();
  const location = useLocation();
  const navList = mainNav.filter((item) => item.roles.includes(role));
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Navbar />
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#FAFAFA",
            color: "#1A1A1F",
            borderRight: "1px solid #EAEAEC",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            px: 1.5,
            pt: 1,
          }}
        >
          <Typography
            sx={{
              px: 1.5,
              pt: 1,
              pb: 0.5,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#8A8B95",
            }}
          >
            Workspace
          </Typography>

          <List sx={{ py: 0 }}>
            {navList.map(({ id, label, icon: Icon, path }) => {
              const isActive = location.pathname.startsWith(path);
              return (
                <ListItem key={id} disablePadding sx={{ mb: 0.25 }}>
                  <ListItemButton
                    onClick={() => {
                      navigate(`${path}`);
                    }}
                    sx={{
                      borderRadius: "8px",
                      py: 0.9,
                      position: "relative",
                      bgcolor: isActive
                        ? "rgba(99,102,241,0.10)"
                        : "transparent",
                      "&:hover": {
                        bgcolor: isActive
                          ? "rgba(99,102,241,0.14)"
                          : "rgba(0,0,0,0.03)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: -6,
                        top: "20%",
                        height: "60%",
                        width: 3,
                        borderRadius: "2px",
                        bgcolor: "#6366F1",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 120ms ease",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: isActive ? "#6366F1" : "#8A8B95",
                      }}
                    >
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: 14,
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? "#1A1A1F" : "#4B4C56",
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
