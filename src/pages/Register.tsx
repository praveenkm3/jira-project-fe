import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { registerType } from "../utils/auth.types";
import { registerSchema } from "../utils/auth.schema";
import jiraLogo from "../../public/jira_logo.svg";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { useRegister } from "../hooks/auth.hooks";
import { useNavigate } from "react-router";

function Register() {
  const { mutate } = useRegister();
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: registerType) => {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        toast.success("Registration Successfull");
        navigate('/login');
        
      },
      onError: () => {
        toast.success("Registration Not Successfull"); 
      },
    });
  };

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
        <FormControl error={!!errors.role}>
          <FormLabel>Role</FormLabel>
          <RadioGroup row>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                px: 1,
                mr: 1,
              }}
            >
              <Radio value="admin" {...register("role")} />
              <Typography>Admin</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                px: 1,
              }}
            >
              <Radio value="developer" {...register("role")} />
              <Typography>Developer</Typography>
            </Box>
          </RadioGroup>
        </FormControl>

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
