// src/components/SigninPage.js
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import logo from "../Careerpath-logo.svg";
import TopRightSignOut from "./TopRightSignOut";
import { signInUser } from "../Services/userService";

export default function SigninPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await signInUser({ email, password });

      // Store auth data
      localStorage.setItem("token", res.token);
      localStorage.setItem("uid", res.uid);
      localStorage.setItem("email", res.email);

      navigate("/profile");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #d4edf1ff, #acd2ebd8)",
        p: 2,
      }}
    >
      <TopRightSignOut />
      <Container maxWidth="sm">
        {/* Back to Home */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ cursor: "pointer", mb: 2 }}
          onClick={() => navigate("/")}
        >
          <ArrowBackIosNewIcon fontSize="small" />
          <Typography sx={{ fontFamily: "Quicksand", fontSize: 15 }}>
            Back to Home
          </Typography>
          <HomeIcon sx={{ fontSize: 18 }} />
        </Stack>

        {/* Logo */}
        <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <img
            src={logo}
            alt="CareerPath AI"
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: "'Pacifico', cursive",
            }}
          >
            CareerPath AI
          </Typography>

          <Typography sx={{ color: "#4b5563", fontFamily: "Quicksand" }}>
            Your intelligent career guidance platform
          </Typography>
        </Stack>

        {/* Sign In Card */}
        <Card sx={{ borderRadius: 4, p: 4, boxShadow: 4 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: 3,
              fontFamily: "Quicksand",
            }}
          >
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            sx={{
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              fontFamily: "Quicksand",
              fontWeight: 600,
              background: "linear-gradient(to right, #1976d2, #00b0ff)",
            }}
          >
            {loading ? <CircularProgress size={22} /> : "Sign In"}
          </Button>
        </Card>
      </Container>
    </Box>
  );
}
