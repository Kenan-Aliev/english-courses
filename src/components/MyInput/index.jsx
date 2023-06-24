import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  background: "transparent",
  "& .MuiInputLabel-root": {
    color: "white",
    "&.Mui-focused": {
      color: "white",
    },
    "&.Mui-error": {
      color: "#f44336",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", // Белая граница
    },
    "&:hover fieldset": {
      borderColor: "white", // Белая граница при наведении
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Белая граница в фокусе
    },
  },
}));

function MyInput(props) {
  return <FormField {...props} />;
}

export default MyInput;
