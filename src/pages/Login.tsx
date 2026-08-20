import { useForm } from "react-hook-form";
import { loginSchema } from "../utils/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { loginType } from "../utils/auth.types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router";
import { useLogin } from "../hooks/auth.hooks";
import jiraLogo from "../../public/jira_logo.svg"
import { useNavigate } from "react-router";
import { UseAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";


export default function Login() {
  const { mutate } = useLogin();
  const navigate=useNavigate();
const {setCurrentUser}=UseAuth()!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginType) => {
    // console.log(data);
    mutate(data, {
      onSuccess:(logData)=>{
        setCurrentUser(logData);
        navigate('/home')
      },
      onError:()=>{ 
        toast.error("Login Failed");   
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
        position:"fixed"
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
          bgcolor: "background.paper",
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 1,
            py: 1.3,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Login
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
            Don't have an account?
          </Typography>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            Sign up
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
