import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Sentry from "@sentry/react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useLoginMutation } from "../../services/auth";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setCreditionals } from "../../reducers/authSlice";
import { ErrorResponse } from "../../types/response";
import { errToast, showToast } from "../../helpers/toast";

const LoginPage = () => {
  const [loginType, setLoginType] = useState("email");
  const [method, setMethod] = useState<"phone" | "account">("phone");
  // const [method, setMethod] = useState<"phone" | "account">("phone");
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirm, setShowConfirm] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  // const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleTabChange = (event, newValue) => {
    setLoginType(newValue);
    // formik.setFieldValue("account", "");
    setMethod(newValue);
    formik.setFieldValue("method", newValue);
    //       // Optionally clear the other field to avoid stale values
    if (newValue === "phone") {
      formik.setFieldValue("account", "");
    } else {
      formik.setFieldValue("phone", "");
    }

    // setMethod(newValue === "phone" ? "phone" : "account");
    // formik.setFieldValue("email", "");
    // formik.setFieldValue("phone", "");
    formik.setTouched({}, false);
    formik.setErrors({});
  };

  const validateSchema = Yup.object({
    account: Yup.string().when("method", {
      is: "account",
      then: (schema) =>
        schema
          .required("Username or Email is required")
          .test(
            "is-username-or-email",
            "Enter a valid username or email",
            (value) => {
              if (!value) return false;
              const usernameRegex = /^[a-zA-Z0-9]{5,20}$/;
              const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
              return usernameRegex.test(value) || emailRegex.test(value);
            }
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
    phone: Yup.string().when("method", {
      is: "phone",
      then: (schema) =>
        schema
          .required("Phone number is required")
          .test(
            "is-valid-phone",
            "Please enter a valid phone number",
            (value) => {
              if (!value) return false;
              const phoneObj = parsePhoneNumberFromString(value, "IN");

              return !!phoneObj && phoneObj.isValid();
            }
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
    password: Yup.string().min(5).required("Please enterr your Password"),
  });

  const formik = useFormik({
    initialValues: {
      // email: "",
      phone: "",
      account: "",
      password: "",
      method: method,
      rememberMe: false,
    },
    enableReinitialize: true,
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      // console.log("Form Values:", values);
      // alert("Login submitted!");
      // const phoneObj = parsePhoneNumberFromString(values.phone);
      const phoneObj = parsePhoneNumberFromString(values.phone, "IN");

      // if (phoneObj && phoneObj.isValid()) {
      const countryCode = "+" + phoneObj?.countryCallingCode;
      const nationalNumber = phoneObj?.nationalNumber;
      const { password, rememberMe } = values;

      let body = {};
      if (method === "account") {
        const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          values.account
        );
        body = {
          ...(isEmail
            ? { email: values.account }
            : { username: values.account }),
          password: password,
        };
      } else {
        body = {
          phone: values.phone,
          countryCode,
          nationalNumber,
          password: password,
        };
      }

      console.log("Form Values:", body);

      try {
        const res = await login(body).unwrap();
        console.log(res);

        if (res?.statusCode === 200) {
          dispatch(
            setCreditionals({
              user: res.data.user,
              accessToken: res.data.accessToken,
              rememberMe,
            })
          );
          showToast(res.data.message || "Login successful!");
          navigate(from, { replace: true });
        }
      } catch (err) {
        if (import.meta.env.MODE !== "development") {
          Sentry.captureException(err);
        } else {
          console.error("Caught error:", err);

          // if (err.status === 400) {
          const error = err as ErrorResponse;
          errToast(error.data.message || "Login failed");
          // }
        }
      }
    },
  });
  // Keep formik.values.method in sync with local state
  const handleMethodChange = (
    _: React.MouseEvent<HTMLElement>,
    newMethod: "phone" | "account" | null
  ) => {
    if (newMethod) {
      setMethod(newMethod);
      // setMethod(newValue === "phone" ? "phone" : "account");
      // formik.setFieldValue("email", "");
      // formik.setFieldValue("phone", "");
      formik.setFieldValue("method", newMethod);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("https://images.unsplash.com/photo-1498050108023-c5249f4df085")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          px: 4,
          py: 6,
          width: "100%",
          maxWidth: 400,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, color: "hotpink" }}
        >
          Login Here
        </Typography>

        {/* Tabs */}
        <Tabs
          value={method}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          centered
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
            },
            "& .Mui-selected": {
              color: "#f06292 !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#f06292",
            },
          }}
        >
          <Tab label="Username or Email" value="account" />
          <Tab label="Phone" value="phone" />
        </Tabs>

        {/* Dynamic Input */}
        {/* {loginType === "email" ? (
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{ mb: 3 }}
            /> */}

        {/* Method selector */}
        {/* <ToggleButtonGroup
          color="primary"
          value={method}
          exclusive
          onChange={handleMethodChange}
          sx={{ mb: 2, display: "flex", justifyContent: "center" }}
        >
          <ToggleButton value="account">Username or Email</ToggleButton>
          <ToggleButton value="phone">Phone</ToggleButton>
        </ToggleButtonGroup> */}

        <form onSubmit={formik.handleSubmit}>
          {method === "account" ? (
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Username or Email"
              name="account"
              autoComplete="account"
              autoFocus
              value={formik.values.account}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.account && Boolean(formik.errors.account)}
              helperText={formik.touched.account && formik.errors.account}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInput-root": { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "white",
                },
              }}
            />
          ) : (
            <Box sx={{ mb: 3 }}>
              <PhoneInput
                country={"in"}
                value={formik.values.phone}
                onChange={(value) => formik.setFieldValue("phone", value)}
                inputStyle={{
                  width: "100%",
                  backgroundColor: "transparent",
                  color: "white",
                  border: "none",
                  borderBottom: "1px solid white",
                  fontSize: "1rem",
                  paddingLeft: "48px",
                  height: "40px",
                }}
                buttonStyle={{ border: "none", backgroundColor: "transparent" }}
                containerStyle={{ width: "100%" }}
                dropdownStyle={{ backgroundColor: "#333" }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <Typography variant="caption" color="error">
                  {formik.errors.phone}
                </Typography>
              )}
            </Box>
          )}

          {/* Password */}
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
            <LockIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
            <TextField
              label="Password"
              name="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              variant="standard"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Remember + Forgot */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
              mb: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  sx={{ color: "white" }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.875rem", color: "white" }}>
                  Remember Me
                </Typography>
              }
            />
            <Link href="#" underline="hover" sx={{ color: "#f06292" }}>
              Forgot Password?
            </Link>
          </Box>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#f06292",
              borderRadius: 10,
              textTransform: "none",
              py: 1,
              fontWeight: "bold",
              mb: 2,
              "&:hover": {
                backgroundColor: "#ec407a",
              },
            }}
          >
            LOGIN
          </Button>
        </form>

        <Typography align="center" sx={{ fontSize: "0.875rem" }}>
          Don’t have an account?{" "}
          <Link
            component={NavLink}
            to="/signup"
            underline="hover"
            sx={{ color: "#80d8ff" }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;

{
  /* // import { useState } from "react"; */
}
{
  /* // import 
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   Divider,
//   FormControlLabel,
//   IconButton,
//   InputAdornment,
//   Link,
//   Stack,
//   TextField,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
// } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import * as Sentry from "@sentry/react";

// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import FormikPhoneInput from "../../components/PhoneInput";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// import { useToast } from "../../helpers/toasts/useToast";
// import { ErrorResponse } from "../../types/response";
// import { useLoginMutation } from "../../services/auth";
// import { useDispatch } from "react-redux";
// import { setCreditionals } from "../../reducers/authSlice";

// function LoginPage() {
//   const [method, setMethod] = useState<"phone" | "account">("phone");
//   const [login] = useLoginMutation();
//   const dispatch = useDispatch();
//   const showToast = useToast();
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/";
//   const validateSchema = Yup.object({
//     account: Yup.string().when("method", {
//       is: "account",
//       then: (schema) =>
//         schema
//           .required("Username or Email is required")
//           .test(
//             "is-username-or-email",
//             "Enter a valid username or email",
//             (value) => {
//               if (!value) return false;
//               const usernameRegex = /^[a-zA-Z0-9]{5,20}$/;
//               const emailRegex =
//                 /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
//               return usernameRegex.test(value) || emailRegex.test(value);
//             }
//           ),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//     phone: Yup.string().when("method", {
//       is: "phone",
//       then: (schema) =>
//         schema
//           .required("Phone number is required")
//           .test(
//             "is-valid-phone",
//             "Please enter a valid phone number",
//             (value) => {
//               if (!value) return false;
//               const phoneObj = parsePhoneNumberFromString(value);
//               return !!phoneObj && phoneObj.isValid();
//             }
//           ),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//     password: Yup.string().min(5).required("Please enterr your Password"),
//   });
//   const formik = useFormik({
//     initialValues: {
//       account: "",
//       password: "",
//       rememberMe: false,
//       phone: "",
//       method: method,
//     },
//     enableReinitialize: true,
    // validationSchema: validateSchema,
    // onSubmit: async (values) => {
    //   let body = {};
//       if (method === "account") {
//         const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
//           values.account
//         );
//         body = {
//           ...(isEmail
//             ? { email: values.account }
//             : { username: values.account }),
//           password: values.password,
//         };
//       } else {
//         body = {
//           phone: values.phone,
//           password: values.password,
//         };
//       }
//       console.log("Request body:", body);
//       const rememberMe = values.rememberMe;

//       try {
//         const res = await login(body).unwrap();
//         console.log(res);

//         if (res?.statusCode === 200) {
//           dispatch(
//             setCreditionals({
//               user: res.data.user,
//               accessToken: res.data.accessToken,
//               rememberMe,
//             })
//           );
//           showToast(res.data.message || "Login successful!", "success");
//           navigate(from, { replace: true });
//         }
//       } catch (err) {
//         if (import.meta.env.MODE !== "development") {
//           Sentry.captureException(err);
//         } else {
//           console.error("Caught error:", err);

//           // if (err.status === 400) {
//           const error = err as ErrorResponse;
//           showToast(error.data.message || "Login failed", "error");
//           // }
//         }
//       }
//     },
//   });
//   // Keep formik.values.method in sync with local state
//   const handleMethodChange = (
//     _: React.MouseEvent<HTMLElement>,
//     newMethod: "phone" | "account" | null
//   ) => {
//     if (newMethod) {
//       setMethod(newMethod);
//       formik.setFieldValue("method", newMethod);
//     }
//   };

//   return (
//     <Container
//       //   maxWidth="lg"
//       //   style={{ maxWidth: "1280px" }}
//       sx={{
//         // height: "100vh",
//         // maxWidth: "1280px",
//         // margin: "auto",
//         width: "100%",
//         maxWidth: 100,
//         overflow: "hidden",
//         display: "flex",
//         gap: "50px",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {/* <Paper
//         // elevation={10}
//         sx={{
//           //   width: "100%",
//           maxWidth: 1000,
//           overflow: "hidden",
//           //   borderRadius: 2,
//           display: "flex",
//           flexDirection: "row",
//         }}
//       > */
}
//       {/* Left side - Image */}
//       <Box
//         sx={{
//           width: { xs: "0%", md: "50%" },
//           bgcolor: "primary.main",
//           display: { xs: "none", md: "block" },
//         }}
//       >
//         <img
//           src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-1592.jpg"
//           alt="User authentication illustration"
//           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         />
//       </Box>

//       {/* Right side - Login form */}
//       <Box
//         sx={{
//           width: { xs: "100%", md: "50%" },
//           p: 4,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Typography
//           variant="h4"
//           component="h1"
//           sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
//         >
//           Welcome Back
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ mb: 3, textAlign: "center" }}
//         >
//           Enter your credentials to access your account
//         </Typography>

//         {/* <Formik
//           initialValues={{
//             username: "",
//             password: "",
//             rememberMe: Boolean,
//           }}
//           validationSchema={validateSchema}
//           onSubmit={async (values) => {
//             // alert(JSON.stringify(values,null,2));
//             console.log(values);
//           }}        >
//           {() => (
//             <>
//               <Form>
//                 <label htmlFor="username">
//                   <Field

//                     name="username"
//                     type="text"
//                     placeholder="Enter your Username"
//                   />
//                   <ErrorMessage name="username" component="div" />
//                 </label>
//                 <label htmlFor="password">
//                   <Field
//                     name="password"
//                     type="password"
//                     placeholder="Enter your Password"
//                   />
//                   <ErrorMessage name="password" component="div" />
//                 </label>
//               </Form>
//             </>
//           )}
//         </Formik> */}

//         {/* Method selector */}
//         <ToggleButtonGroup
//           color="primary"
//           value={method}
//           exclusive
//           onChange={handleMethodChange}
//           sx={{ mb: 2, display: "flex", justifyContent: "center" }}
//         >
//           <ToggleButton value="account">Username or Email</ToggleButton>
//           <ToggleButton value="phone">Phone</ToggleButton>
//         </ToggleButtonGroup>

//         <form onSubmit={formik.handleSubmit}>
//           {method === "account" ? (
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="account"
//               label="Username or Email"
//               name="account"
//               autoComplete="account"
//               autoFocus
//               value={formik.values.account}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.account && Boolean(formik.errors.account)}
//               helperText={formik.touched.account && formik.errors.account}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           ) : (
//             <FormikPhoneInput
//               name="phone"
//               label="Phone Number"
//               country="in"
//               formik={formik}
//             />
//           )}
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             autoComplete="current-password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LockIcon />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mt: 1,
//             }}
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="rememberMe"
//                   checked={formik.values.rememberMe}
//                   onChange={formik.handleChange}
//                   color="primary"
//                 />
//               }
//               label="Remember me"
//             />
//             <Link href="#" variant="body2" underline="hover">
//               Forgot password?
//             </Link>
//           </Box>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2, py: 1.5 }}
//           >
//             Sign Up
//           </Button>

//           <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
//             <Divider sx={{ flexGrow: 1 }} />
//             <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
//               OR CONTINUE WITH
//             </Typography>
//             <Divider sx={{ flexGrow: 1 }} />
//           </Box>

//           <Stack
//             direction="row"
//             spacing={2}
//             justifyContent="center"
//             sx={{ mb: 3 }}
//           >
//             <IconButton sx={{ border: "1px solid", borderColor: "divider" }}>
//               <GitHubIcon />
//             </IconButton>
//             <IconButton sx={{ border: "1px solid", borderColor: "divider" }}>
//               <GoogleIcon />
//             </IconButton>
//           </Stack>

//           <Typography variant="body2" align="center">
//             Don't have an account?{" "}
//             {/* <Button
//               component={NavLink}
//               to="/login"
//               //   href="#"
//               //   variant="body2"
//               //   underline="hover"
//             >
//               Login
//             </Button> */}
//             <Link
//               component={NavLink}
//               to="/signup"
//               variant="body2"
//               underline="hover"
//             >
//               Sign Up
//             </Link>
//           </Typography>
//         </form>
//       </Box>
//       {/* </Paper> */}
//     </Container>
//   );
// }

// export default LoginPage; */}

// // import { useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   Checkbox,
// //   Container,
// //   Divider,
// //   FormControlLabel,
// //   IconButton,
// //   InputAdornment,
// //   Link,
// //   Stack,
// //   TextField,
// //   Typography,
// // } from "@mui/material";
// // // import { ErrorMessage, Field, Form, Formik } from "formik";
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import * as Sentry from "@sentry/react";

// // import EmailIcon from "@mui/icons-material/Email";
// // import LockIcon from "@mui/icons-material/Lock";
// // import VisibilityIcon from "@mui/icons-material/Visibility";
// // import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// // import GitHubIcon from "@mui/icons-material/GitHub";
// // import TwitterIcon from "@mui/icons-material/Twitter";
// // import { useDispatch } from "react-redux";
// // import { setCreditionals } from "../../reducers/authSlice";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import { useLoginMutation } from "../../services/auth";
// // import { useErrorToast, useToast } from "../../helpers/toasts/useToast";
// // import { ErrorResponse } from "../../types/response";

// // function LoginPage() {
// //   const [login] = useLoginMutation();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const showToast = useToast();
// //   const errToast = useErrorToast();
// //   const validateSchema = Yup.object({
// //     // username: Yup.string()
// //     //   .min(5, "Must be at least 5 characters")
// //     //   .max(20, "Must be less than 20 characters")
// //     //   .required("Username is required")
// //     //   .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
// //     password: Yup.string().min(5).required("Please enter your Password"),
// //   });
// //   const formik = useFormik({
// //     initialValues: {
// //       username: "",
// //       password: "",
// //       rememberMe: false,
// //     },
// //     validationSchema: validateSchema,
// //     onSubmit: async (values) => {
// //       // console.log(values);
// //       // const userData = await login(values);
// //       // disptch(setCreditionals({ ...userData }));
// //       // navigate("/welcome");
// //       try {
// //         // const userData = await login(values).unwrap();
// //         // console.log(userData);

// //         // const userr = values.username;
// //         const { username: user, password: pwd, rememberMe } = values;
// //         // console.log(rememberMe);

// //         const userData = await login({ user, pwd }).unwrap();
// //         dispatch(setCreditionals({ ...userData, user, rememberMe }));
// //         showToast("Login successful", "success");

// //         // console.log(userData);
// //         // console.log({ ...userData, user });
// //         // setUser("");
// //         // setPwd("");
// //         navigate("/");
// //       } catch (err) {
// //         // if (!err?.originalStatus) {
// //         //   // isLoading: true until timeout occurs
// //         //   setErrMsg("No Server Response");
// //         // } else if (err.originalStatus === 400) {
// //         //   setErrMsg("Missing Username or Password");
// //         // } else if (err.originalStatus === 401) {
// //         //   setErrMsg("Unauthorized");
// //         // } else {
// //         //   setErrMsg("Login Failed");
// //         // }
// //         // errRef.current.focus();
// //         // console.log(err);
// //         if (import.meta.env.MODE !== "development") {
// //           Sentry.captureException(err);
// //         } else {
// //           console.error("Caught error:", err);
// //           // type ErrorResponse = { data?: { message?: string } };
// //           // type ErrorResponse = { data?: string };
// //           const error = err as ErrorResponse;
// //           errToast(error.data.message || "Login failed");
// //         }
// //         // errToast(err?.data || "Login failed");

// //         // errToast(err?.data?.message || "Login failed");
// //       }
// //     },
// //   });
// //   return (
// //     <Container
// //       //   maxWidth="lg"
// //       //   style={{ maxWidth: "1280px" }}
// //       sx={{
// //         // height: "100vh",
// //         // maxWidth: "1280px",
// //         // margin: "auto",
// //         width: "100%",
// //         maxWidth: 100,
// //         overflow: "hidden",
// //         display: "flex",
// //         gap: "50px",
// //         flexDirection: "row",
// //         alignItems: "center",
// //         justifyContent: "center",
// //       }}
// //     >
// //       {/* <Paper
// //         // elevation={10}
// //         sx={{
// //           //   width: "100%",
// //           maxWidth: 1000,
// //           overflow: "hidden",
// //           //   borderRadius: 2,
// //           display: "flex",
// //           flexDirection: "row",
// //         }}
// //       > */}
// //       {/* Left side - Image */}
// //       <Box
// //         sx={{
// //           width: { xs: "0%", md: "50%" },
// //           bgcolor: "primary.main",
// //           display: { xs: "none", md: "block" },
// //         }}
// //       >
// //         <img
// //           src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-1592.jpg"
// //           alt="User authentication illustration"
// //           style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //         />
// //       </Box>

// //       {/* Right side - Login form */}
// //       <Box
// //         sx={{
// //           width: { xs: "100%", md: "50%" },
// //           p: 4,
// //           display: "flex",
// //           flexDirection: "column",
// //         }}
// //       >
// //         <Typography
// //           variant="h4"
// //           component="h1"
// //           sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
// //         >
// //           Welcome Back
// //         </Typography>
// //         <Typography
// //           variant="body2"
// //           color="text.secondary"
// //           sx={{ mb: 3, textAlign: "center" }}
// //         >
// //           Enter your credentials to access your account
// //         </Typography>

// //         {/* <Formik
// //           initialValues={{
// //             username: "",
// //             password: "",
// //             rememberMe: Boolean,
// //           }}
// //           validationSchema={validateSchema}
// //           onSubmit={async (values) => {
// //             // alert(JSON.stringify(values,null,2));
// //             // console.log(values);
// //           }}        >
// //           {() => (
// //             <>
// //               <Form>
// //                 <label htmlFor="username">
// //                   <Field

// //                     name="username"
// //                     type="text"
// //                     placeholder="Enter your Username"
// //                   />
// //                   <ErrorMessage name="username" component="div" />
// //                 </label>
// //                 <label htmlFor="password">
// //                   <Field
// //                     name="password"
// //                     type="password"
// //                     placeholder="Enter your Password"
// //                   />
// //                   <ErrorMessage name="password" component="div" />
// //                 </label>
// //               </Form>
// //             </>
// //           )}
// //         </Formik> */}
// //         <form onSubmit={formik.handleSubmit}>
// //           <TextField
// //             margin="normal"
// //             required
// //             fullWidth
// //             id="username"
// //             label="Username"
// //             name="username"
// //             autoComplete="username"
// //             autoFocus
// //             value={formik.values.username}
// //             onChange={formik.handleChange}
// //             onBlur={formik.handleBlur}
// //             error={formik.touched.username && Boolean(formik.errors.username)}
// //             helperText={formik.touched.username && formik.errors.username}
// //             InputProps={{
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <EmailIcon />
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //           <TextField
// //             margin="normal"
// //             required
// //             fullWidth
// //             name="password"
// //             label="Password"
// //             type={showPassword ? "text" : "password"}
// //             id="password"
// //             autoComplete="current-password"
// //             value={formik.values.password}
// //             onChange={formik.handleChange}
// //             onBlur={formik.handleBlur}
// //             error={formik.touched.password && Boolean(formik.errors.password)}
// //             helperText={formik.touched.password && formik.errors.password}
// //             InputProps={{
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <LockIcon />
// //                 </InputAdornment>
// //               ),
// //               endAdornment: (
// //                 <InputAdornment position="end">
// //                   <IconButton
// //                     aria-label="toggle password visibility"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     edge="end"
// //                   >
// //                     {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />

// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               mt: 1,
// //             }}
// //           >
// //             <FormControlLabel
// //               control={
// //                 <Checkbox
// //                   name="rememberMe"
// //                   checked={formik.values.rememberMe}
// //                   onChange={formik.handleChange}
// //                   color="primary"
// //                 />
// //               }
// //               label="Remember me"
// //             />
// //             <Link href="#" variant="body2" underline="hover">
// //               Forgot password?
// //             </Link>
// //           </Box>

// //           <Button
// //             type="submit"
// //             fullWidth
// //             variant="contained"
// //             sx={{ mt: 3, mb: 2, py: 1.5 }}
// //           >
// //             Sign In
// //           </Button>

// //           <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
// //             <Divider sx={{ flexGrow: 1 }} />
// //             <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
// //               OR CONTINUE WITH
// //             </Typography>
// //             <Divider sx={{ flexGrow: 1 }} />
// //           </Box>

// //           <Stack
// //             direction="row"
// //             spacing={2}
// //             justifyContent="center"
// //             sx={{ mb: 3 }}
// //           >
// //             <IconButton sx={{ border: "1px solid", borderColor: "divider" }}>
// //               <GitHubIcon />
// //             </IconButton>
// //             <IconButton sx={{ border: "1px solid", borderColor: "divider" }}>
// //               <TwitterIcon />
// //             </IconButton>
// //           </Stack>

// //           <Typography variant="body2" align="center">
// //             Don't have an account?{" "}
// //             <Link
// //               component={NavLink}
// //               to="/signup"
// //               variant="body2"
// //               underline="hover"
// //             >
// //               Sign up
// //             </Link>
// //           </Typography>
// //         </form>
// //       </Box>
// //       {/* </Paper> */}
// //     </Container>
// //   );
// // }

// // export default LoginPage;
