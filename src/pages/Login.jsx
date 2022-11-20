import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    await signIn(email.value, password.value);
    navigate("/");
  };

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          mt: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>

        <Typography component={"h1"} variant="h5">
          Sign In
        </Typography>
        <form
          onSubmit={handleLogin}
          sx={{
            width: "100%",
            mt: 1,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            size="small"
            required
            fullWidth
            id="email"
            name="email"
            type={"email"}
            autoFocus
            autoComplete="off"
          ></TextField>
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            size="small"
            fullWidth
            id="password"
            name="password"
            type={"password"}
            autoFocus
            autoComplete="current-password"
          ></TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{
              margin: theme.spacing(3, 0, 2),
            }}
          >
            Sign in
          </Button>
        </form>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link
              style={{
                textDecoration: "none",
              }}
              variant="body2"
              href={"/register"}
            >
              New User? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
