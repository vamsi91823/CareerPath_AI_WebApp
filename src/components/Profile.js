import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../Careerpath-logo.svg";
import TopRightSignOut from "./TopRightSignOut";
import { fetchUserProfileDetails } from "../Services/userService";

const steps = ["Profile", "Skills", "Interests", "Goals", "Experience"];

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    skills: "",
    interests: "",
    goals: "",
    experience: "",
  });

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  // 🔄 Load profile from backend
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await fetchUserProfileDetails();

        setProfile((prev) => ({
          ...prev,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
        }));
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      try {
        const normalizedProfile = {
          fullName: `${profile.firstName} ${profile.lastName}`.trim(),
          email: profile.email,
          skills: profile.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          interests: profile.interests
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          careerGoals: profile.goals,
          experience: profile.experience,
        };

        localStorage.setItem(
          "userProfile",
          JSON.stringify(normalizedProfile)
        );
      } catch (e) {
        console.error("Failed to save profile", e);
      }

      navigate("/dashboard");
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep !== 0) setActiveStep((prev) => prev - 1);
  };

  const commonStyles = {
    InputLabelProps: { style: { color: "#000" } },
    InputProps: {
      style: {
        color: "#000",
        backgroundColor: "#ffffff",
        borderRadius: 6,
      },
    },
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
              Profile
            </Typography>

            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              {...commonStyles}
              value={profile.firstName}
              onChange={handleChange("firstName")}
            />

            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              {...commonStyles}
              value={profile.lastName}
              onChange={handleChange("lastName")}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              disabled
              {...commonStyles}
              value={profile.email}
            />
          </>
        );

      case 1:
        return (
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Skills (comma separated)"
            margin="normal"
            {...commonStyles}
            value={profile.skills}
            onChange={handleChange("skills")}
          />
        );

      case 2:
        return (
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Interests (comma separated)"
            margin="normal"
            {...commonStyles}
            value={profile.interests}
            onChange={handleChange("interests")}
          />
        );

      case 3:
        return (
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Career Goals"
            margin="normal"
            {...commonStyles}
            value={profile.goals}
            onChange={handleChange("goals")}
          />
        );

      case 4:
        return (
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Experience"
            margin="normal"
            {...commonStyles}
            value={profile.experience}
            onChange={handleChange("experience")}
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #d4edf1ff, #acd2ebd8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <TopRightSignOut />

      <Container maxWidth="md">
        <Box textAlign="center" mb={3}>
          <Avatar
            src={logo}
            sx={{ width: 64, height: 64, mx: "auto", mb: 1 }}
          />
          <Typography variant="h4" fontWeight={700}>
            Create Your Profile
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>

        <Card sx={{ p: 3, borderRadius: 3 }}>
          {renderStepContent()}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Button disabled={activeStep === 0} onClick={handleBack}>
              ← Previous
            </Button>

            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next →"}
            </Button>
          </Box>
        </Card>

        <Typography textAlign="center" mt={2}>
          Step {activeStep + 1} of {steps.length}
        </Typography>
      </Container>
    </Box>
  );
}
