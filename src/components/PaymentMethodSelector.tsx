import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  Stack,
} from "@mui/material";
import {
  CreditCard,
  AccountBalance,
  LocalShipping,
  Security,
} from "@mui/icons-material";
import { setPaymentMethod } from "../reducers/cart";
import { RootState } from "../app/store";

interface PaymentOption {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
  processingTime: string;
}

const PaymentMethodSelector: React.FC = () => {
  const dispatch = useDispatch();
  const paymentMethod = useSelector(
    (state: RootState) => state.cart.paymentMethod
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setPaymentMethod(event.target.value));
  };

  const paymentOptions: PaymentOption[] = [
    {
      value: "card",
      label: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: <CreditCard color="primary" />,
      popular: true,
      processingTime: "Instant",
    },
    {
      value: "upi",
      label: "UPI Payment",
      description: "Pay using Google Pay, PhonePe, Paytm",
      icon: <AccountBalance color="primary" />,
      processingTime: "Instant",
    },
    {
      value: "cod",
      label: "Cash on Delivery",
      description: "Pay when your order is delivered",
      icon: <LocalShipping color="primary" />,
      processingTime: "On delivery",
    },
  ];

  return (
    <FormControl component="fieldset" fullWidth>
      <RadioGroup value={paymentMethod || ""} onChange={handleChange}>
        <Stack spacing={2}>
          {paymentOptions.map((option) => (
            <Card
              key={option.value}
              variant="outlined"
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                border: "1px solid",
                borderColor:
                  paymentMethod === option.value ? "primary.main" : "divider",
                backgroundColor:
                  paymentMethod === option.value
                    ? "primary.50"
                    : "background.paper",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: 1,
                },
              }}
            >
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <FormControlLabel
                  value={option.value}
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" width="100%">
                      <Box mr={2}>{option.icon}</Box>
                      <Box flex={1}>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <Typography variant="body1" fontWeight={600} mr={1}>
                            {option.label}
                          </Typography>
                          {option.popular && (
                            <Chip
                              label="Popular"
                              size="small"
                              color="primary"
                              variant="filled"
                              sx={{
                                height: 20,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={0.5}
                        >
                          {option.description}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Security
                            fontSize="small"
                            color="action"
                            sx={{ mr: 0.5 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            Processing: {option.processingTime}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  }
                  sx={{
                    m: 0,
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </Stack>
      </RadioGroup>

      {/* Security Notice */}
      <Box
        mt={3}
        p={2}
        bgcolor="grey.50"
        borderRadius={1}
        border="1px solid"
        borderColor="grey.200"
      >
        <Box display="flex" alignItems="center">
          <Security color="success" sx={{ mr: 1, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            All payment methods are secured with 256-bit SSL encryption
          </Typography>
        </Box>
      </Box>
    </FormControl>
  );
};

export default PaymentMethodSelector;

// import { ChangeEvent } from "react";
// import { RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setPaymentMethod } from "../reducers/cart";
// import { RootState } from "../app/store";

// const PaymentMethodSelector = () => {
//   const dispatch = useDispatch();
//   const paymentMethod = useSelector(
//     (state: RootState) => state.cart.paymentMethod
//   );

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     dispatch(setPaymentMethod(e.target.value));
//   };

//   return (
//     <>
//       <FormLabel component="legend">Select Payment Method</FormLabel>
//       <RadioGroup value={paymentMethod} onChange={handleChange}>
//         <FormControlLabel
//           value="card"
//           control={<Radio />}
//           label="Credit/Debit Card"
//         />
//         <FormControlLabel value="upi" control={<Radio />} label="UPI" />
//         <FormControlLabel
//           value="cod"
//           control={<Radio />}
//           label="Cash on Delivery"
//         />
//       </RadioGroup>
//     </>
//   );
// };

// export default PaymentMethodSelector;
