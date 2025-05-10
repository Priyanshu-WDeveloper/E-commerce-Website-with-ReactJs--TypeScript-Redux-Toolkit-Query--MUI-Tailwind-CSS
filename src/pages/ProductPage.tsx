import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}
const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  // console.log("Product ID", id);

  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null); //! null

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log(`Error fectching Product Data: ${error}`);
        });
    }
  }, [id]);

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  if (!product) {
    // return <Typography variant="h1">Loading</Typography>
    return (
      <>
        {/* <Button onClick={() => setBackdropOpen(true)}>Simulate Loading</Button> */}

        {/* Render the SimpleBackdrop component */}
        {/* <SimpleBackdrop open={isBackdropOpen} onClose={handleCloseBackdrop} /> */}
        {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
  return (
    <>
      {/* <Box className=' p-5 w-[60%] '>
            <Button
                        variant="contained"
                        sx={{ backgroundColor: 'black' }}
                        onClick={() => navigate(-1)}
                        className='mb-5 px-4 py-2 bg-black text-white rounded-full '
                    >Back</Button>


                    <img src={product.images[0]} alt={product.title} className='w-[50%] h-auto mb-5' />
                    <Typography variant="h4" className="text-2xl mb-4 font-bold">{product.title}</Typography>
                    <Typography variant="body2" className="mb-4 text-gray-700 w-[70%] ">{product.description}</Typography>
                    <Box className="flex">
                        <Typography>Price: ${product.price}</Typography>
                        <Typography className="ml-10">Rating: {product.rating}</Typography>
                    </Box>
                </Box> */}

      {/* <Box className="w-[100%] h-[30%] p-5 mt-6"> */}
      <Box className="w-[100%]  p-5 mt-6">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            marginBottom: "30px",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
          onClick={() => navigate(-1)}
          className="mb-5 px-4 py-2 bg-black text-white rounded-full"
        >
          Back
        </Button>
        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                maxWidth: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                // position: "fixed",
                // width: "550px",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{
                    height: "400px",
                    width: "100%",
                    // height: "100%",
                    objectFit: "contain",
                    padding: "20px",
                    backgroundColor: "#f8f9fa",
                  }}
                  image={product.images[0]}
                  alt={product.title}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ padding: "20px" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "12px",
                  }}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    marginBottom: "16px",
                  }}
                >
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "12px",
                  padding: "16px 20px 20px",
                  borderTop: "1px solid #eee",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    padding: "8px 24px",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  Price: ${product.price}
                </Button>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                    sx={{ color: "#faaf00" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      marginLeft: "8px",
                    }}
                  >
                    ({product.rating})
                  </Typography>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* <Box className='w-[100%] h-[30%]  p-5'>
            <Button
                variant="contained"
                sx={{ backgroundColor: 'black', marginBottom: '30px' }}
                onClick={() => navigate(-1)}
                className='mb-5 px-4 py-2 bg-black text-white rounded-full '
            >Back</Button>

            <Card >

                <CardActionArea>
                    <CardMedia
                        component="img"
                        // sx={{ height: '460px' }}
                        image={product.images[0]}
                        alt={product.title}
                        className="  object-contain "
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {product.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: "flex", flexDirection: 'column', alignItems: 'start', gap: '10px' }}>
                    {/* <Button size="small" color="primary">
                    Share
                    </Button> */}
      {/* <Typography>Price: ${product.price}</Typography> */}
    </>
  );
};

export default ProductPage;
