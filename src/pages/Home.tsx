import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import Back from "../images/—Pngtree—3d rendered e commerce illustration_5800101.jpg";
import "../styles/HomeStyles.css";
import { Button, Box, Typography, Container } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Home = () => {
  return (
    <Layout>
      <Box
        className="home-container"
        sx={{
          width: "100%",
          height: "100vh",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${Back})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth={false} sx={{ height: "100%", padding: 0 }}>
          <Box
            className="content-wrapper"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography
              variant="h1"
              style={{
                textShadow: `
1px 1px 2px red,
  0 0 1em blue,
  0 0 0.2em blue`,
              }}
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                mb: 2,
              }}
            >
              Welcome to Our Store
            </Typography>

            <Typography
              variant="h4"
              style={{
                textShadow: `
1px 1px 2px red,
  0 0 1em blue,
  0 0 0.2em blue`,
              }}
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                mb: 4,
              }}
            >
              Discover Amazing Products
            </Typography>

            <NavLink to="/menu" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "30px",
                  padding: "15px 40px",
                  fontSize: "1.2rem",
                  color: "white",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.25)",
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  },
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.6s ease",
                  },
                  "&:hover::before": {
                    transform: "translateX(100%)",
                  },
                }}
              >
                Shop Now
              </Button>
            </NavLink>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;

// import React from "react";
// import Layout from "../components/Layout/Layout";
// import { Link, NavLink } from "react-router-dom";
// import Banner from "../images/banner.jpeg";
// import Back from "../images//back.jpg"
// import "../styles/HomeStyles.css";
// import { Button } from "@mui/material";

// const Home = () => {
//   return (
//     <Layout>
//       <div className="home" style={{ backgroundImage: `url(${Back})`, height: '100vh' }}>
//         <div className="headerContainer">
//           {/* <h1>Food Website</h1>
//           <p>Best Food In India</p> */}
//           <NavLink to="/menu"> {/*  //! /menu */}
//             {/* <button
//             >ORDER NOW</button> */}
//             <Button
//               variant="outliined"
//               style={{
//                 position: 'absolute',
//                 right: '120px',
//                 top: '370px',
//                 backgroundColor: '#0041FF',
//                 // padding: '30px',
//                 width: '260px',
//                 height: '100px',
//                 // height: '300px',
//                 borderRadius: ' 60px',
//                 fontWeight: 'bold'
//               }}
//             >ORDER NOW</Button>
//           </NavLink>
//         </div>
//       </div>
//     </Layout >
//   );
// };

// export default Home;
