import React from "react";
import { Box } from "@mui/system";
import { TextField, FormControl, Button } from "@mui/material";

const RegistrationForm = ({fields}) => {
  return (
    <FormControl
      sx={{
        "& > :not(style)": { mx: 1, width: "25ch" },
      }}
      //   noValidate
      //   autoComplete="off"
    >
      {fields.map((name) => (
        <TextField
          dir="rtl"
          id={name.id}
          label={name.label}
          type={name.type}
          variant="standard"
        />
      ))}
    </FormControl>
  );
};

export default RegistrationForm;
