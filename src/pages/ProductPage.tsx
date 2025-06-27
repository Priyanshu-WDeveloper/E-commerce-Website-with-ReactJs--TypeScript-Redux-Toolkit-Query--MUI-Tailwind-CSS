import {
  Box,
  Button,
  Card,
  CardActionArea,
  // CardActions,
  // CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDataByIdQuery } from "../services/ProductData";
import LoadingBackdrop from "../components/Backdrop";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cart";
import { showToast } from "../helpers/toast";
import OrderButton from "../components/Buttons/OrderButton";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [fetchCategories] = useLazyGetCategoryListQuery();

  const {
    data: response,
    isLoading,
    error,
  } = useGetProductDataByIdQuery({ id } as { id: string });
  // } = useGetProductDataByIdQuery(id ?? skipToken);
  // console.log(response);
  // console.log(response);

  if (isLoading) return <LoadingBackdrop />;

  if (error || !response)
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          Error loading product or product not found.
        </Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );

  const product = response.data;

  const handleAddToCart = () => {
    showToast("Added to Cart Successfully");
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        brand: product.brand,
        returnPolicy: product.returnPolicy || "Standard Return Policy",
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
        quantity: 1,
        // rating
      })
    );
  };
  const handleBuy = () => {
    showToast("Added to Cart Successfully");
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        brand: product.brand,
        returnPolicy: product.returnPolicy || "Standard Return Policy",
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
        quantity: 1,
        // rating
      })
    );
    navigate("/checkout/cart");
  };
  return (
    <Box className="w-full p-5">
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          // marginBottom: "30px",
          marginBottom: "5px",
          marginTop: "-30px",
          "&:hover": { backgroundColor: "#333" },
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Grid container spacing={3}>
        {/* Left side: Images */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image={product.thumbnail}
                alt={product.title}
                sx={{
                  height: 400,
                  objectFit: "contain",
                  padding: "20px",
                  backgroundColor: "#f8f9fa",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </CardActionArea>
          </Card>
          {/* Thumbnail gallery */}
          <Stack direction="row" spacing={1} mt={2}>
            {product.images.map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={`${product.title} thumbnail ${idx + 1}`}
                sx={{
                  height: 80,
                  width: 80,
                  objectFit: "contain",
                  borderRadius: 1,
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  "&:hover": { borderColor: "black" },
                }}
              />
            ))}
          </Stack>
          <Stack direction="column" spacing={1} mt={2}>
            {/* <Button
              onClick={handleAddToCart}
              sx={{
                backgroundColor: "black",
                color: "white",
                width: "250px",
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                fontWeight: 800,
                marginBottom: "4px",
                marginTop: "10px",
                padding: "10px",
                ":hover": {
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                },
              }}
            >
              Add to Cart
            </Button> */}
            <OrderButton onClick={handleAddToCart}>Add to Cart</OrderButton>
            <OrderButton onClick={handleBuy}>Buy</OrderButton>
            {/* <Button
              onClick={handleBuy}
              sx={{
                backgroundColor: "black",
                color: "white",
                width: "250px",
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                fontWeight: 800,
                padding: "10px",
                ":hover": {
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                },
              }}
            >
              Buy
            </Button> */}
          </Stack>
        </Grid>

        {/* Right side: Details */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 3 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Category:</strong> {product.category}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Brand:</strong> {product.brand}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Availability:</strong> {product.availabilityStatus}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Price:</strong>
              <span className="rounded-[24px] bg-gray-500 text-white font-bold ml-1 p-1.5">
                ${product.price}{" "}
              </span>
              {product.discountPercentage > 0 && (
                <Typography
                  component="span"
                  color="error"
                  sx={{ marginLeft: 1, fontWeight: "bold" }}
                >
                  ({product.discountPercentage}% OFF)
                </Typography>
              )}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Rating
                value={product.rating || 0}
                precision={0.5}
                readOnly
                sx={{ color: "#faaf00" }}
              />
              <Typography>({product.rating})</Typography>
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Return Policy:</strong> {product.returnPolicy}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Warranty:</strong> {product.warrantyInformation}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Shipping Info:</strong> {product.shippingInformation}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>SKU:</strong> {product.sku}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Stock:</strong> {product.stock}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Minimum Order Quantity:</strong>{" "}
              {product.minimumOrderQuantity}
            </Typography>

            {/* {product.weight && (
              <Typography variant="subtitle1" gutterBottom>
                <strong>Weight:</strong>{" "}
                {formatProductWeight(product.weight, product.category)}
              </Typography>
            )} */}

            <Typography variant="subtitle1" gutterBottom>
              <strong>Dimensions (W×H×D):</strong>{" "}
              {`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
            </Typography>

            {/* Tags */}
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {product.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" />
              ))}
            </Stack>

            {/* Meta info */}
            <Box mt={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Created At:{" "}
                {new Date(product.meta.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Updated At:{" "}
                {new Date(product.meta.updatedAt).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Barcode: {product.meta.barcode}
              </Typography>
              <Box
                component="img"
                src={product.meta.qrCode}
                alt="QR Code"
                sx={{ mt: 1, height: 100, width: 100 }}
              />
            </Box>

            {/* Reviews count */}
            <Typography variant="subtitle1" mt={3}>
              <strong>Reviews:</strong> {product.reviews.length}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;

// import {
//   Backdrop,
//   Box,
//   Button,
//   Card,
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Grid,
//   Rating,
//   Typography,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ProductData } from "../types/productTypes";
// import {
//   useGetProductDataByIdQuery,
//   useLazyGetProductDataByIdQuery,
// } from "../services/ProductData";
// import { skipToken } from "@reduxjs/toolkit/query";
// import CusBackdrop from "../components/Backdrop";
// import LoadingBackdrop from "../components/Backdrop";

// const ProductPage = () => {
//   const { id } = useParams<{ id: string }>();
//   console.log("Product ID", id);

//   const navigate = useNavigate();
//   const [product, setProduct] = useState<ProductData | null>(null); //! null
//   const [productData, { isLoading }] = useLazyGetProductDataByIdQuery();
//   // const { data: response, isLoading } = useGetProductDataByIdQuery(
//   //   id ? { id } : skipToken
//   // );
//   // useEffect(() => {
//   //   if (response && response.data) {
//   //     console.log(response);

//   //     setProduct(response.data);
//   //   }
//   // }, [response]);
//   const getProductData = async () => {
//     try {
//       const response = await productData({ id } as { id: string });
//       console.log(response.data);
//       // if (response && response.data) {
//       setProduct(response?.data);
//       // }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // getProductData();
//   const [open, setOpen] = useState(true);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   useEffect(() => {
//     getProductData();
//   }, []);
//   if (!product) {
//     return (
//       <Backdrop
//         sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
//         open={open}
//         onClick={handleClose}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     );
//   }
//   return isLoading ? (
//     <LoadingBackdrop />
//   ) : (
//     <>
//       {/* <Box className=' p-5 w-[60%] '>
//             <Button
//                         variant="contained"
//                         sx={{ backgroundColor: 'black' }}
//                         onClick={() => navigate(-1)}
//                         className='mb-5 px-4 py-2 bg-black text-white rounded-full '
//                     >Back</Button>

//                     <img src={product.images[0]} alt={product.title} className='w-[50%] h-auto mb-5' />
//                     <Typography variant="h4" className="text-2xl mb-4 font-bold">{product.title}</Typography>
//                     <Typography variant="body2" className="mb-4 text-gray-700 w-[70%] ">{product.description}</Typography>
//                     <Box className="flex">
//                         <Typography>Price: ${product.price}</Typography>
//                         <Typography className="ml-10">Rating: {product.rating}</Typography>
//                     </Box>
//                 </Box> */}

//       {/* <Box className="w-[100%] h-[30%] p-5 mt-6"> */}
//       <Box className="w-[100%]  p-5 mt-6">
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: "black",
//             marginBottom: "30px",
//             "&:hover": {
//               backgroundColor: "#333",
//             },
//           }}
//           onClick={() => navigate(-1)}
//           className="mb-5 px-4 py-2 bg-black text-white rounded-full"
//         >
//           Back
//         </Button>
//         <Grid container spacing={1} mt={2}>
//           <Grid item xs={12} md={6}>
//             <Card
//               sx={{
//                 maxWidth: "100%",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                 backgroundColor: "#fff",
//                 // position: "fixed",
//                 // width: "550px",
//               }}
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   sx={{
//                     height: "400px",
//                     width: "100%",
//                     // height: "100%",
//                     objectFit: "contain",
//                     padding: "20px",
//                     backgroundColor: "#f8f9fa",
//                   }}
//                   image={product.images[0]}
//                   alt={product.title || "Product image"}
//                   className="transition-transform duration-300 hover:scale-105"
//                 />
//               </CardActionArea>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardContent sx={{ padding: "20px" }}>
//                 <Typography
//                   gutterBottom
//                   variant="h5"
//                   component="div"
//                   sx={{
//                     fontWeight: "600",
//                     color: "#333",
//                     marginBottom: "12px",
//                   }}
//                 >
//                   {product.title}
//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: "text.secondary",
//                     fontSize: "1rem",
//                     lineHeight: "1.6",
//                     marginBottom: "16px",
//                   }}
//                 >
//                   {product.description}
//                 </Typography>
//               </CardContent>
//               <CardActions
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "start",
//                   gap: "12px",
//                   padding: "16px 20px 20px",
//                   borderTop: "1px solid #eee",
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#1976d2",
//                     color: "white",
//                     padding: "8px 24px",
//                     "&:hover": {
//                       backgroundColor: "#1565c0",
//                     },
//                   }}
//                 >
//                   Price: ${product.price}
//                 </Button>

//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Rating
//                     name="half-rating-read"
//                     defaultValue={product.rating || 0}
//                     precision={0.5}
//                     readOnly
//                     sx={{ color: "#faaf00" }}
//                   />
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "#666",
//                       marginLeft: "8px",
//                     }}
//                   >
//                     ({product.rating})
//                   </Typography>
//                 </Box>
//               </CardActions>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* <Box className='w-[100%] h-[30%]  p-5'>
//             <Button
//                 variant="contained"
//                 sx={{ backgroundColor: 'black', marginBottom: '30px' }}
//                 onClick={() => navigate(-1)}
//                 className='mb-5 px-4 py-2 bg-black text-white rounded-full '
//             >Back</Button>

//             <Card >

//                 <CardActionArea>
//                     <CardMedia
//                         component="img"
//                         // sx={{ height: '460px' }}
//                         image={product.images[0]}
//                         alt={product.title}
//                         className="  object-contain "
//                     />
//                     <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                             {product.title}
//                         </Typography>

//                         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                             {product.description}
//                         </Typography>
//                     </CardContent>
//                 </CardActionArea>
//                 <CardActions sx={{ display: "flex", flexDirection: 'column', alignItems: 'start', gap: '10px' }}>
//                     {/* <Button size="small" color="primary">
//                     Share
//                     </Button> */}
//       {/* <Typography>Price: ${product.price}</Typography> */}
//     </>
//   );
// };

// export default ProductPage;
