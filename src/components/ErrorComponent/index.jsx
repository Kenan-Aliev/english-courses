import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import forniddenImg from "../../assets/forbidden.svg";
import notFoundImg from "../../assets/notFound.svg";
import { tokensLight } from "../../providers/ThemeProvider";

const ErrorComponent = ({ type }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "40%",
          margin: "20px auto 0 auto",
          "@media(max-width:968px)": {
            width: "60%",
          },
        }}
      >
        <img
          style={{ maxWidth: "100%" }}
          src={type === 403 ? forniddenImg : notFoundImg}
          alt="404"
        />
      </Box>
      <NavLink to="/">
        <Button
          sx={{
            background: tokensLight.blueAccent[600],
            color: tokensLight.primary[100],
            marginTop: "20px",
          }}
          variant="outlined"
        >
          На главную
        </Button>
      </NavLink>
    </Box>
  );
};

export default ErrorComponent;
