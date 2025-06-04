import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const Pagenotfound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        px: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "gray" }} />
      <Typography variant="h3" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Oops! The page you're looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          mt: 2,
          borderRadius: "999px",
          textTransform: "none",
          px: 4,
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default Pagenotfound;
