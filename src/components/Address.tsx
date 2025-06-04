import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setAddress } from "../reducers/cart";
import { ShippingAddress } from "../types/ShippingAdress";

const AddressSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  street: Yup.string().required("Street address is required"),
  landmark: Yup.string(),
});

const AddressPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (values: ShippingAddress) => {
    dispatch(setAddress(values));

    localStorage.setItem("shippingAddress", JSON.stringify(values));
    navigate("/checkout/payment");
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 6, px: 2 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Shipping Details
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Formik
          initialValues={{
            fullName: "",
            mobile: "",
            pincode: "",
            state: "",
            city: "",
            street: "",
            landmark: "",
          }}
          validationSchema={AddressSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field name="fullName">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        label="Full Name"
                        fullWidth
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field name="mobile">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        label="Mobile Number"
                        fullWidth
                        error={touched.mobile && Boolean(errors.mobile)}
                        helperText={touched.mobile && errors.mobile}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field name="pincode">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        label="Pincode"
                        fullWidth
                        error={touched.pincode && Boolean(errors.pincode)}
                        helperText={touched.pincode && errors.pincode}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field name="state">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        label="State"
                        fullWidth
                        error={touched.state && Boolean(errors.state)}
                        helperText={touched.state && errors.state}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field name="city">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        label="City"
                        fullWidth
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="street">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        label="Street Address"
                        fullWidth
                        multiline
                        minRows={2}
                        error={touched.street && Boolean(errors.street)}
                        helperText={touched.street && errors.street}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="landmark">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        label="Landmark (optional)"
                        fullWidth
                        error={touched.landmark && Boolean(errors.landmark)}
                        helperText={touched.landmark && errors.landmark}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    type="submit"
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
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddressPage;
