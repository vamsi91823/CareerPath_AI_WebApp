import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../Careerpath-logo.svg";
import TopRightSignOut from "./TopRightSignOut";
import { getProfileDetails, saveUserProfile } from "../Services/userService";

const steps = ["Profile", "Skills", "Interests", "Goals", "Experience"];

export default function Profile() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const [profileExists, setProfileExists] = useState(false);
  const [mode, setMode] = useState("create"); // create | view | edit
  const [foundDialogOpen, setFoundDialogOpen] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    skills: "",
    interests: "",
    goals: "",
    experience: "",
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getProfileDetails();
        // Expecting an object or null
        if (mounted && res && Object.keys(res).length) {
          // Normalize fields into local form
          setProfile({
            firstName: res.firstName || res.fullName?.split(" ")?.[0] || "",
            lastName: res.lastName || (res.fullName ? res.fullName.split(" ").slice(1).join(" ") : ""),
            email: res.email || "",
            skills: Array.isArray(res.skills) ? res.skills.join(", ") : (res.skills || ""),
            interests: Array.isArray(res.interests) ? res.interests.join(", ") : (res.interests || ""),
            goals: res.careerGoals || res.goals || "",
            experience: res.experience || "",
          });
          setProfileExists(true);
          setMode("view");
          setFoundDialogOpen(true);
        }
      } catch (e) {
        // ignore
      }
    })();
    return () => (mounted = false);
  }, []);

  const handleChange = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      try {
        const normalized = {
          fullName: `${profile.firstName} ${profile.lastName}`.trim(),
          email: profile.email,
          skills: profile.skills
            ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
          interests: profile.interests
            ? profile.interests.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
          careerGoals: profile.goals,
          experience: profile.experience,
        };
        localStorage.setItem("userProfile", JSON.stringify(normalized));
        // Persist to backend if available
        (async () => {
          try {
            await saveUserProfile(normalized);
          } catch (e) {
            // ignore backend save errors for now
          }
        })();
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

            <Typography sx={{ mb: 3, fontSize: 14 }}>
              Letâs start with your basic information
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
              {...commonStyles}
              value={profile.email}
              onChange={handleChange("email")}
            />
          </>
        );

      case 1:
        return (
          <>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
              Skills
            </Typography>
            <Typography sx={{ mb: 3, fontSize: 14 }}>
              Tell us about your current skills or technologies you know.
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Primary Skills"
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
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
              Interests
            </Typography>
            <Typography sx={{ mb: 3, fontSize: 14 }}>
              What kind of roles or domains are you most interested in?
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Secondary Skills"
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
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
              Goals
            </Typography>

            <Typography sx={{ mb: 3, fontSize: 14 }}>
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
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
              Experience
            </Typography>

            <Typography sx={{ mb: 3, fontSize: 14 }}>
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <TopRightSignOut />
      {/* Dialog shown when an existing profile is found */}
      <Dialog open={foundDialogOpen} onClose={() => setFoundDialogOpen(false)}>
        <DialogTitle>Existing Profile Found</DialogTitle>
        <DialogContent>
          We found an existing profile. Would you like to keep it as-is or edit it now?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setFoundDialogOpen(false); navigate('/dashboard'); }}>
            Keep
          </Button>
          <Button
            variant="contained"
            onClick={() => { setFoundDialogOpen(false); setMode('edit'); setActiveStep(0); }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="md">
        <Box textAlign="center" mb={3}>
          <Avatar
            src={logo}
            sx={{ width: 64, height: 64, margin: "0 auto", mb: 1 }}
          />
          <Typography variant="h5">CareerPath AI</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {mode === 'view' ? 'Your Profile' : (mode === 'edit' ? 'Edit Your Profile' : 'Create Your Profile')}
          </Typography>
        </Box>

        {mode === 'view' && profileExists ? (
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: 700 }}>{profile.firstName} {profile.lastName}</Typography>
            <Typography sx={{ mb: 1 }}>{profile.email}</Typography>
            <Typography sx={{ mb: 1 }}>Skills: {profile.skills}</Typography>
            <Typography sx={{ mb: 1 }}>Interests: {profile.interests}</Typography>
            <Typography sx={{ mb: 1 }}>Goals: {profile.goals}</Typography>
            <Typography sx={{ mb: 1 }}>Experience: {profile.experience}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined" onClick={() => navigate('/dashboard')} sx={{ mr: 1 }}>Keep</Button>
              <Button variant="contained" onClick={() => { setMode('edit'); setActiveStep(0); }}>Edit Profile</Button>
            </Box>
          </Card>
        ) : (
          <>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel />
                </Step>
              ))}
            </Stepper>

            <Card sx={{ p: 3, borderRadius: 3 }}>
              {renderStepContent()}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  â Previous
                </Button>

                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next â"}
                </Button>
              </Box>
            </Card>
          </>
        )}

        {/* Footer */}
        <Box textAlign="center" mt={3}>
          <Typography fontSize={13}>
            Step {activeStep + 1} of {steps.length}
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            mt={1}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/")}
          >
            <Typography>Back to Home</Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
