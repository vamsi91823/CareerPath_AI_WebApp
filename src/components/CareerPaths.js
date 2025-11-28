// src/components/CareerPaths.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Avatar,
  Stack,
  Link,
  IconButton,
  Grow,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate } from "react-router-dom";
import logo from "../Careerpath-logo.svg";

export default function CareerPaths() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup"); // goes to your SignupPage
  };

  const goToSignin = () => {
    navigate("/login"); // go to the LoginPage route (/login)
  };

  const stats = [
    {
      label: "Career Paths",
      value: "50K+",
      description:
        "✔ Explore diverse career pathways designed for every skill level.",
    },
    {
      label: "Satisfaction Rate",
      value: "98%",
      description:
        "✔ Trusted by learners for accurate and actionable insights.",
    },
    {
      label: "Success Stories",
      value: "10K+",
      description:
        "✔ Real success stories from users who transformed their careers.",
    },
    {
      label: "Support",
      value: "24/7",
      description:
        "✔ Round-the-clock support to guide you whenever you need help.",
      contact: ["+91-98765-43210", "+91-91234-56789"],
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #d4edf1ff, #acd2ebd8)",
        color: "#0f172a",
      }}
    >
      {/* NAVBAR */}
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo + Title */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              src={logo}
              alt="CareerPath AI"
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Pacifico', cursive",
                letterSpacing: 0.5,
              }}
            >
              CareerPath AI
            </Typography>
          </Stack>

          {/* Nav links */}
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Link
              href="#features"
              underline="none"
              sx={{ fontFamily: "Quicksand", color: "#0f172a" }}
            >
              Features
            </Link>
            <Link
              href="#results"
              underline="none"
              sx={{ fontFamily: "Quicksand", color: "#0f172a" }}
            >
              Results
            </Link>
            {/* Dashboard link removed per request */}
            <Link
              href="#about"
              underline="none"
              sx={{ fontFamily: "Quicksand", color: "#0f172a" }}
            >
              About
            </Link>
          </Stack>

          {/* Sign in + Create account buttons (top right) */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 1 }}
            alignItems="center"
            sx={{
              // keep a small gap on xs to avoid clashing with nav
              ml: { xs: 0, md: 0 },
            }}
          >
            <Button
              variant="contained"
              onClick={goToSignin}
              sx={{
                borderRadius: 999,
                px: 2.5,
                py: 0.6,
                textTransform: "none",
                fontFamily: "Quicksand",
                fontWeight: 600,
                background: "linear-gradient(to right, #2563eb, #22c1c3)",
                boxShadow: 3,
                color: "#fff",
                '&:hover': {
                  background: "linear-gradient(to right, #49669cff, #0ea5e9)",
                },
              }}
            >
              Sign In
            </Button>

            <Button
              variant="contained"
              onClick={goToSignup}
            sx={{
              borderRadius: 999,
              px: { xs: 3, sm: 3 },
              py: 0.7,
              textTransform: "none",
              fontFamily: "Quicksand",
              background: "linear-gradient(to right, #2563eb, #22c1c3)",
              boxShadow: 3,
              "&:hover": {
                background: "linear-gradient(to right, #49669cff, #0ea5e9)",
              },
            }}
            >
              Create Account
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* HERO + STATS */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left text */}
          <Grid item xs={12} md={6}>
            <Grow in timeout={600}>
              <Box>
            <Typography
              sx={{
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "#2563eb",
                fontWeight: 600,
                mb: 1,
                fontFamily: "Quicksand",
              }}
            ></Typography>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography
                variant="h3"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
                fontFamily: "Quicksand",
              }}
            >
              Your Perfect Career Path Awaits
              </Typography>
              {/* small floating decorative logo */}
              <Box component="img" src={logo} alt="decorative logo" className="hero-floating" />
            </Stack>

            <Typography
              sx={{
                mb: 3,
                fontSize: 16,
                color: "#242527ff",
                fontFamily: "Quicksand",
              }}
            >
              Discover your ideal career with personalized recommendations,
              guided learning roadmaps, and mentorship opportunities tailored to
              your unique skills and dreams.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
              mb={2}
            >
              {/* Start Your Journey → Sign Up */}
              <Button
                variant="contained"
                onClick={goToSignup}
                sx={{
                  borderRadius: 999,
                  px: 3.5,
                  py: 1.2,
                  textTransform: "none",
                  fontFamily: "Quicksand",
                  fontWeight: 600,
                  background: "linear-gradient(to right, #2563eb, #22c55e)",
                  boxShadow: 4,
                  "&:hover": {
                    background: "linear-gradient(to right, #1d4ed8, #16a34a)",
                  },
                }}
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
              >
                Start Your Journey
              </Button>

              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  fontFamily: "Quicksand",
                }}
              >
                Watch Demo
              </Button>
            </Stack>

            {/* Removed "Don't have an account? Sign up here" line */}
              </Box>
            </Grow>
          </Grid>

          {/* Right stats */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {stats.map((item, i) => (
                <Grid item xs={6} key={item.label}>
                  <Grow in timeout={400 + i * 140}>
                    <div>
                      <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      p: 2,
                      background:
                        "linear-gradient(to bottom right,#ffffff,#e5edff)",
                    }}
                  >
                    
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography
                            sx={{
                              fontSize: 24,
                              fontWeight: 800,
                              mb: 0.5,
                              fontFamily: "Quicksand",
                            }}
                          >
                            {item.value}
                          </Typography>

                          {/* colorful animated dot accent */}
                          <Box component="span" className="stat-accent" aria-hidden="true" />
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 13,
                            color: "#111827",
                            fontFamily: "Quicksand",
                          }}
                        >
                          {item.label}
                        </Typography>

                        {/* Optional description and contact numbers for Support card */}
                        {item.description && (
                          <Typography
                            sx={{
                              fontSize: 13,
                              color: "#111827",
                              fontFamily: "Quicksand",
                              mt: 1,
                            }}
                          >
                            {item.description}
                          </Typography>
                        )}

                        {item.contact && (
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: "#111827",
                              fontFamily: "Quicksand",
                              mt: 0.5,
                            }}
                          >
                            {item.contact.join(" | ")}
                          </Typography>
                        )}
                      </Box>
                      </Card>
                    </div>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* FEATURES SECTION */}
      <Box
        id="features"
        sx={{
          py: 8,
          background: "transparent",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
              fontFamily: "Quicksand",
            }}
          >
            Powerful Features Built for You
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              mb: 6,
              color: "#111827",
              fontFamily: "Quicksand",
            }}
          >
            Everything you need to make informed career decisions.
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "AI-Powered Insights",
                desc: "Personalized recommendations powered by AI analysis.",
              },
              {
                title: "Guided Roadmaps",
                desc: "Structured learning paths tailored to your goals.",
              },
              {
                title: "Mentor Connections",
                desc: "Connect with mentors in your target career field.",
              },
              {
                title: "Resource Library",
                desc: "Access curated learning materials and tools.",
              },
            ].map((f) => (
              <Grid item xs={12} md={6} key={f.title}>
                <Box
                  sx={{
                    background: "rgba(255,255,255,0.4)",
                    borderRadius: 2,
                    p: 3,
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: 1,
                    transition: "0.2s",
                    "&:hover": {
                      boxShadow: 4,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      fontFamily: "Quicksand",
                      color: "#111827",
                    }}
                  >
                    {f.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#111827",
                      fontFamily: "Quicksand",
                    }}
                  >
                    {f.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* RESULTS SECTION */}
      <Box
        id="results"
        sx={{
          py: 8,
          mt: 1,
          background: "transparent",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
              fontFamily: "Quicksand",
            }}
          >
            Success Stories
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              mb: 6,
              color: "#111827",
              fontFamily: "Quicksand",
            }}
          >
            Hear from people who transformed their careers.
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                quote: "CareerPath AI helped me find the right direction in months.",
                name: "Navya.J",
                role: "Software Engineer",
              },
              {
                quote: "The recommendations opened doors I didn’t know existed.",
                name: "Reshma.SK",
                role: "Product Manager",
              },
              {
                quote:
                  "The mentor guidance boosted my confidence and skills fast.",
                name: "Kavya.U",
                role: "Data Scientist",
              },
            ].map((t, index) => (
              <Grid
                item
                xs={12}
                md={6}
                key={t.name}
                sx={{
                  mt: index === 2 ? { xs: 3, md: 5 } : 0,
                }}
              >
                <Box
                  sx={{
                    background: "rgba(255,255,255,0.4)",
                    borderRadius: 3,
                    p: 4,
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: 2,
                    height: "100%",
                    transition: "0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 5,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      mb: 3,
                      color: "#1f2937",
                      fontFamily: "Quicksand",
                      lineHeight: 1.6,
                    }}
                  >
                    “{t.quote}”
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      fontFamily: "Quicksand",
                    }}
                  >
                    {t.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#111827",
                      fontFamily: "Quicksand",
                      mt: 0.5,
                    }}
                  >
                    {t.role}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ABOUT / CTA SECTION */}
      <Box
        id="about"
        sx={{
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 4,
              p: { xs: 4, md: 5 },
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 1, fontWeight: 700, fontFamily: "Quicksand" }}
            >
              Ready to Transform Your Career?
            </Typography>
            <Typography
              sx={{
                mb: 3,
                color: "#111827",
                fontFamily: "Quicksand",
              }}
            >
              Join thousands of professionals who have discovered their ideal
              career path using CareerPath AI.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                onClick={goToSignup}
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.2,
                  textTransform: "none",
                  fontFamily: "Quicksand",
                  background: "linear-gradient(to right, #2563eb, #22c55e)",
                  boxShadow: 4,
                  "&:hover": {
                    background: "linear-gradient(to right, #1d4ed8, #16a34a)",
                  },
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  fontFamily: "Quicksand",
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid #e5e7eb",
          py: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  fontFamily: "Quicksand",
                }}
              >
                CareerPath AI
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#6b7280",
                  fontFamily: "Quicksand",
                }}
              >
                Empowering careers with AI-driven insights.
              </Typography>
            </Grid>

            <Grid item xs={4} md={2}>
              <Typography
                sx={{ fontWeight: 600, mb: 1, fontFamily: "Quicksand" }}
              >
                Product
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: "Quicksand" }}>
                Features
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: "Quicksand" }}>
                Pricing
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: "Quicksand" }}>
                Security
              </Typography>
            </Grid>

            <Grid item xs={4} md={2}>
              <Typography
                sx={{ fontWeight: 600, mb: 1, fontFamily: "Quicksand" }}
              >
                Company
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: "Quicksand" }}>
                About
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: "Quicksand" }}>
                Blog
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: "Quicksand" }}>
                Careers
              </Typography>
            </Grid>

            <Grid item xs={4} md={2}>
              <Typography
                sx={{ fontWeight: 600, mb: 1, fontFamily: "Quicksand" }}
              >
                Legal
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: "Quicksand" }}>
                Privacy
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: "Quicksand" }}>
                Terms
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: "Quicksand" }}>
                Contact
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", md: "flex-end" },
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#6b7280",
                  fontFamily: "Quicksand",
                }}
              >
                © 2025 CareerPath AI. All rights reserved.
              </Typography>
              <Stack direction="row" spacing={1} mt={1}>
                <IconButton size="small">
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
