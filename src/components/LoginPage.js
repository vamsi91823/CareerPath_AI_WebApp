import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Avatar,
  Alert,
  IconButton,
  Stack,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import logo from "../Careerpath-logo.svg";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const VALID_EMAIL = "RVSSN@gmail.com";
  const VALID_PASSWORD = "1234";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setMessage("success");
      setTimeout(() => navigate("/profile"), 700);
    } else {
      setMessage("error");
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
      <Box sx={{ width: 400 }}>
        {/* Back to Home */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={() => navigate("/")}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="small">
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ fontFamily: "Quicksand", fontSize: 14, ml: -0.5 }}>
              Back to Home
            </Typography>
            <HomeIcon className="home-icon-anim" sx={{ fontSize: 18, color: '#000' }} aria-hidden="true" />
          </Stack>
        </Box>

        {/* Logo & Title */}
        <Box textAlign="center" mb={3}>
          <Avatar
            src={logo}
            sx={{
              width: 80,
              height: 80,
              margin: "0 auto",
              borderRadius: 4,
              boxShadow: 3,
            }}
          />

          <Typography
            variant="h4"
            sx={{ mt: 2, fontFamily: "'Pacifico', cursive", color: "#000" }}
          >
            CareerPath AI
          </Typography>

          <Typography sx={{ color: "gray", fontFamily: "Quicksand" }}>
            Your intelligent career guidance platform
          </Typography>
        </Box>

        {/* Card */}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              textAlign: "center",
              fontFamily: "Quicksand",
              fontWeight: 700,
            }}
          >
            Sign In
          </Typography>

          {message === "error" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Invalid email or password!
            </Alert>
          )}
          {message === "success" && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Login successful! Redirecting...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              type="submit"
              sx={{
                mt: 3,
                py: 1.5,
                background: "linear-gradient(to right, #1976d2, #00b0ff)",
                color: "#fff",
                fontSize: "16px",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(to right, #1259a8, #008ccd)",
                },
              }}
            >
              Sign In
            </Button>
          </form>
        </Card>

        <Typography
          textAlign="center"
          mt={2}
          sx={{ fontFamily: "Quicksand", color: "gray" }}
        >
          Don&apos;t have an account?
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#1976d2",
              marginLeft: 5,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign up
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
