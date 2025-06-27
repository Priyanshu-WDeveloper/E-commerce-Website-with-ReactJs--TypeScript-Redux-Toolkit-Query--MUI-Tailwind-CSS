import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Sentry from "@sentry/react";
import { useSignupMutation } from "../../services/auth";
import { useErrorToast, useToast } from "../../helpers/toasts/useToast";
import { ErrorResponse } from "../../types/response";
import { NavLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import parsePhoneNumberFromString from "libphonenumber-js";

const SignupForm = () => {
  const [signup] = useSignupMutation();
  const [loginType, setLoginType] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [showConfirm, setShowConfirm] = useState(false);
  const showToast = useToast();
  const errToast = useErrorToast();
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setLoginType(newValue);
    formik.setFieldValue("email", "");
    formik.setFieldValue("phone", "");
    formik.setTouched({}, false);
    formik.setErrors({});
  };

  const validationSchema = Yup.object({
    email:
      loginType === "email"
        ? Yup.string().email("Invalid email").required("Required")
        : Yup.string(),
    phone:
      loginType === "phone"
        ? Yup.string()
            .matches(/^\d{10,14}$/, "Invalid phone number")
            .required("Required")
        : Yup.string(),
    password: Yup.string().min(5, "Minimum 5 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const phoneObj = parsePhoneNumberFromString(values.phone, "IN");

      // if (phoneObj && phoneObj.isValid()) {
      const countryCode = "+" + phoneObj?.countryCallingCode;
      const nationalNumber = phoneObj?.nationalNumber;

      const { email, password } = values;
      let body = {};
      if (loginType === "email") {
        body = {
          email: email,
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
      // console.log("Form Values:", body);
      try {
        const res = await signup(body).unwrap();
        if (res?.statusCode === 200) {
          showToast("Signup successful! Redirecting to login...", "success");
        }
        // console.log("Signup response:", res);

        navigate("/login");
      } catch (err) {
        if (import.meta.env.MODE !== "development") {
          Sentry.captureException(err);
        } else {
          console.error("Caught error:", err);
          const error = err as ErrorResponse;
          errToast(error.data.message || "Signup failed");
        }
      }
    },
  });

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
        {/* <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, color: "hotpink" }}
        >
          Create Account
        </Typography> */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            fontWeight: "bold",
            background: "linear-gradient(to right, #b2ebf2, #81d4fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            letterSpacing: 1.5,
          }}
        >
          Create Account
        </Typography>

        {/* Toggle Tabs */}
        <Tabs
          value={loginType}
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
          <Tab label="Email" value="email" />
          <Tab label="Phone" value="phone" />
        </Tabs>

        <form onSubmit={formik.handleSubmit}>
          {/* Email or Phone */}
          {loginType === "email" ? (
            <TextField
              variant="standard"
              label="Email"
              // variant="standard"
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
            {/* <TextField
              label="Password"
              name="password"
              type="password"
              variant="standard"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            /> */}
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
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

          {/* Confirm Password */}
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
            <LockIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              // type="password"
              type={showConfirmPassword ? "text" : "password"}
              variant="standard"
              autoComplete="new-password"
              fullWidth
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Signup Button */}
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
            SIGN UP
          </Button>
        </form>

        {/* Already have account */}
        <Typography align="center" sx={{ fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <Link
            component={NavLink}
            to="/login"
            underline="hover"
            sx={{ color: "#80d8ff" }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupForm;

// import { useState } from "react";
// import {
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
// import TwitterIcon from "@mui/icons-material/Twitter";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSignupMutation } from "../../services/auth";
// // import FormikPhoneInput from "../../components/PhoneInput";
// import {
//   parsePhoneNumber,
//   parsePhoneNumberFromString,
// } from "libphonenumber-js";
// import { useToast } from "../../helpers/toasts/useToast";
// import { ErrorResponse } from "../../types/response";
// import PhoneInput from "react-phone-input-2";

// function SignupPage() {
//   const [method, setMethod] = useState<"phone" | "account">("phone");
//   const [signup] = useSignupMutation();
//   const showToast = useToast();
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const validateSchema = Yup.object({
//     // username: Yup.string()
//     //   .min(5, "Must be at least 5 characters")
//     //   .max(20, "Must be less than 20 characters")
//     //   .required("Username is required")
//     //   .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
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
//     validationSchema: validateSchema,
//     onSubmit: async (values) => {
//       //* const body = {
//       //*   email: values.email,
//       // *  phone: values.phone,
//       //  * countryCode: (phoneCode.includes("+") ? "" : "+") + phoneCode,
//       //* };
//       const phoneObj = parsePhoneNumberFromString(values.phone);
//       // if (phoneObj && phoneObj.isValid()) {
//       const countryCode = "+" + phoneObj?.countryCallingCode;
//       const nationalNumber = phoneObj?.nationalNumber;

//       // const parsedPhone = parsePhoneNumber(values.phone); // using libphonenumber-js

//       // const phoneData = {
//       //   full: parsedPhone.number, // +919878100000
//       //   countryCode: parsedPhone.countryCallingCode, // 91
//       //   nationalNumber: parsedPhone.nationalNumber, // 9878100000
//       // };
//       // console.log("Parsed phone data:", phoneData);

//       // }

//       //* Build payload: prioritize email > username > phone (just an example)
//       // const body = {
//       //   password: form.password,
//       //   ...(form.email ? { email: form.email } : {}),
//       //   ...(form.email ? {} : form.username ? { username: form.username } : {}),
//       //   ...(form.email || form.username ? {} : form.phone ? { phone: form.phone } : {}),
//       // };

//       let body = {};
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
//           phone: {
//             phone: values.phone,
//             countryCode,
//             nationalNumber,
//           },
//           password: values.password,
//         };
//       }
//       console.log("Request body:", body);

//       try {
//         const res = await signup(body).unwrap();
//         if (res?.statusCode === 200) {
//           showToast("Signup successful! Redirecting to login...", "success");
//         }
//         console.log("Signup response:", res);

//         // showToast("Signup successful! Redirecting to login...");
//         // showToast(error.data || "Signup successful!", "success");

//         // if (method === "account") {
//         //   // const isEmail = values.account.includes("@");
//         //   const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
//         //     values.account
//         //   );
//         //   // await signup({
//         //   //   ...(isEmail
//         //   //     ? { email: values.account }
//         //   //     : { username: values.account }),
//         //   //   password: values.password,
//         //   // }).unwrap();
//         //   // console.log("Signup successful with", isEmail ? "email" : "username");
//         //   // console.log("Account:", values.account);
//         //   // const { username, email } = values.account.includes("@")
//         //   //   ? { email: values.account }
//         //   //   : { username: values.account };
//         //   // console.log("Username:", username);
//         //   // console.log("Email:", email);

//         //   // console.log("Password:", values.password);
//         // } else {
//         //   // await signup({
//         //   //   phone: values.phone,
//         //   //   password: values.password,
//         //   // }).unwrap();
//         //   console.log(values);

//         //   // const phoneObj = parsePhoneNumberFromString(values.phone);
//         //   // if (phoneObj && phoneObj.isValid()) {
//         //   //   const countryCode = "+" + phoneObj.countryCallingCode;
//         //   //   const nationalNumber = phoneObj.nationalNumber;
//         //   //   console.log("Country code:", countryCode);
//         //   //   console.log("Phone number:", nationalNumber);
//         //   //   // Use countryCode and nationalNumber as needed
//         //   // }

//         //   console.log("Password:", values.password);
//         // }

//         navigate("/login");
//       } catch (err) {
//         if (import.meta.env.MODE !== "development") {
//           Sentry.captureException(err);
//         } else {
//           console.error("Caught error:", err);

//           // if (err.status === 400) {
//           const error = err as ErrorResponse;
//           showToast(error.data.message || "Signup failed", "error");
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
//       // Optionally clear the other field to avoid stale values
//       // if (newMethod === "phone") {
//       //   formik.setFieldValue("account", "");
//       // } else {
//       //   formik.setFieldValue("phone", "");
//       // }
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
//       > */}
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
//           Hello New User
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ mb: 3, textAlign: "center" }}
//         >
//           Enter your credentials to create your account
//         </Typography>

//         {/* <Formik
//           initialValues={{
//             username: "",
//             password: "",
//             remember: Boolean,
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
//             // <FormikPhoneInput
//             //   name="phone"
//             //   label="Phone Number"
//             //   country="us"
//             //   formik={formik}
//             // />
//             <PhoneInput
//               country={"in"}
//               value={formik.values.phone}
//               onChange={(value) => formik.setFieldValue("phone", value)}
//               inputStyle={{
//                 width: "100%",
//                 backgroundColor: "transparent",
//                 color: "white",
//                 border: "none",
//                 borderBottom: "1px solid white",
//                 fontSize: "1rem",
//                 paddingLeft: "48px",
//                 height: "40px",
//               }}
//               buttonStyle={{ border: "none", backgroundColor: "transparent" }}
//               containerStyle={{ width: "100%" }}
//               dropdownStyle={{ backgroundColor: "#333" }}
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
//               <TwitterIcon />
//             </IconButton>
//           </Stack>

//           <Typography variant="body2" align="center">
//             Already have an account?{" "}
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
//               to="/login"
//               variant="body2"
//               underline="hover"
//             >
//               Login
//             </Link>
//           </Typography>
//         </form>
//       </Box>
//       {/* </Paper> */}
//     </Container>
//   );
// }

// export default SignupPage;
