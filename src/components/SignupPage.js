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

  const [message, setMessage] = useState(""); // error | mismatch | success | apiError
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setMessage("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("mismatch");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await signUpUser({
        firstName,
        lastName,
        email,
        password,
      });

      setMessage("success");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setMessage("apiError");
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
          <IconButton size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography
            sx={{ fontFamily: "Quicksand", fontSize: 14, ml: -0.5 }}
          >
            Back to Home
          </Typography>
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
            Create your account to start your journey
          </Typography>
        </Box>

        {/* Card */}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 1,
              textAlign: "center",
              fontFamily: "Quicksand",
              fontWeight: 700,
            }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{
              mb: 2,
              textAlign: "center",
              color: "gray",
              fontFamily: "Quicksand",
              fontSize: 14,
            }}
          >
            Join CareerPath AI and get personalized career recommendations.
          </Typography>

          {/* Alerts */}
          {message === "error" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Please fill in all fields.
            </Alert>
          )}

          {message === "mismatch" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Password and Confirm Password do not match.
            </Alert>
          )}

          {message === "apiError" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Email already exists or server error.
            </Alert>
          )}

          {message === "success" && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Account created successfully! Redirecting to login…
            </Alert>
          )}

          {/* Form */}
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
                fontSize: "16px",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(to right, #1259a8, #008ccd)",
                },
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <Typography
          textAlign="center"
          mt={2}
          sx={{ fontFamily: "Quicksand", color: "gray" }}
        >
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#1976d2",
              marginLeft: 5,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign in
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
