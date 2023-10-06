// RemoveModal.jsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const RemoveModal = ({ open, onClose, onConfirm, name }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Remove from Job"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Do you want to remove {name} from the job?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        No
      </Button>
      <Button
        onClick={() => {
          onConfirm();
          onClose();
        }}
        color="primary"
        autoFocus
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

export default RemoveModal;
