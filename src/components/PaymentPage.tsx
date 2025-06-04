import { useSelector } from "react-redux";
import { Box, Typography, Divider, Button, Paper, Stack } from "@mui/material";
// import OrderSummary from "../components/OrderSummary";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

const PaymentPage = () => {
  const totalAmount = useSelector((state: RootState) => state.cart.total);
  const address = useSelector((state: RootState) => state.cart.address);
  // console.log("address", address);

  const paymentMethod = useSelector(
    (state: RootState) => state.cart.paymentMethod
  );
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    navigate("/checkout/confirmation");
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", py: 5, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Checkout
      </Typography>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: "#f5f7fa",
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Total Amount:
          <Box component="span" sx={{ ml: 1, fontWeight: 800, color: "black" }}>
            ${totalAmount.toFixed(2)}
          </Box>
        </Typography>
      </Paper>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Shipping Address */}
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            background: "#ffffff",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Shipping Address
          </Typography>
          {address ? (
            <Box>
              <Typography>{address.fullName}</Typography>
              <Typography>{address.mobile}</Typography>
              <Typography>
                {address.city}, {address.state} - {address.pincode}
              </Typography>
            </Box>
          ) : (
            <Typography color="error">No address found.</Typography>
          )}
        </Paper>

        {/* Payment Method */}
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            background: "#ffffff",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Payment Method
          </Typography>
          <PaymentMethodSelector />
        </Paper>
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Order Summary (optional, enable if needed) */}
      {/* <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: 3,
          background: "#ffffff",
          border: "1px solid #e0e0e0",
          mb: 4,
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Order Summary
        </Typography>
        <OrderSummary cartItems={cart.items} />
      </Paper> */}

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handlePlaceOrder}
        sx={{
          borderRadius: 2,
          fontWeight: 700,
          textTransform: "none",
          backgroundColor: "black",
          color: "white",
          py: 1.5,
          fontSize: "1rem",
          boxShadow:
            "0px 4px 6px -1px rgba(0,0,0,0.2), 0px 10px 20px rgba(0,0,0,0.1)",
          ":hover": {
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            boxShadow:
              "0px 8px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default PaymentPage;
