// src/components/DemoPlayer.js
import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, Box, IconButton, Button, LinearProgress, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DemoPlayer({ open, onClose, totalSeconds = 300 }) {
  const slides = [
    { title: "Welcome to CareerPath AI", body: "Personalized career recommendations and learning roadmaps." },
    { title: "Create Your Profile", body: "Add your skills, experience and goals to get tailored suggestions." },
    { title: "AI Recommendations", body: "We analyze your profile and match you to suitable career paths." },
    { title: "Role Details", body: "Each recommended role includes required skills, salary ranges and job titles." },
    { title: "Learning Paths", body: "Step-by-step roadmaps and curated resources to reach your target role." },
    { title: "Projects & Portfolio", body: "Build projects and showcase them to employers to increase hireability." },
    { title: "Mentorship", body: "Connect with mentors for interview prep and career guidance." },
    { title: "Tracking Progress", body: "Mark milestones and track your learning progress inside the app." },
    { title: "Export & Share", body: "Export your learning plan and share your portfolio with recruiters." },
    { title: "Get Started", body: "Create a profile now and take the first step toward your new career." },
  ];

  const slideCount = slides.length;
  const secondsPerSlide = Math.max(5, Math.floor(totalSeconds / slideCount));

  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    setElapsed(0);
    setRunning(true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (running) {
      timerRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [open, running]);

  useEffect(() => {
    if (!open) return;
    const newIndex = Math.min(Math.floor(elapsed / secondsPerSlide), slideCount - 1);
    setIndex(newIndex);
    if (elapsed >= totalSeconds) setRunning(false);
  }, [elapsed, secondsPerSlide, slideCount, totalSeconds, open]);

  const progress = Math.min((elapsed / totalSeconds) * 100, 100);

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        Demo — CareerPath AI
        <IconButton aria-label="close" onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 3, minHeight: 320, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>{slides[index].title}</Typography>
          <Typography variant="body1" sx={{ textAlign: "center", maxWidth: 760 }}>{slides[index].body}</Typography>

          <Box sx={{ width: "100%", mt: 4 }}>
            <LinearProgress variant="determinate" value={progress} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography variant="caption">{Math.min(elapsed, totalSeconds)}s / {totalSeconds}s</Typography>
              <Typography variant="caption">Slide {index + 1} / {slideCount}</Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
            <Button variant="outlined" onClick={() => setIndex((i) => Math.max(0, i - 1))}>Prev</Button>
            <Button variant="outlined" onClick={() => setIndex((i) => Math.min(slideCount - 1, i + 1))}>Next</Button>
            <Button variant="contained" onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Play"}</Button>
            <Button onClick={onClose}>Close</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
