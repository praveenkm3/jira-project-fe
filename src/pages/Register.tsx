import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { registerType, designationType } from "../utils/auth.types";
import { createRegisterSchema } from "../utils/auth.schema";
import jiraLogo from "../../public/jira_logo.svg";
import { toast } from "react-toastify";
import { toTitleCase } from "../algorithms/strings_operations";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import {
  useGetDesignationService,
  useGetRoleService,
  useRegister,
} from "../hooks/auth.hooks";
import { useNavigate } from "react-router";

function Register() {
  const { mutate } = useRegister();
  const navigate = useNavigate();
  const { data: roles } = useGetRoleService();
  const registerSchema = createRegisterSchema(roles ?? []);
  const { data: designations } = useGetDesignationService();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<registerType>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: registerType) => {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        toast.success("Registration Successfull");
        navigate("/login");
      },
      onError: () => {
        toast.error("Registration Not Successfull");
      },
    });
  };

  const selectedRoleId = watch("role");
  const selectedRole = roles?.find(
    (role: { role_id: string; role_name: string }) =>
      role.role_id === selectedRoleId,
  );

  const isUserRole = selectedRole?.role_name.toLowerCase() === "user";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        width: "100%",
        position: "fixed",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          boxShadow: 10,
          p: 5,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1.5,
          }}
        >
          <Box
            component="img"
            src={jiraLogo}
            alt="Jira Management"
            sx={{
              width: 50,
              height: 50,
              objectFit: "contain",
            }}
          />

          <Box>
            <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 500 }}>
              Welcome to Jira Management
            </Typography>
          </Box>
        </Box>
        <TextField
          label="Name"
          type="text"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <FormControl fullWidth error={!!errors.role}>
            <InputLabel>Role</InputLabel>

            <Select label="Role" defaultValue="" {...register("role")}>
              <MenuItem value="" disabled>
                Select a role
              </MenuItem>

              {roles?.map((role: { role_id: string; role_name: string }) => (
                <MenuItem key={role.role_id} value={role.role_id}>
                  {toTitleCase(role.role_name)}
                </MenuItem>
              ))}
            </Select>

            {errors.role && (
              <FormHelperText>{errors.role.message}</FormHelperText>
            )}
          </FormControl>
          {isUserRole && (
            <FormControl fullWidth error={!!errors.designation_id}>
              <InputLabel>Designation</InputLabel>
              <Select
                label="Designation"
                defaultValue=""
                {...register("designation_id")}
              >
                <MenuItem value="" disabled>
                  Select a designation
                </MenuItem>
                {designations?.map((designation: designationType) => (
                  <MenuItem
                    key={designation.designation_id}
                    value={designation.designation_id}
                  >
                    {toTitleCase(designation.designation_name)}
                  </MenuItem>
                ))}
              </Select>
              {errors.designation_id && (
                <FormHelperText>{errors.designation_id.message}</FormHelperText>
              )}
            </FormControl>
          )}
        </Box>
        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Already have an account?
          </Typography>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
