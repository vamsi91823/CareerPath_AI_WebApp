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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../Services/userService";

export default function TopRightSignOut() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSignClick = () => {
    handleClose();
    setConfirmOpen(true);
  };

  const doSignOut = async () => {
    try {
      // Call backend signOut API
      await signOutUser();
    } catch (error) {
      // Ignore API error (still logout locally)
    }

    // Clear auth data
    localStorage.removeItem("token");

    setConfirmOpen(false);
    setSnackbarOpen(true);

    setTimeout(() => navigate("/"), 800);
  };

  return (
    <div style={{ position: "fixed", top: 12, right: 12, zIndex: 1400 }}>
      <IconButton aria-label="menu" onClick={handleOpen} size="large">
        <MenuIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleSignClick}>Sign Out</MenuItem>
      </Menu>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          Are you sure you want to sign out and return to the home page?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={doSignOut}
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1200}
        onClose={() => setSnackbarOpen(false)}
        message="Signed out successfully"
      />
    </div>
  );
}
