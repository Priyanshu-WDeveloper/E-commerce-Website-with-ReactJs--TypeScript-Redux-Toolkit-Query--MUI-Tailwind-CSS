import Slider from "react-slick";
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import { ShoppingCartIcon } from "lucide-react";
import OrderButton from "../components/Buttons/OrderButton";
import { ArrowBack } from "@mui/icons-material";

const images = [
  {
    id: 1,
    url: "/slider/slider1.jpg",
    title: "Summer Exclusives – Up to 70% Off",
  },
  {
    id: 2,
    url: "/slider/slider2.jpg",
    title: "Elite Tech Deals – Limited Time Only",
  },
  {
    id: 3,
    url: "/slider/slider3.jpg",
    title: "Step Into Style – This Season’s Must-Haves",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
    dots: false,
  };
  const categorySliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // tablet & below
        settings: {
          slidesToShow: 2,
          // arrows: true,
        },
      },
      {
        breakpoint: 600, // mobile
        settings: {
          slidesToShow: 1,
          arrows: false,
          swipeToSlide: true,
        },
      },
    ],
  };
  const categories = [
    {
      name: "Electronics",
      img: "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Fashion",
      img: "https://plus.unsplash.com/premium_photo-1683817138481-dcdf64a40859?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Home & Kitchen",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Beauty & Personal Care",
      img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sports & Fitness",
      img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Books & Stationery",
      img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: "#f4f6f8", mt: 8 }}>
        {/* Hero Slider */}
        <Box sx={{ position: "relative" }}>
          <Slider {...settings}>
            {images.map((slide) => (
              <Box
                key={slide.id}
                sx={{
                  width: "100%",
                  height: { xs: "300px", md: "680px" },
                  // height: { xs: "300px", md: "600px" },
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={slide.url}
                  alt={slide.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h2"
                      component="h2"
                      color="white"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {slide.title}
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
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Welcome Section */}
        <Container sx={{ py: 10, textAlign: "center" }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome to EverBasket
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto", mb: 3 }}
          >
            Discover top deals on electronics, fashion, and everyday essentials.
            Swift delivery. Trusted, secure checkout.
          </Typography>
          <OrderButton onClick={() => navigate("/menu")}>Shop Now</OrderButton>
        </Container>

        {/* Featured Categories */}
        <Container sx={{ pb: 10 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Featured Categories
          </Typography>

          <Slider {...categorySliderSettings}>
            {categories.map((category) => (
              <Box key={category.name} sx={{ px: 1 }}>
                <Card
                  sx={{
                    height: "100%",
                    // height: "500px",
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={category.img}
                    alt={category.name}
                    // height="180px"
                    sx={{ objectFit: "cover", height: "300px" }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {category.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <OrderButton
                      sx={{
                        margin: "auto",
                        // mb: 2,
                        // display: "flex",
                        // justifyContent: "center",
                        // width: "100%",
                      }}
                      onClick={() => navigate("/menu")}
                    >
                      Shop Now
                    </OrderButton>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>
    </>
  );
};

export default Home;

// import Layout from "../components/Layout/Layout";
// import { NavLink } from "react-router-dom";
// import Back from "../images/—Pngtree—3d rendered e commerce illustration_5800101.jpg";
// import "../styles/HomeStyles.css";
// import { Button, Box, Typography, Container } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Header from "../components/Layout/Header";

// const Home = () => {
//   return (
//     <>
//       {/* <Layout> */}
//       <Header />
//       <Box
//         className="home-container"
//         sx={{
//           width: "100%",
//           height: "100vh",
//           position: "relative",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${Back})`,
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             zIndex: -1,
//           },
//         }}
//       >
//         <Container maxWidth={false} sx={{ height: "100%", padding: 0 }}>
//           <Box
//             className="content-wrapper"
//             sx={{
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               color: "white",
//             }}
//           >
//             <Typography
//               variant="h1"
//               style={{
//                 textShadow: `
// 1px 1px 2px red,
//   0 0 1em blue,
//   0 0 0.2em blue`,
//               }}
//               sx={{
//                 fontSize: { xs: "2.5rem", md: "4rem" },
//                 fontWeight: "bold",
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
//                 mb: 2,
//               }}
//             >
//               Welcome to Our Store
//             </Typography>

//             <Typography
//               variant="h4"
//               style={{
//                 textShadow: `
// 1px 1px 2px red,
//   0 0 1em blue,
//   0 0 0.2em blue`,
//               }}
//               sx={{
//                 fontSize: { xs: "1.5rem", md: "2rem" },
//                 textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
//                 mb: 4,
//               }}
//             >
//               Discover Amazing Products
//             </Typography>

//             <NavLink to="/menu" style={{ textDecoration: "none" }}>
//               <Button
//                 variant="contained"
//                 startIcon={<ShoppingCartIcon />}
//                 sx={{
//                   background: "rgba(255, 255, 255, 0.15)",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(255, 255, 255, 0.3)",
//                   borderRadius: "30px",
//                   padding: "15px 40px",
//                   fontSize: "1.2rem",
//                   color: "white",
//                   textTransform: "none",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     background: "rgba(255, 255, 255, 0.25)",
//                     transform: "translateY(-5px)",
//                     boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
//                   },
//                   position: "relative",
//                   overflow: "hidden",
//                   "&::before": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     background:
//                       "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
//                     transform: "translateX(-100%)",
//                     transition: "transform 0.6s ease",
//                   },
//                   "&:hover::before": {
//                     transform: "translateX(100%)",
//                   },
//                 }}
//               >
//                 Shop Now
//               </Button>
//             </NavLink>
//           </Box>
//         </Container>
//       </Box>
//       {/* </Layout> */}
//     </>
//   );
// };

// export default Home;

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

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Button,
//   TextField,
//   InputAdornment,
//   Chip,
//   Skeleton,
//   Fade,
//   Zoom,
//   IconButton,
//   Rating,
//   Badge,
//   Fab,
//   Backdrop,
//   CircularProgress,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   ShoppingCart as CartIcon,
//   Favorite as FavoriteIcon,
//   FavoriteBorder as FavoriteBorderIcon,
//   Visibility as ViewIcon,
//   TrendingUp as TrendingIcon,
//   LocalOffer as OfferIcon,
//   Star as StarIcon,
// } from "@mui/icons-material";
// import { useTheme } from "@mui/material/styles";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "framer-motion";

// const Home: React.FC = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // State management
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [favorites, setFavorites] = useState<number[]>([]);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Mock data - replace with actual data fetching
//   const categories = [
//     "all",
//     "electronics",
//     "clothing",
//     "books",
//     "home",
//     "sports",
//   ];
//   const featuredProducts = [
//     {
//       id: 1,
//       name: "Premium Wireless Headphones",
//       price: 299.99,
//       originalPrice: 399.99,
//       image: "/api/placeholder/300/300",
//       rating: 4.8,
//       reviews: 1250,
//       category: "electronics",
//       isNew: true,
//       discount: 25,
//     },
//     {
//       id: 2,
//       name: "Smart Fitness Watch",
//       price: 199.99,
//       originalPrice: 249.99,
//       image: "/api/placeholder/300/300",
//       rating: 4.6,
//       reviews: 890,
//       category: "electronics",
//       isNew: false,
//       discount: 20,
//     },
//     // Add more mock products...
//   ];

//   useEffect(() => {
//     // Simulate loading
//     const timer = setTimeout(() => {
//       setProducts(featuredProducts);
//       setLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleAddToCart = (product: any) => {
//     // Add to cart logic
//     setSnackbar({
//       open: true,
//       message: `${product.name} added to cart!`,
//       severity: "success",
//     });
//   };

//   const handleToggleFavorite = (productId: number) => {
//     setFavorites((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const filteredProducts = products.filter((product: any) => {
//     const matchesSearch = product.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const HeroSection = () => (
//     <Box
//       sx={{
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
//         py: { xs: 8, md: 12 },
//         mb: 6,
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <Typography
//                 variant="h2"
//                 component="h1"
//                 sx={{
//                   fontWeight: 700,
//                   mb: 2,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: "2.5rem", md: "3.5rem" },
//                 }}
//               >
//                 Discover Amazing Products
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   mb: 4,
//                   color: "text.secondary",
//                   lineHeight: 1.6,
//                   fontSize: { xs: "1.1rem", md: "1.25rem" },
//                 }}
//               >
//                 Shop the latest trends with unbeatable prices and premium
//                 quality. Your perfect product is just a click away.
//               </Typography>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   startIcon={<TrendingIcon />}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: 3,
//                     textTransform: "none",
//                     fontSize: "1.1rem",
//                     boxShadow: theme.shadows[8],
//                   }}
//                 >
//                   Shop Now
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   size="large"
//                   startIcon={<OfferIcon />}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: 3,
//                     textTransform: "none",
//                     fontSize: "1.1rem",
//                   }}
//                 >
//                   View Offers
//                 </Button>
//               </Box>
//             </motion.div>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <Box
//                 sx={{
//                   position: "relative",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src="/api/placeholder/500/400"
//                   alt="Hero Product"
//                   sx={{
//                     width: "100%",
//                     maxWidth: 500,
//                     height: "auto",
//                     borderRadius: 4,
//                     boxShadow: theme.shadows[20],
//                   }}
//                 />
//               </Box>
//             </motion.div>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );

//   const SearchAndFilter = () => (
//     <Container maxWidth="lg" sx={{ mb: 4 }}>
//       <Grid container spacing={3} alignItems="center">
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 3,
//                 backgroundColor: "background.paper",
//                 boxShadow: theme.shadows[2],
//               },
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box
//             sx={{
//               display: "flex",
//               gap: 1,
//               flexWrap: "wrap",
//               justifyContent: { xs: "flex-start", md: "flex-end" },
//             }}
//           >
//             {categories.map((category) => (
//               <Chip
//                 key={category}
//                 label={category.charAt(0).toUpperCase() + category.slice(1)}
//                 onClick={() => setSelectedCategory(category)}
//                 variant={selectedCategory === category ? "filled" : "outlined"}
//                 color={selectedCategory === category ? "primary" : "default"}
//                 sx={{
//                   textTransform: "capitalize",
//                   borderRadius: 2,
//                   "&:hover": {
//                     transform: "translateY(-2px)",
//                     transition: "transform 0.2s ease",
//                   },
//                 }}
//               />
//             ))}
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );

//   const ProductCard = ({ product, index }: { product: any; index: number }) => (
//     <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.1 }}
//       >
//         <Card
//           sx={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             borderRadius: 3,
//             boxShadow: theme.shadows[4],
//             transition: "all 0.3s ease",
//             "&:hover": {
//               transform: "translateY(-8px)",
//               boxShadow: theme.shadows[12],
//             },
//             position: "relative",
//             overflow: "visible",
//           }}
//         >
//           {product.isNew && (
//             <Chip
//               label="NEW"
//               color="secondary"
//               size="small"
//               sx={{
//                 position: "absolute",
//                 top: 12,
//                 left: 12,
//                 zIndex: 1,
//                 fontWeight: 600,
//               }}
//             />
//           )}
//           {product.discount > 0 && (
//             <Chip
//               label={`-${product.discount}%`}
//               color="error"
//               size="small"
//               sx={{
//                 position: "absolute",
//                 top: 12,
//                 right: 12,
//                 zIndex: 1,
//                 fontWeight: 600,
//               }}
//             />
//           )}

//           <Box sx={{ position: "relative" }}>
//             <CardMedia
//               component="img"
//               height="240"
//               image={product.image}
//               alt={product.name}
//               sx={{
//                 transition: "transform 0.3s ease",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                 },
//               }}
//             />
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 right: 0,
//                 p: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 1,
//               }}
//             >
//               <IconButton
//                 size="small"
//                 onClick={() => handleToggleFavorite(product.id)}
//                 sx={{
//                   backgroundColor: "rgba(255, 255, 255, 0.9)",
//                   "&:hover": {
//                     backgroundColor: "rgba(255, 255, 255, 1)",
//                     transform: "scale(1.1)",
//                   },
//                 }}
//               >
//                 {favorites.includes(product.id) ? (
//                   <FavoriteIcon color="error" />
//                 ) : (
//                   <FavoriteBorderIcon />
//                 )}
//               </IconButton>
//               <IconButton
//                 size="small"
//                 sx={{
//                   backgroundColor: "rgba(255, 255, 255, 0.9)",
//                   "&:hover": {
//                     backgroundColor: "rgba(255, 255, 255, 1)",
//                     transform: "scale(1.1)",
//                   },
//                 }}
//               >
//                 <ViewIcon />
//               </IconButton>
//             </Box>
//           </Box>

//           <CardContent sx={{ flexGrow: 1, p: 2 }}>
//             <Typography
//               variant="h6"
//               component="h3"
//               sx={{
//                 fontWeight: 600,
//                 mb: 1,
//                 fontSize: "1.1rem",
//                 lineHeight: 1.3,
//                 display: "-webkit-box",
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: "vertical",
//                 overflow: "hidden",
//               }}
//             >
//               {product.name}
//             </Typography>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//               <Rating
//                 value={product.rating}
//                 precision={0.1}
//                 size="small"
//                 readOnly
//                 sx={{ mr: 1 }}
//               />
//               <Typography variant="body2" color="text.secondary">
//                 ({product.reviews})
//               </Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
//                 ${product.price}
//               </Typography>
//               {product.originalPrice > product.price && (
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     textDecoration: "line-through",
//                     color: "text.secondary",
//                   }}
//                 >
//                   ${product.originalPrice}
//                 </Typography>
//               )}
//             </Box>
//           </CardContent>

//           <CardActions sx={{ p: 2, pt: 0 }}>
//             <Button
//               fullWidth
//               variant="contained"
//               startIcon={<CartIcon />}
//               onClick={() => handleAddToCart(product)}
//               sx={{
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: 600,
//                 py: 1,
//               }}
//             >
//               Add to Cart
//             </Button>
//           </CardActions>
//         </Card>
//       </motion.div>
//     </Grid>
//   );

//   const ProductSkeleton = () => (
//     <Grid item xs={12} sm={6} md={4} lg={3}>
//       <Card sx={{ height: "100%", borderRadius: 3 }}>
//         <Skeleton variant="rectangular" height={240} />
//         <CardContent>
//           <Skeleton variant="text" height={32} />
//           <Skeleton variant="text" height={24} width="60%" />
//           <Skeleton variant="text" height={28} width="40%" />
//         </CardContent>
//         <CardActions sx={{ p: 2 }}>
//           <Skeleton
//             variant="rectangular"
//             width="100%"
//             height={40}
//             sx={{ borderRadius: 2 }}
//           />
//         </CardActions>
//       </Card>
//     </Grid>
//   );

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
//       <HeroSection />
//       <SearchAndFilter />

//       <Container maxWidth="lg" sx={{ pb: 8 }}>
//         <Typography
//           variant="h4"
//           component="h2"
//           sx={{
//             fontWeight: 700,
//             mb: 4,
//             textAlign: "center",
//             color: "text.primary",
//           }}
//         >
//           Featured Products
//         </Typography>

//         <Grid container spacing={3}>
//           {loading
//             ? Array.from(new Array(8)).map((_, index) => (
//                 <ProductSkeleton key={index} />
//               ))
//             : filteredProducts.map((product, index) => (
//                 <ProductCard key={product.id} product={product} index={index} />
//               ))}
//         </Grid>

//         {!loading && filteredProducts.length === 0 && (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <SearchIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
//             <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
//               No products found
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Try adjusting your search or filter criteria
//             </Typography>
//           </Box>
//         )}
//       </Container>

//       {/* Floating Action Button */}
//       <Fab
//         color="primary"
//         sx={{
//           position: "fixed",
//           bottom: 24,
//           right: 24,
//           zIndex: 1000,
//         }}
//       >
//         <Badge badgeContent={4} color="error">
//           <CartIcon />
//         </Badge>
//       </Fab>

//       {/* Loading Backdrop */}
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={loading}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity as any}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Home;
