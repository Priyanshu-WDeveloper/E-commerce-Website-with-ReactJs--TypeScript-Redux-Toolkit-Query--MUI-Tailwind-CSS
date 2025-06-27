// SomethingWentWrong.tsx
import { Box, Button, Typography, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const SomethingWentWrong = () => {
  const handleGoHome = () => {
    // Use window.location instead of useNavigate to avoid Router context issues
    window.location.href = "/";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />

      <Typography variant="h4" gutterBottom>
        Oops! Something went wrong.
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        An unexpected error has occurred. We're already on it — try again or go
        back to safety.
      </Typography>

      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleRefresh}>
          Refresh Page
        </Button>
        <Button variant="outlined" onClick={handleGoHome}>
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default SomethingWentWrong;