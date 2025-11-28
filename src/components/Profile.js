import React, { useState } from "react";
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
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../Careerpath-logo.svg";

const steps = ["Profile", "Skills", "Interests", "Goals", "Experience"];

export default function Profile() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    skills: "",
    interests: "",
    goals: "",
    experience: "",
  });

  const handleChange = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNext = () => {
    // when user finishes the profile wizard, take them to the dashboard
    if (activeStep === steps.length - 1) navigate("/dashboard");
    else setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep !== 0) setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
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

    switch (activeStep) {
      case 0:
        return (
          <>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1, color: "#000" }}>
              Profile
            </Typography>

            <Typography sx={{ mb: 3, fontSize: 14, color: "#000" }}>
              Let’s start with your basic information
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              {...commonStyles}
              value={profile.fullName}
              onChange={handleChange("fullName")}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...commonStyles}
              value={profile.email}
              onChange={handleChange("email")}
            />
          </>
        );

      case 1:
        return (
          <>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1, color: "#000" }}>
              Skills
            </Typography>
            <Typography sx={{ mb: 3, fontSize: 14, color: "#000" }}>
              Tell us about your current skills or technologies you know.
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Skills"
              margin="normal"
              {...commonStyles}
              value={profile.skills}
              onChange={handleChange("skills")}
            />
          </>
        );

      case 2:
        return (
          <>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1, color: "#000" }}>
              Interests
            </Typography>
            <Typography sx={{ mb: 3, fontSize: 14, color: "#000" }}>
              What kind of roles or domains are you most interested in?
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Interests"
              margin="normal"
              {...commonStyles}
              value={profile.interests}
              onChange={handleChange("interests")}
            />
          </>
        );

      case 3:
        return (
          <>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1, color: "#000" }}>
              Goals
            </Typography>

            <Typography sx={{ mb: 3, fontSize: 14, color: "#000" }}>
              Describe your short-term and long-term career goals.
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Goals"
              margin="normal"
              {...commonStyles}
              value={profile.goals}
              onChange={handleChange("goals")}
            />
          </>
        );

      case 4:
        return (
          <>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1, color: "#000" }}>
              Experience
            </Typography>

            <Typography sx={{ mb: 3, fontSize: 14, color: "#000" }}>
              Share your current role, years of experience, or education.
            </Typography>

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
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #d4edf1ff, #acd2ebd8)",
        color: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        {/* Logo + Title */}
        <Box textAlign="center" mb={3}>
          <Avatar
            src={logo}
            sx={{
              width: 64,
              height: 64,
              margin: "0 auto",
              borderRadius: 4,
              boxShadow: 4,
              mb: 1,
            }}
          />

          <Typography variant="h5" sx={{ fontFamily: "'Pacifico', cursive", color: "#000" }}>
            CareerPath AI
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 700, color: "#000", fontFamily: "Quicksand" }}>
            Create Your Profile
          </Typography>

          <Typography sx={{ color: "#000", fontFamily: "Quicksand" }}>
            Help us understand you better to provide personalized career recommendations
          </Typography>
        </Box>

        {/* Stepper */}
        <Box mb={3}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              "& .MuiStepLabel-label": { color: "#000", fontFamily: "Quicksand" },
              "& .MuiStepIcon-root": { color: "#000" },
              "& .Mui-active .MuiStepIcon-root": { color: "#000" },
              "& .Mui-completed .MuiStepIcon-root": { color: "#000" },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Main Card */}
        <Card
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 3,
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            p: 3,
          }}
        >
          {renderStepContent()}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                borderRadius: 999,
                textTransform: "none",
                borderColor: "#000",
                color: "#000",
                px: 2.5,
                "&:hover": {
                  borderColor: "#000",
                  backgroundColor: "#e5e7eb",
                },
              }}
            >
              ← Previous
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                borderRadius: 999,
                textTransform: "none",
                px: 3,
                backgroundColor: "#000",
                color: "#fff",
                "&:hover": { backgroundColor: "#222" },
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next →"}
            </Button>
          </Box>
        </Card>

        {/* Footer */}
        <Box textAlign="center" mt={3}>
          <Typography sx={{ fontSize: 13, color: "#000" }}>
            Step {activeStep + 1} of {steps.length}
          </Typography>

          <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2 }}>
            <Typography
              sx={{
                fontSize: 14,
                cursor: "pointer",
                textDecoration: "underline",
                color: "#000",
              }}
              onClick={() => navigate(-1)}
            >
              ← Previous page
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ cursor: "pointer", color: "#000", textDecoration: "underline" }}
              onClick={() => navigate("/")}
              aria-label="Back to Home"
            >
              <Typography sx={{ fontSize: 14 }}>Back to Home</Typography>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M3 11.5L12 4l9 7.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 21V12h6v9" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
