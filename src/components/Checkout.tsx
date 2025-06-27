import { Box, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CheckboxStepper from "./Cart/CheckboxStepper3";

// src/pages/Checkout.jsx
const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define steps for the checkout process
  // const steps = ["BAG", "ADDRESS", "PAYMENT"];
  const steps = [
    { title: "Bag", description: "Items in your bag" },
    { title: "Address", description: "Delivery address" },
    { title: "Payment", description: "Payment method" },
    // { title: "Confirmation", description: "Order confirmation" },
  ];

  // Determine active step based on current path
  const getActiveStep = () => {
    const path = location.pathname;
    if (path.includes("/cart")) return 0;
    if (path.includes("/address")) return 1;
    if (path.includes("/payment")) return 2;
    return 0; // Default to cart
  };

  const activeStep = getActiveStep();

  return (
    <>
      <Box sx={{ maxWidth: 980, mx: "auto", p: 2 }}>
        {/* Checkout Header */}
        {/* <Box sx={{ mb: 4, textAlign: "center" }}> */}
        {/* <Typography variant="h4" fontWeight="bold" gutterBottom>
            Checkout
          </Typography> */}

        {/* Stepper for checkout process */}
        <Box sx={{ mt: 0, mb: 1 }}>
          {/* <CheckboxStepper 
              steps={steps} 
              activeStep={activeStep} 
              onStepClick={(step) => {
                // Navigate to the appropriate step
                if (step === 0) {
                  navigate("/checkout/cart");
                } else if (step === 1) {
                  navigate("/checkout/address");
                } else if (step === 2) {
                  navigate("/checkout/payment");
                }
              }}
            /> */}
          <CheckboxStepper
            steps={steps}
            activeStep={activeStep}
            onStepClick={(step) => {
              // Navigate to the appropriate step
              if (step === 0) {
                navigate("/checkout/cart");
              } else if (step === 1) {
                navigate("/checkout/address");
              } else if (step === 2) {
                navigate("/checkout/payment");
              }
            }}
          />
          {/* </Box> */}
        </Box>

        {/* Render the current checkout step */}
        <Outlet />
      </Box>
    </>
  );
};

export default Checkout;
