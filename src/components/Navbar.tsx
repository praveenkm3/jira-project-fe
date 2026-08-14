import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"; 
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import jiraSvg from "../../public/jira_logo.svg";
import { useLogout } from "../hooks/auth.hooks";
import { useNavigate } from "react-router";
import { UseAuth } from "../contexts/AuthContext";


export default function Navbar() {
  const{mutate}=useLogout();
  const navigate=useNavigate();
  const {removeUser,currentUser} =UseAuth()!;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    mutate(undefined,{
      onSuccess:()=>{
        removeUser();
        navigate('/login');
        
      },
      onError:()=>{
        alert("Not Logout");
      }
    })
  };
 
  return (
    <Toolbar sx={{ gap: 1.5 }}>
      <Stack direction="row" spacing={1.25} sx={{alignItems:"center"}}>
        <Box
          component="img"
          src={jiraSvg}
          alt="Jira logo"
          sx={{ width: 40, height: 40 }}
        />
        <Typography noWrap sx={{ fontWeight: 500, fontSize: 22, color: "#003049" }}>
          Jira
        </Typography>
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.5,
          borderRadius: "8px",
          bgcolor: "rgba(0,0,0,0.04)",
          width: 240,
        }}
      >
        <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
        <InputBase placeholder="Search…" sx={{ fontSize: 14, flex: 1 }} />
      </Box>

      <IconButton aria-label="notifications">
        <Badge color="error" variant="dot">
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>

      <Tooltip title="Account">
        <IconButton onClick={handleOpen} sx={{ p: 0, ml: 0.5 }}>
          <Avatar sx={{ width: 34, height: 34, fontSize: 13, bgcolor: "#6366F1" }}>
            {currentUser?.email ? currentUser?.email[0].toUpperCase() : "Z"}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { width: 220, mt: 1 } } }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }} noWrap>
            {currentUser?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}