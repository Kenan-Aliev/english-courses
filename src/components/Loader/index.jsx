import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { tokensLight } from "../../providers/ThemeProvider";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: tokensLight.primary[500],
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}
