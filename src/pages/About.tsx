import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import { motion } from "framer-motion";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import "./AboutStyles.css";

const AboutUs = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <ShoppingBasketIcon sx={{ fontSize: 40 }} />,
      title: "Wide Selection",
      description: "Browse through thousands of products from top brands"
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: "Fast Delivery",
      description: "Get your orders delivered within 24-48 hours"
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: "24/7 Support",
      description: "Our customer service team is always here to help"
    }
  ];

  return (
    <Layout>
      <Container sx={{ marginTop: '100px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Hero Section */}
          <Box className="hero-section">
            <Typography variant="h2" className="hero-title">
              About Our Store
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
              Your One-Stop Shop for Quality Products
            </Typography>
          </Box>

          {/* Company Info */}
          <Grid container spacing={4} className="company-info">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Typography variant="h4" gutterBottom>
                  Our Story
                </Typography>
                <Typography variant="body1" paragraph>
                  Founded in 2023, we've been committed to providing our customers with the best shopping experience possible. Our journey started with a simple idea: make quality products accessible to everyone.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Typography variant="h4" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  We strive to offer unparalleled service and the finest products to our customers. Our mission is to transform the online shopping experience through innovation and dedication.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          {/* Features Section */}
          <Grid container spacing={4} className="features-section">
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="feature-card">
                    <CardContent>
                      <Box className="feature-icon">
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default AboutUs;
