import { ChangeEvent } from "react";
import { RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../reducers/cart";
import { RootState } from "../app/store";

const PaymentMethodSelector = () => {
  const dispatch = useDispatch();
  const paymentMethod = useSelector(
    (state: RootState) => state.cart.paymentMethod
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPaymentMethod(e.target.value));
  };

  return (
    <>
      <FormLabel component="legend">Select Payment Method</FormLabel>
      <RadioGroup value={paymentMethod} onChange={handleChange}>
        <FormControlLabel
          value="card"
          control={<Radio />}
          label="Credit/Debit Card"
        />
        <FormControlLabel value="upi" control={<Radio />} label="UPI" />
        <FormControlLabel
          value="cod"
          control={<Radio />}
          label="Cash on Delivery"
        />
      </RadioGroup>
    </>
  );
};

export default PaymentMethodSelector;
