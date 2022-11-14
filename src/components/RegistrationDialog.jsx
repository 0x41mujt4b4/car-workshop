import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, FormControl } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ fields, title, handleClose, open, handleSubmit }) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              "& > :not(style)": { mx: 1, width: "25ch" },
            }}
              required
              autoComplete="off"
          >
            {fields.map((name) => (
              <TextField
                dir="rtl"
                id={name.id}
                label={name.label}
                type={name.type}
                inputRef={name.ref}
                variant="standard"
                InputLabelProps={{ required: false }}
                required
              />
            ))}
            {/* <Divider /> */}
            <div className="flex justify-end pt-3">
              <Button type="submit" variant="contained" size="small">
                إضافة
              </Button>
            </div>
          </FormControl>
        </form>
      </DialogContent>
    </BootstrapDialog>
  );
}
