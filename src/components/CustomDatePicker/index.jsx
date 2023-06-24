import { TextField } from "@mui/material";

const CustomDatePickerInput = ({ value, onClick }) => (
  <TextField
    variant="outlined"
    value={value}
    onClick={onClick}
    style={{
      width: "100%",
      borderRadius: 4,
      backgroundColor: "#fff",
    }}
    InputProps={{
      endAdornment: (
        <span className="MuiIconButton-label" style={{ pointerEvents: "none" }}>
          <svg
            className="MuiSvgIcon-root"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path fill="currentColor" d="M7 10l5 5 5-5z"></path>
          </svg>
        </span>
      ),
      style: { paddingRight: 0 },
    }}
  />
);

export default CustomDatePickerInput;
