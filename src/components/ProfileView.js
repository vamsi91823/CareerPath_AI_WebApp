import React from "react"
import {
  Box,
  Card,
  Avatar,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";

export default function ProfileSettings({ profile, onEdit }) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eaf1ff, #fdf6e3)",
      }}
    >
      

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
          
          {/* Header */}
          <Box
            sx={{
              height: 120,
              background: "linear-gradient(90deg, #7aa2ff, #ffd6a5)",
            }}
          />

          {/* Profile Header */}
          <Box sx={{ p: 4, display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 70,
                height: 70,
                mr: 2,
                mt: "-60px",
                border: "4px solid white",
                bgcolor: "#4f6bed",
              }}
            >
              {profile.firstName?.[0]}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography color="text.secondary">
                {profile.email}
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{ bgcolor: "#4f6bed", textTransform: "none" }}
              onClick={onEdit}
            >
              Edit
            </Button>
          </Box>

          {/* View-Only Fields */}
          <Box sx={{ p: 4, pt: 0 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name"
                  value={profile.firstName}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Last Name"
                  value={profile.lastName}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
             
            </Grid>

            {/* Email Section */}
            <Box sx={{ mt: 5 }}>
              <Typography fontWeight={600}>
                My Email Address
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {profile.email}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
