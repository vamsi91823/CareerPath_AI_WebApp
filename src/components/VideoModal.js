// src/components/VideoModal.js
import React from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function VideoModal({ open, url, onClose }) {
  if (!url) return null;
  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton aria-label="close" onClick={onClose} sx={{ position: "absolute", right: 8, top: 8, zIndex: 10 }}>
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: 0, backgroundColor: "#000" }}>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            title="demo-video"
            src={url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
