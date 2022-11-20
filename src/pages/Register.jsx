import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/auth";

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signUp(data.get("email"), data.get("password"), data.get("name"));
    navigate("/login");
  };

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component={"h1"} variant="h5">
          Sign Up
        </Typography>
        <Box component={"form"} sx={{ mt: 3 }} onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                size="small"
                autoComplete="given-name"
                fullWidth
                required
                variant="outlined"
                name="name"
                id="name"
                label="Name"
                autoFocus
                type={"text"}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                autoComplete="email"
                fullWidth
                required
                variant="outlined"
                name="email"
                id="email"
                label="Email"
                type="email"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                autoComplete="new-password"
                fullWidth
                required
                variant="outlined"
                name="password"
                id="password"
                label="Password"
                type="password"
              ></TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Register
          </Button>

          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link variant="body2" href="/login">
                Already have an account ? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
