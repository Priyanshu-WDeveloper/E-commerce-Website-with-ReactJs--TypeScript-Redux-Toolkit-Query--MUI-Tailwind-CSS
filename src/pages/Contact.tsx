import { useState } from "react";
import * as Yup from "yup";
import * as Sentry from "@sentry/react";
import { useFormik } from "formik";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  AlertColor,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import Layout from "../components/Layout/Layout";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  //  padding: "2rem",
  height: "100%",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const ImageSection = styled(Box)({
  backgroundImage:
    "url(https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100%",
  minHeight: "600px",
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "2rem",
  color: "#fff",
});

const ContactInfoItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
  gap: "1rem",
});

const SocialIcons = styled(Box)({
  display: "flex",
  gap: "1rem",
  marginTop: "1rem",
  "& svg": {
    fontSize: "24px",
    cursor: "pointer",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#1976d2",
    },
  },
});
// Define proper type for snackbar state
interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor; // Use AlertColor type from MUI
}

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const validateSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string(),
    // .required("Phone number is required")
    message: Yup.string().required("Message is required"),
  });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: validateSchema,
    // onSubmit: async (values) => {
    onSubmit: async () => {
      setLoading(true);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        setSnackbar({
          open: true,
          message: "Message sent successfully!",
          severity: "success",
        });
        // console.log(values);
      } catch (err) {
        // console.log(err);
        if (import.meta.env.MODE !== "development") {
          Sentry.captureException(err);
          // console.error("Caught error:", err);
        } else {
          console.error("Caught error:", err);
        }

        setSnackbar({
          open: true,
          message: `Failed to send message. Please try again. `,
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Layout>
        <Container maxWidth="lg" sx={{ py: 8, marginTop: "20px" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <StyledPaper>
                <Typography variant="h4" gutterBottom>
                  Get in Touch
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fullName && Boolean(formik.errors.fullName)
                    }
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                    }
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Phone Number (Optional)"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.message && Boolean(formik.errors.message)
                    }
                    helperText={formik.touched.message && formik.errors.message}
                    margin="normal"
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 3 }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Send Message"}
                  </Button>
                </form>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <ImageSection>
                <Overlay>
                  <Typography variant="h4" gutterBottom>
                    Contact Information
                  </Typography>
                  <ContactInfoItem>
                    <FaMapMarkerAlt />
                    <Typography>
                      123 Business Avenue, New York, NY 10001
                    </Typography>
                  </ContactInfoItem>
                  <ContactInfoItem>
                    <FaPhone />
                    <Typography>+1 (555) 123-4567</Typography>
                  </ContactInfoItem>
                  <ContactInfoItem>
                    <FaEnvelope />
                    <Typography>contact@company.com</Typography>
                  </ContactInfoItem>
                  <SocialIcons>
                    <FaFacebook />
                    <FaTwitter />
                    <FaLinkedin />
                  </SocialIcons>
                </Overlay>
              </ImageSection>
            </Grid>
          </Grid>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </Layout>
    </>
  );
};

export default ContactUs;
