import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Sentry from "@sentry/react";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
// import { setCreditionals } from "../../reducers/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../services/auth";

function SignupPage() {
  const [signup] = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateSchema = Yup.object({
    username: Yup.string()
      .min(5, "Must be at least 5 characters")
      .max(20, "Must be less than 20 characters")
      .required("Username is required")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
    password: Yup.string().min(5).required("Please enter your Password"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      // console.log(values);
      // const userData = await login(values);
      // disptch(setCreditionals({ ...userData }));
      // navigate("/welcome");
      try {
        // const userData = await login(values).unwrap();
        // console.log(userData);

        // const userr = values.username;
        // const { username: user, password: pwd, rememberMe } = values;
        // console.log(rememberMe);

        // const userData = await login({ user, pwd }).unwrap();
        // dispatch(setCreditionals({ ...userData, user, rememberMe }));
        // console.log(userData);
        // console.log({ ...userData, user });
        // try {
        const { username: user, password: pwd } = values;
        await signup({ user, pwd }).unwrap();
        // const response = await axios.post(
        //   REGISTER_URL,
        //   JSON.stringify({ user, pwd, rememberMe }),
        //   {
        //     headers: { "Content-Type": "application/json" },
        //     withCredentials: true,
        //   }
        // );
        // setUser("");
        // setPwd("");
        navigate("/login");
      } catch (err) {
        // if (!err?.originalStatus) {
        //   // isLoading: true until timeout occurs
        //   setErrMsg("No Server Response");
        // } else if (err.originalStatus === 400) {
        //   setErrMsg("Missing Username or Password");
        // } else if (err.originalStatus === 401) {
        //   setErrMsg("Unauthorized");
        // } else {
        //   setErrMsg("Login Failed");
        // }
        // errRef.current.focus();
        // console.log(err);
        if (import.meta.env.MODE !== "development") {
          Sentry.captureException(err);
        } else {
          console.error("Caught error:", err);
        }
      }
    },
  });
  return (
    <Container
      //   maxWidth="lg"
      //   style={{ maxWidth: "1280px" }}
      sx={{
        // height: "100vh",
        // maxWidth: "1280px",
        // margin: "auto",
        width: "100%",
        maxWidth: 100,
        overflow: "hidden",
        display: "flex",
        gap: "50px",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Paper
        // elevation={10}
        sx={{
          //   width: "100%",
          maxWidth: 1000,
          overflow: "hidden",
          //   borderRadius: 2,
          display: "flex",
          flexDirection: "row",
        }}
      > */}
      {/* Left side - Image */}
      <Box
        sx={{
          width: { xs: "0%", md: "50%" },
          bgcolor: "primary.main",
          display: { xs: "none", md: "block" },
        }}
      >
        <img
          src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-1592.jpg"
          alt="User authentication illustration"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Right side - Login form */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
        >
          Hello New User
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Enter your credentials to create your account
        </Typography>

        {/* <Formik
          initialValues={{
            username: "",
            password: "",
            remember: Boolean,
          }}
          validationSchema={validateSchema}
          onSubmit={async (values) => {
            // alert(JSON.stringify(values,null,2));
            console.log(values);
          }}        >
          {() => (
            <>
              <Form>
                <label htmlFor="username">
                  <Field
                  
                    name="username"
                    type="text"
                    placeholder="Enter your Username"
                  />
                  <ErrorMessage name="username" component="div" />
                </label>
                <label htmlFor="password">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your Password"
                  />
                  <ErrorMessage name="password" component="div" />
                </label>
              </Form>
            </>
          )}
        </Formik> */}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link href="#" variant="body2" underline="hover">
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign Up
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
              OR CONTINUE WITH
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <IconButton sx={{ border: "1px solid", borderColor: "divider" }}>
              <GitHubIcon />
            </IconButton>
            <IconButton sx={{ border: "1px solid", borderColor: "divider" }}>
              <TwitterIcon />
            </IconButton>
          </Stack>

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            {/* <Button
              component={NavLink}
              to="/login"
              //   href="#"
              //   variant="body2"
              //   underline="hover"
            >
              Login
            </Button> */}
            <Link
              component={NavLink}
              to="/login"
              variant="body2"
              underline="hover"
            >
              Login
            </Link>
          </Typography>
        </form>
      </Box>
      {/* </Paper> */}
    </Container>
  );
}

export default SignupPage;
