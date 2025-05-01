import React, { useState } from "react";
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
  padding: "2rem",
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

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message) newErrors.message = "Message is required";
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSnackbar({
          open: true,
          message: "Message sent successfully!",
          severity: "success",
        });
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to send message. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

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
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Phone Number (Optional)"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
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
