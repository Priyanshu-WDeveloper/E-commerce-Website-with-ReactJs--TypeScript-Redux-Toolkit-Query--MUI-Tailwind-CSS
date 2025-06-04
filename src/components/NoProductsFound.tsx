import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useNavigate } from "react-router-dom";

const NoProductsFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="60vh"
      textAlign="center"
      gap={2}
    >
      <SearchOffIcon sx={{ fontSize: 80, color: "text.secondary" }} />
      <Typography variant="h5" color="text.secondary">
        No Products Found
      </Typography>
      <Typography variant="body1" color="text.disabled">
        Try adjusting your filters or search terms.
      </Typography>
      {/* {onReset && (
        <Button variant="contained" color="primary" onClick={onReset}>
          Reset Filters
        </Button>
      )} */}
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
};

export default NoProductsFound;
