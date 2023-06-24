import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import "./select.css";

function MySelect({
  value,
  handleChange,
  label,
  items,
  name,
  handleBlur,
  error,
  helperText,
  disabled,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="time-select-label">{label}</InputLabel>
      <Select
        labelId="time-select-label"
        id="time-select"
        value={value}
        label={label}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        error={error}
        disabled={disabled}
        sx={{ borderColor: "blue" }}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText sx={{ color: "#d32f2f" }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default MySelect;
