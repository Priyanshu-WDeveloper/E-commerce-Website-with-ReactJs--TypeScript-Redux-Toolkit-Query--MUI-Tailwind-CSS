import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Container,
  Button,
  Badge,
} from "@mui/material";
import Logo from "../../images/shop_15016304.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";
import "../../styles/HeadStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toggleStatusTab } from "../../reducers/cart";

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  // console.log(totalQuantity);

  const carts = useSelector((store: RootState) => store.cart.items);
  const dispatch = useDispatch();
  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Shop", path: "/menu" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background:
            location.pathname === "/" && !isScrolled
              ? "transparent"
              : "rgba(0, 0, 0, 0.8)",
          transition: "background 0.3s ease",
          color: "white",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: "70px" }}>
            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { sm: "none" },
                color: "white",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: { xs: 1, sm: 0 },
                mr: { sm: 4 },
              }}
            >
              <img
                src={Logo}
                alt="logo"
                style={{
                  height: "40px",
                  width: "auto",
                  marginRight: "10px",
                }}
              />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600,
                  letterSpacing: "1px",
                }}
              >
                My Shopping
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexGrow: 1,
                gap: "20px",
                justifyContent: "center",
                backgroundColor: "transparent",
                padding: "8px",
                borderRadius: "30px",
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "1rem",
                    padding: "6px 16px",
                    borderRadius: "25px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      transform: "translateY(-2px)",
                    },
                    "&.active": {
                      background: "rgba(218, 165, 32, 0.2)",
                      border: "1px solid goldenrod",
                      color: "goldenrod",
                    },
                  }}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* Cart Icon */}
            <IconButton
              onClick={handleOpenTabCart}
              sx={{
                color: "white",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  transform: "translateY(-2px)",
                  color: "goldenrod",
                },
              }}
            >
              {/* <MailIcon color="" /> */}
              {/* <IconButton onCllick={handleOpenTabCart}> */}
              {/* <Box onCllick={handleOpenTabCart}> */}
              <Badge badgeContent={totalQuantity} color="success">
                <ShoppingCartIcon />
              </Badge>
              {/* </Box> */}
            </IconButton>
            {/* </IconButton> */}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(10px)",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              mb: 2,
              color: "white",
              "&:hover": {
                color: "goldenrod",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "25px",
                  padding: "10px 20px",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "goldenrod",
                  },
                  "&.active": {
                    background: "rgba(218, 165, 32, 0.2)",
                    border: "1px solid goldenrod",
                    color: "goldenrod",
                  },
                }}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;

// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Box,
//   Drawer,
//   IconButton,
//   Toolbar,
//   Typography,
//   Container,
//   Button,
// } from "@mui/material";
// import Logo from "../../images/shop_15016304.png";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { Link, useLocation } from "react-router-dom";
// import "../../styles/HeadStyles.css";

// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const menuItems = [
//     { text: "Home", path: "/" },
//     { text: "Shop", path: "/menu" },
//     { text: "About", path: "/about" },
//     { text: "Contact", path: "/contact" },
//   ];

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar
//         position="fixed"
//         className={`transparent-header ${isScrolled ? 'scrolled' : ''}`}
//         elevation={0}
//         sx={{
//           background: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
//           backdropFilter: isScrolled ? 'blur(10px)' : 'none',
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar disableGutters sx={{ minHeight: '70px' }}>
//             {/* Mobile Menu Icon */}
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{
//                 display: { sm: "none" },
//                 color: 'white',
//                 '&:hover': {
//                   background: 'rgba(255, 255, 255, 0.1)',
//                 }
//               }}
//             >
//               <MenuIcon />
//             </IconButton>

//             {/* Logo */}
//             <Box sx={{
//               display: 'flex',
//               alignItems: 'center',
//               flexGrow: { xs: 1, sm: 0 },
//               mr: { sm: 4 }
//             }}>
//               <img
//                 src={Logo}
//                 alt="logo"
//                 style={{
//                   height: '40px',
//                   width: 'auto',
//                   marginRight: '10px'
//                 }}
//               />
//               <Typography
//                 variant="h6"
//                 component={Link}
//                 to="/"
//                 sx={{
//                   color: 'white',
//                   textDecoration: 'none',
//                   fontWeight: 600,
//                   letterSpacing: '1px'
//                 }}
//               >
//                 My Shopping
//               </Typography>
//             </Box>

//             {/* Desktop Navigation */}
//             <Box sx={{
//               display: { xs: 'none', sm: 'flex' },
//               flexGrow: 1,
//               gap: '20px',
//               justifyContent: 'center',
//               backgroundColor: location.pathname !== '/' ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
//               padding: '8px',
//               borderRadius: '30px',
//             }}>
//               {menuItems.map((item) => (
//                 <Button
//                   key={item.text}
//                   component={Link}
//                   to={item.path}
//                   sx={{
//                     color: 'white',
//                     textTransform: 'none',
//                     fontSize: '1rem',
//                     padding: '6px 16px',
//                     borderRadius: '25px',
//                     background: 'rgba(255, 255, 255, 0.1)',
//                     backdropFilter: 'blur(5px)',
//                     border: '1px solid rgba(255, 255, 255, 0.2)',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       background: 'rgba(255, 255, 255, 0.2)',
//                       border: '1px solid rgba(255, 255, 255, 0.3)',
//                       transform: 'translateY(-2px)',
//                     },
//                     '&.active': {
//                       background: 'rgba(218, 165, 32, 0.2)',
//                       border: '1px solid goldenrod',
//                       color: 'goldenrod',
//                     }
//                   }}
//                   className={location.pathname === item.path ? 'active' : ''}
//                 >
//                   {item.text}
//                 </Button>
//               ))}
//             </Box>

//             {/* Cart Icon */}
//             <IconButton
//               sx={{
//                 color: 'white',
//                 background: 'rgba(255, 255, 255, 0.1)',
//                 backdropFilter: 'blur(5px)',
//                 border: '1px solid rgba(255, 255, 255, 0.2)',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   background: 'rgba(255, 255, 255, 0.2)',
//                   border: '1px solid rgba(255, 255, 255, 0.3)',
//                   transform: 'translateY(-2px)',
//                   color: 'goldenrod'
//                 }
//               }}
//             >
//               <ShoppingCartIcon />
//             </IconButton>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="left"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: 240,
//             background: 'rgba(0, 0, 0, 0.9)',
//             backdropFilter: 'blur(10px)',
//             color: 'white'
//           }
//         }}
//       >
//         <Box sx={{ p: 2 }}>
//           <IconButton
//             onClick={handleDrawerToggle}
//             sx={{
//               mb: 2,
//               color: 'white',
//               '&:hover': {
//                 color: 'goldenrod'
//               }
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             {menuItems.map((item) => (
//               <Button
//                 key={item.text}
//                 component={Link}
//                 to={item.path}
//                 onClick={handleDrawerToggle}
//                 sx={{
//                   color: 'white',
//                   justifyContent: 'flex-start',
//                   textTransform: 'none',
//                   background: 'rgba(255, 255, 255, 0.1)',
//                   backdropFilter: 'blur(5px)',
//                   border: '1px solid rgba(255, 255, 255, 0.2)',
//                   borderRadius: '25px',
//                   padding: '10px 20px',
//                   '&:hover': {
//                     background: 'rgba(255, 255, 255, 0.2)',
//                     border: '1px solid rgba(255, 255, 255, 0.3)',
//                     color: 'goldenrod'
//                   },
//                   '&.active': {
//                     background: 'rgba(218, 165, 32, 0.2)',
//                     border: '1px solid goldenrod',
//                     color: 'goldenrod',
//                   }
//                 }}
//                 className={location.pathname === item.path ? 'active' : ''}
//               >
//                 {item.text}
//               </Button>
//             ))}
//           </Box>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// };

// export default Header;
