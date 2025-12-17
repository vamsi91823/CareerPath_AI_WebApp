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
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import logo from "../Careerpath-logo.svg";
import TopRightSignOut from "./TopRightSignOut";
import { signUpUser } from "../Services/userService";

export default function SignupPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(""); // error | mismatch | success
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setApiError("");

    if (!firstName || !lastName || !email || !password) {
      setMessage("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("mismatch");
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    };

    try {
      setLoading(true);
      const res = await signUpUser(payload);
      localStorage.setItem("token", res.token);
      setMessage("success");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setApiError(err.message || "Signup failed");
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
        background: "linear-gradient(to bottom right, #ffffff, #e6f7ff)",
        p: 2,
      }}
    >
      <TopRightSignOut />
      <Box sx={{ width: 420 }}>
        {/* Back */}
        <Box
          sx={{ display: "flex", alignItems: "center", mb: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <IconButton size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ fontFamily: "Quicksand", fontSize: 14, ml: -0.5 }}>
            Back to Home
          </Typography>
        </Box>

        {/* Logo */}
        <Box textAlign="center" mb={3}>
          <Avatar
            src={logo}
            sx={{ width: 80, height: 80, margin: "0 auto", borderRadius: 4 }}
          />
          <Typography
            variant="h4"
            sx={{ mt: 2, fontFamily: "'Pacifico', cursive" }}
          >
            CareerPath AI
          </Typography>
          <Typography sx={{ color: "gray", fontFamily: "Quicksand" }}>
            Create your account to start your journey
          </Typography>
        </Box>

        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" textAlign="center" mb={2}>
            Create Account
          </Typography>

          {/* Alerts */}
          {message === "error" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Please fill in all required fields.
            </Alert>
          )}
          {message === "mismatch" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Passwords do not match.
            </Alert>
          )}
          {message === "success" && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Account created successfully! Redirecting...
            </Alert>
          )}
          {apiError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
            <TextField
              type="password"
              label="Confirm Password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                background: "linear-gradient(to right, #1976d2, #00b0ff)",
                color: "#fff",
                textTransform: "none",
              }}
            >
              {loading ? <CircularProgress size={22} /> : "Create Account"}
            </Button>
          </form>
        </Card>

        <Typography textAlign="center" mt={2} sx={{ color: "gray" }}>
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#1976d2", marginLeft: 5, cursor: "pointer" }}
          >
            Sign in
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
