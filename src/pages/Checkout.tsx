// src/pages/OrderConfirmation.jsx
import { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline as CheckIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { clearCart } from "../reducers/cart";
import OrderButton from "../components/Buttons/OrderButton";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart()); // Clear state and localStorage
  }, [dispatch]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9fafb"
      px={2}
    >
      <Card
        elevation={3}
        sx={{
          maxWidth: 480,
          width: "100%",
          borderRadius: 4,
          p: 3,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <CheckIcon sx={{ fontSize: 64, color: "#2e7d32" }} />
          </Box>

          <Typography variant="h4" fontWeight={600} gutterBottom>
            Thank You!
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Your order has been placed successfully.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            A confirmation email has been sent to your inbox.
            <br />
            You can track your order status from your dashboard.
          </Typography>

          {/* <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/menu")}
            sx={{
              backgroundColor: "#2e7d32",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              ":hover": {
                backgroundColor: "#1b5e20",
              },
            }}
          >
            Continue Shopping
          </Button> */}
          <OrderButton
            variant="contained"
            size="large"
            onClick={() => navigate("/menu")}
          >
            Continue Shopping
          </OrderButton>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderConfirmation;
