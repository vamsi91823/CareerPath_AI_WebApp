import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopRightSignOut from "./TopRightSignOut";
import logo from "../Careerpath-logo.svg";
import { getProfileDetails } from "../Services/userService";

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getProfileDetails();
        if (!mounted) return;
        setProfile(res && Object.keys(res).length ? res : null);
      } catch (e) {
        setProfile(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (loading) return null;

  // If no profile yet, go to profile creation flow
  if (!profile) {
    navigate("/profile");
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #f7fbfc, #e6f7ff)",
        p: 2,
      }}
    >
      <TopRightSignOut />
      <Card sx={{ p: 4, width: 560, borderRadius: 3 }}>
        <Box textAlign="center" mb={2}>
          <Avatar src={logo} sx={{ width: 72, height: 72, margin: "0 auto", mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {profile.fullName || `${profile.firstName || ""} ${profile.lastName || ""}`}
          </Typography>
          <Typography color="text.secondary">{profile.email}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Education</Typography>
          <Typography>{profile.education || "Not provided"}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Address</Typography>
          <Typography>{profile.address || "Not provided"}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button variant="contained" onClick={() => navigate('/profile')}>
            Edit Profile
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
