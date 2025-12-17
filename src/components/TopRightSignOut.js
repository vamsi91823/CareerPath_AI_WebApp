import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../Services/userService";

export default function TopRightSignOut() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSignClick = () => {
    handleClose();
    setConfirmOpen(true);
  };

  const doSignOut = async () => {
    setError("");

    try {
      // 🔹 Call backend signOut (clears httpOnly cookie)
      await signOutUser();
    } catch (err) {
      // Even if backend fails, continue logout on frontend
      console.warn("Backend signout failed:", err.message);
      setError("Logged out locally (server unreachable)");
    }

    // 🔹 Clear frontend storage
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    localStorage.removeItem("userProfile");

    setConfirmOpen(false);
    setSnackbarOpen(true);

    setTimeout(() => {
      navigate("/");
    }, 900);
  };

  return (
    <div style={{ position: "fixed", top: 12, right: 12, zIndex: 1400 }}>
      <IconButton aria-label="menu" onClick={handleOpen} size="large">
        <MenuIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleSignClick}>Sign Out</MenuItem>
      </Menu>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          Are you sure you want to sign out and return to the home page?
          {error && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={doSignOut}>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1200}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Signed out successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
