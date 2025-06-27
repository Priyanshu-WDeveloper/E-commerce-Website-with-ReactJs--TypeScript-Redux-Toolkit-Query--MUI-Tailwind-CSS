import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import {
  LocalShipping,
  Payment,
  Security,
  CheckCircle,
} from "@mui/icons-material";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import { RootState } from "../app/store";

const PaymentPage: React.FC = () => {
  const {
    total: totalAmount,
    address,
    paymentMethod,
  } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const handlePlaceOrder = (): void => {
    if (!paymentMethod) {
      alert("Please select a payment method to continue.");
      return;
    }
    navigate("/confirmation");
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography
          variant="h4"
          fontWeight={600}
          color="text.primary"
          gutterBottom
        >
          Secure Checkout
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review your order and complete your purchase
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Order Details */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* Order Summary */}
            <Card
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Order Summary
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                  bgcolor="grey.50"
                  borderRadius={1}
                >
                  <Typography variant="body1" fontWeight={500}>
                    Total Amount
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="primary">
                    {formatCurrency(totalAmount)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <LocalShipping color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Shipping Address
                  </Typography>
                </Box>

                {address ? (
                  <Box bgcolor="grey.50" p={2} borderRadius={1}>
                    <Typography variant="body1" fontWeight={600} gutterBottom>
                      {address.fullName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {address.mobile}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {address.city}, {address.state} - {address.pincode}
                    </Typography>
                  </Box>
                ) : (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    No shipping address found. Please add a delivery address.
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Payment color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Payment Method
                  </Typography>
                </Box>
                <PaymentMethodSelector />
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column - Order Actions */}
        <Grid item xs={12} lg={4}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              position: "sticky",
              top: 24,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Order Total
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="body2">
                  {formatCurrency(totalAmount)}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Shipping
                </Typography>
                <Typography variant="body2" color="success.main">
                  Free
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={600}>
                  Total
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary">
                  {formatCurrency(totalAmount)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handlePlaceOrder}
                disabled={!paymentMethod || !address}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1rem",
                  mb: 2,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: 2,
                  },
                }}
              >
                Pay
              </Button>

              {/* Security Notice */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="grey.50"
                p={2}
                borderRadius={1}
              >
                <Security fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  Your payment information is secure and encrypted
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;

// import { useSelector } from "react-redux";
// import { Box, Typography, Divider, Button, Paper, Stack } from "@mui/material";
// // import OrderSummary from "../components/OrderSummary";
// import PaymentMethodSelector from "../components/PaymentMethodSelector";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "../app/store";

// const PaymentPage = () => {
//   const totalAmount = useSelector((state: RootState) => state.cart.total);
//   const address = useSelector((state: RootState) => state.cart.address);
//   // console.log("address", address);

//   const paymentMethod = useSelector(
//     (state: RootState) => state.cart.paymentMethod
//   );
//   const navigate = useNavigate();

//   const handlePlaceOrder = () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method.");
//       return;
//     }
//     navigate("/confirmation");
//     // navigate("/checkout/confirmation");
//   };

//   return (
//     <Box sx={{ maxWidth: 1000, mx: "auto", py: 5, px: { xs: 2, md: 4 } }}>
//       <Typography variant="h4" fontWeight={800} gutterBottom>
//         Checkout
//       </Typography>

//       <Paper
//         elevation={2}
//         sx={{
//           p: 3,
//           mb: 4,
//           borderRadius: 3,
//           background: "#f5f7fa",
//           border: "1px solid #e0e0e0",
//         }}
//       >
//         <Typography variant="h5" fontWeight={700}>
//           Total Amount:
//           <Box component="span" sx={{ ml: 1, fontWeight: 800, color: "black" }}>
//             ${totalAmount.toFixed(2)}
//           </Box>
//         </Typography>
//       </Paper>

//       <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
//         {/* Shipping Address */}
//         <Paper
//           elevation={1}
//           sx={{
//             flex: 1,
//             p: 3,
//             borderRadius: 3,
//             background: "#ffffff",
//             border: "1px solid #e0e0e0",
//           }}
//         >
//           <Typography variant="h6" fontWeight={700} gutterBottom>
//             Shipping Address
//           </Typography>
//           {address ? (
//             <Box>
//               <Typography>{address.fullName}</Typography>
//               <Typography>{address.mobile}</Typography>
//               <Typography>
//                 {address.city}, {address.state} - {address.pincode}
//               </Typography>
//             </Box>
//           ) : (
//             <Typography color="error">No address found.</Typography>
//           )}
//         </Paper>

//         {/* Payment Method */}
//         <Paper
//           elevation={1}
//           sx={{
//             flex: 1,
//             p: 3,
//             borderRadius: 3,
//             background: "#ffffff",
//             border: "1px solid #e0e0e0",
//           }}
//         >
//           <Typography variant="h6" fontWeight={700} gutterBottom>
//             Payment Method
//           </Typography>
//           <PaymentMethodSelector />
//         </Paper>
//       </Stack>

//       <Divider sx={{ my: 4 }} />

//       {/* Order Summary (optional, enable if needed) */}
//       {/* <Paper
//         elevation={1}
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           background: "#ffffff",
//           border: "1px solid #e0e0e0",
//           mb: 4,
//         }}
//       >
//         <Typography variant="h6" fontWeight={700} gutterBottom>
//           Order Summary
//         </Typography>
//         <OrderSummary cartItems={cart.items} />
//       </Paper> */}

//       <Button
//         variant="contained"
//         fullWidth
//         size="large"
//         onClick={handlePlaceOrder}
//         sx={{
//           borderRadius: 2,
//           fontWeight: 700,
//           textTransform: "none",
//           backgroundColor: "black",
//           color: "white",
//           py: 1.5,
//           fontSize: "1rem",
//           boxShadow:
//             "0px 4px 6px -1px rgba(0,0,0,0.2), 0px 10px 20px rgba(0,0,0,0.1)",
//           ":hover": {
//             backgroundColor: "white",
//             color: "black",
//             border: "1px solid black",
//             boxShadow:
//               "0px 8px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.1)",
//           },
//         }}
//       >
//         Place Order
//       </Button>
//     </Box>
//   );
// };

// export default PaymentPage;
