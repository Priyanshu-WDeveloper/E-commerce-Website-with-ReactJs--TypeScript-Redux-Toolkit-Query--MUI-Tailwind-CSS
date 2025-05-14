import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";
// import Logo from "../../images/5158CD_Private-Label-Products_Header.webp"; // Adjust the path to your logo image

const Footer = () => {
  const footerLinks = {
    "Quick Links": ["Home", "About", "Products", "Contact"],
    "Customer Service": ["FAQ", "Shipping", "Returns", "Track Order"],
    "Our Policies": ["Privacy Policy", "Terms of Service", "Refund Policy"],
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: "https://facebook.com" },
    { icon: <InstagramIcon />, url: "https://instagram.com" },
    { icon: <TwitterIcon />, url: "https://twitter.com" },
    { icon: <LinkedInIcon />, url: "https://linkedin.com" },
    { icon: <YouTubeIcon />, url: "https://youtube.com" },
    { icon: <GitHubIcon />, url: "https://github.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1A1A19",
        color: "white",
        pt: 6,
        pb: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* Logo Section */}
        {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "100%", height: "auto", maxWidth: "200px" }}
          />
        </Box> */}

        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" gutterBottom>
                About Our Store
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                We are committed to providing our customers with the best
                shopping experience and quality products at competitive prices.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                <Typography variant="body2">
                  123 Shopping Street, NY 10001
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                <Typography variant="body2">contact@store.com</Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <Grid item xs={12} sm={6} md={2} key={title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    color="inherit"
                    sx={{
                      display: "block",
                      mb: 1,
                      textDecoration: "none",
                      "&:hover": {
                        color: "goldenrod",
                        transform: "translateX(5px)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Social Links */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ mb: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "white",
                    mx: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "goldenrod",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
              © {new Date().getFullYear()} My Shopping Store. All rights
              reserved.
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

// import React, { lazy, Suspense, memo, useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Link,
//   IconButton,
// } from "@mui/material";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import Logo from "../../images/5158CD_Private-Label-Products_Header.webp"; // Adjust the path to your logo image

// // Lazy load framer-motion to reduce initial bundle size
// const motion = lazy(() => import('framer-motion').then(module => ({ default: module.motion })));

// // Memoized footer links to prevent re-renders
// const footerLinks = {
//   "Quick Links": ["Home", "About", "Products", "Contact"],
//   "Customer Service": ["FAQ", "Shipping", "Returns", "Track Order"],
//   "Our Policies": ["Privacy Policy", "Terms of Service", "Refund Policy"],
// };

// // Static company info component - memoized to prevent re-renders
// const CompanyInfo = memo(() => (
//   <Box>
//     <Typography variant="h6" gutterBottom>
//       About Our Store
//     </Typography>
//     <Typography variant="body2" sx={{ mb: 2 }}>
//       We are committed to providing our customers with the best
//       shopping experience and quality products at competitive prices.
//     </Typography>
//     <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//       <LocationOnIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
//       <Typography variant="body2">
//         123 Shopping Street, NY 10001
//       </Typography>
//     </Box>
//     <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//       <PhoneIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
//       <Typography variant="body2">+1 (555) 123-4567</Typography>
//     </Box>
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <EmailIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
//       <Typography variant="body2">contact@store.com</Typography>
//     </Box>
//   </Box>
// ));

// // Static link section component - memoized to prevent re-renders
// const LinkSection = memo(({ title, links }: { title: string, links: string[] }) => (
//   <Box>
//     <Typography variant="h6" gutterBottom>
//       {title}
//     </Typography>
//     {links.map((link) => (
//       <Link
//         key={link}
//         href="#"
//         color="inherit"
//         sx={{
//           display: "block",
//           mb: 1,
//           textDecoration: "none",
//           "&:hover": {
//             color: "goldenrod",
//             transform: "translateX(5px)",
//             transition: "all 0.3s ease",
//           },
//         }}
//       >
//         {link}
//       </Link>
//     ))}
//   </Box>
// ));

// // Static copyright component - memoized to prevent re-renders
// const Copyright = memo(() => (
//   <Box>
//     <Typography variant="h6" gutterBottom>
//       Follow Us
//     </Typography>
//     <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
//       © {new Date().getFullYear()} My Shopping Store. All rights
//       reserved.
//     </Typography>
//   </Box>
// ));

// const Footer = () => {
//   // Use a single state variable to track if the component is mounted
//   const [mounted, setMounted] = useState(false);

//   // After first render, set mounted to true
//   useEffect(() => {
//     // Delay setting mounted to true to prioritize other operations
//     const timeoutId = setTimeout(() => {
//       setMounted(true);
//     }, 200);

//     return () => clearTimeout(timeoutId);
//   }, []);

//   // const socialLinks = [
//   //   { icon: <FacebookIcon />, url: "https://facebook.com" },
//   //   { icon: <InstagramIcon />, url: "https://instagram.com" },
//   //   { icon: <TwitterIcon />, url: "https://twitter.com" },
//   //   { icon: <LinkedInIcon />, url: "https://linkedin.com" },
//   //   { icon: <YouTubeIcon />, url: "https://youtube.com" },
//   //   { icon: <GitHubIcon />, url: "https://github.com" }
//   // ];

//   return (
//     <Box
//       component="footer"
//       sx={{
//         bgcolor: "#1A1A19",
//         color: "white",
//         pt: 6,
//         pb: 3,
//         mt: "auto",
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* Logo Section */}
//         {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//           <img
//             src={Logo}
//             alt="Logo"
//             style={{ width: "100%", height: "auto", maxWidth: "200px" }}
//           />
//         </Box> */}

//         <Grid container spacing={4} sx={{ justifyContent: "center" }}>
//           {/* Company Info - wrapped in Suspense/motion only when mounted */}
//           <Grid item xs={12} md={4}>
//             {mounted ? (
//               <Suspense fallback={<CompanyInfo />}>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <CompanyInfo />
//                 </motion.div>
//               </Suspense>
//             ) : (
//               <CompanyInfo />
//             )}
//           </Grid>

//           {/* Quick Links */}
//           {Object.entries(footerLinks).map(([title, links], index) => (
//             <Grid item xs={12} sm={6} md={2} key={title}>
//               {mounted ? (
//                 <Suspense fallback={<LinkSection title={title} links={links} />}>
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                   >
//                     <LinkSection title={title} links={links} />
//                   </motion.div>
//                 </Suspense>
//               ) : (
//                 <LinkSection title={title} links={links} />
//               )}
//             </Grid>
//           ))}
//         </Grid>

//         {/* Social Links */}
//         <Box
//           sx={{
//             mt: 4,
//             pt: 3,
//             borderTop: "1px solid rgba(255, 255, 255, 0.1)",
//             textAlign: "center",
//           }}
//         >
//           {mounted ? (
//             <Suspense fallback={<Copyright />}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Copyright />
//               </motion.div>
//             </Suspense>
//           ) : (
//             <Copyright />
//           )}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// // Export a memoized version of the component to prevent unnecessary re-renders
// export default memo(Footer);

// import React from "react";
// import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import { motion } from "framer-motion";

// const Footer = () => {
//   const footerLinks = {
//     "Quick Links": ["Home", "About", "Products", "Contact"],
//     "Customer Service": ["FAQ", "Shipping", "Returns", "Track Order"],
//     "Our Policies": ["Privacy Policy", "Terms of Service", "Refund Policy"]
//   };

//   const socialLinks = [
//     { icon: <FacebookIcon />, url: "https://facebook.com" },
//     { icon: <InstagramIcon />, url: "https://instagram.com" },
//     { icon: <TwitterIcon />, url: "https://twitter.com" },
//     { icon: <LinkedInIcon />, url: "https://linkedin.com" },
//     { icon: <YouTubeIcon />, url: "https://youtube.com" },
//     { icon: <GitHubIcon />, url: "https://github.com" }
//   ];

//   return (
//     <Box
//       component="footer"
//       sx={{
//         bgcolor: "#1A1A19",
//         color: "white",
//         pt: 6,
//         pb: 3,
//         mt: "auto"
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
//           {/* Company Info */}
//           <Grid item xs={12} md={4}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Typography variant="h6" gutterBottom>
//                 About Our Store
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 2 }}>
//                 We are committed to providing our customers with the best shopping
//                 experience and quality products at competitive prices.
//               </Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <LocationOnIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
//                 <Typography variant="body2">
//                   123 Shopping Street, NY 10001
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <PhoneIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
//                 <Typography variant="body2">+1 (555) 123-4567</Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <EmailIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
//                 <Typography variant="body2">contact@store.com</Typography>
//               </Box>
//             </motion.div>
//           </Grid>

//           {/* Quick Links */}
//           {Object.entries(footerLinks).map(([title, links], index) => (
//             <Grid item xs={12} sm={6} md={2} key={title}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <Typography variant="h6" gutterBottom>
//                   {title}
//                 </Typography>
//                 {links.map((link) => (
//                   <Link
//                     key={link}
//                     href="#"
//                     color="inherit"
//                     sx={{
//                       display: 'block',
//                       mb: 1,
//                       textDecoration: 'none',
//                       '&:hover': {
//                         color: 'goldenrod',
//                         transform: 'translateX(5px)',
//                         transition: 'all 0.3s ease'
//                       }
//                     }}
//                   >
//                     {link}
//                   </Link>
//                 ))}
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Social Links */}
//         <Box
//           sx={{
//             mt: 4,
//             pt: 3,
//             borderTop: '1px solid rgba(255, 255, 255, 0.1)',
//             textAlign: 'center'
//           }}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Follow Us
//             </Typography>
//             <Box sx={{ mb: 2 }}>
//               {socialLinks.map((social, index) => (
//                 <IconButton
//                   key={index}
//                   component="a"
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   sx={{
//                     color: 'white',
//                     mx: 1,
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       color: 'goldenrod',
//                       transform: 'translateY(-5px)'
//                     }
//                   }}
//                 >
//                   {social.icon}
//                 </IconButton>
//               ))}
//             </Box>
//             <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
//               © {new Date().getFullYear()} My Shopping Store. All rights reserved.
//             </Typography>
//           </motion.div>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

// import React from "react";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import { Box, Typography } from "@mui/material";
// const Footer = () => {
//   return (
//     <>
//       <Box
//         sx={{ textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3 }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 'bold',
//             "@media (max-width:600px)": {
//               fontSize: "1rem",
//             },
//           }}
//         >
//           FOLLOW US ON
//         </Typography>
//         <Box
//           sx={{
//             my: 3,
//             "& svg": {
//               fontSize: "60px",
//               cursor: "pointer",
//               mr: 2,
//             },
//             "& svg:hover": {
//               color: "goldenrod",
//               transform: "translateX(5px)",
//               transition: "all 400ms",
//             },
//           }}
//         >
//           {/* icons */}
//           <InstagramIcon />
//           <TwitterIcon />
//           <GitHubIcon />
//           <YouTubeIcon />
//         </Box>
//         <Typography
//           variant="h5"
//           sx={{
//             "@media (max-width:600px)": {
//               fontSize: "1rem",
//             },
//           }}
//         >
//           All Rights Reserved &copy; 2025
//         </Typography>
//       </Box>
//     </>
//   );
// };

// export default Footer;

// import React from "react";
// import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import { motion } from "framer-motion";

// const Footer = () => {
//   const footerLinks = {
//     "Quick Links": ["Home", "About", "Products", "Contact"],
//     "Customer Service": ["FAQ", "Shipping", "Returns", "Track Order"],
//     "Our Policies": ["Privacy Policy", "Terms of Service", "Refund Policy"]
//   };

//   const socialLinks = [
//     { icon: <FacebookIcon />, url: "https://facebook.com" },
//     { icon: <InstagramIcon />, url: "https://instagram.com" },
//     { icon: <TwitterIcon />, url: "https://twitter.com" },
//     { icon: <LinkedInIcon />, url: "https://linkedin.com" },
//     { icon: <YouTubeIcon />, url: "https://youtube.com" },
//     { icon: <GitHubIcon />, url: "https://github.com" }
//   ];

//   return (
//     <Box
//       component="footer"
//       sx={{
//         bgcolor: "#1A1A19",
//         color: "white",
//         pt: 6,
//         pb: 3,
//         mt: "auto"
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
//           {/* Company Info */}
//           <Grid item xs={12} md={4}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Typography variant="h6" gutterBottom>
//                 About Our Store
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 2 }}>
//                 We are committed to providing our customers with the best shopping
//                 experience and quality products at competitive prices.
//               </Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <LocationOnIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
//                 <Typography variant="body2">
//                   123 Shopping Street, NY 10001
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <PhoneIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
//                 <Typography variant="body2">+1 (555) 123-4567</Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <EmailIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
//                 <Typography variant="body2">contact@store.com</Typography>
//               </Box>
//             </motion.div>
//           </Grid>

//           {/* Quick Links */}
//           {Object.entries(footerLinks).map(([title, links], index) => (
//             <Grid item xs={12} sm={6} md={2} key={title}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <Typography variant="h6" gutterBottom>
//                   {title}
//                 </Typography>
//                 {links.map((link) => (
//                   <Link
//                     key={link}
//                     href="#"
//                     color="inherit"
//                     sx={{
//                       display: 'block',
//                       mb: 1,
//                       textDecoration: 'none',
//                       '&:hover': {
//                         color: 'goldenrod',
//                         transform: 'translateX(5px)',
//                         transition: 'all 0.3s ease'
//                       }
//                     }}
//                   >
//                     {link}
//                   </Link>
//                 ))}
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Social Links */}
//         <Box
//           sx={{
//             mt: 4,
//             pt: 3,
//             borderTop: '1px solid rgba(255, 255, 255, 0.1)',
//             textAlign: 'center'
//           }}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Follow Us
//             </Typography>
//             <Box sx={{ mb: 2 }}>
//               {socialLinks.map((social, index) => (
//                 <IconButton
//                   key={index}
//                   component="a"
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   sx={{
//                     color: 'white',
//                     mx: 1,
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       color: 'goldenrod',
//                       transform: 'translateY(-5px)'
//                     }
//                   }}
//                 >
//                   {social.icon}
//                 </IconButton>
//               ))}
//             </Box>
//             <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
//               © {new Date().getFullYear()} My Shopping Store. All rights reserved.
//             </Typography>
//           </motion.div>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

// import React from "react";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import { Box, Typography } from "@mui/material";
// const Footer = () => {
//   return (
//     <>
//       <Box
//         sx={{ textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3 }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 'bold',
//             "@media (max-width:600px)": {
//               fontSize: "1rem",
//             },
//           }}
//         >
//           FOLLOW US ON
//         </Typography>
//         <Box
//           sx={{
//             my: 3,
//             "& svg": {
//               fontSize: "60px",
//               cursor: "pointer",
//               mr: 2,
//             },
//             "& svg:hover": {
//               color: "goldenrod",
//               transform: "translateX(5px)",
//               transition: "all 400ms",
//             },
//           }}
//         >
//           {/* icons */}
//           <InstagramIcon />
//           <TwitterIcon />
//           <GitHubIcon />
//           <YouTubeIcon />
//         </Box>
//         <Typography
//           variant="h5"
//           sx={{
//             "@media (max-width:600px)": {
//               fontSize: "1rem",
//             },
//           }}
//         >
//           All Rights Reserved &copy; 2025
//         </Typography>
//       </Box>
//     </>
//   );
// };

// export default Footer;
