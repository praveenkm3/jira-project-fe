import {
  Box,
  Chip,
  Divider,
  ListItemIcon,
  Popover,
  Typography,
} from "@mui/material";
import { useGetProfile, useLogout } from "../hooks/auth.hooks";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { toTitleCase } from "../algorithms/strings_operations";
import { UseAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const Profile = ({
  anchorEl,
  onClose,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) => {
  const { mutate } = useLogout();
  const { removeUser } = UseAuth()!;
  const navigate = useNavigate();
  const { data: profileData, isLoading } = useGetProfile();
  console.log(profileData);
  const open = Boolean(anchorEl);
  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        removeUser();
        toast.success("Logout Success");
        navigate("/login");
      },
      onError: () => {
        toast.error("Logout Not Success");
      },
    });
  };
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 500,
              maxHeight: 420,
              mt: 1,
              borderRadius: 2,
              border: "1px solid #E5E7EB",
              boxShadow: 2,
            },
          },
        }}
      >
        {!isLoading && (
          <>
            <Box
              sx={{
                px: 2,
                py: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {toTitleCase(profileData!.name)}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                {toTitleCase(profileData!.email)}
              </Typography>
              <Chip
                label={toTitleCase(profileData!.role)}
                size="small"
                variant="outlined"
                color={profileData!.role === "admin" ? "success" : "primary"}
                sx={{ fontSize: 12, fontWeight: 600, width: 100 }}
              />
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mx: 3, py: 2 }}>
              <ListItemIcon onClick={handleLogout}>
                <LogoutOutlinedIcon fontSize="small" />
                <Typography sx={{ fontWeight: 600, fontSize: 13, ml: 2 }}>
                  Logout
                </Typography>
              </ListItemIcon>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};
