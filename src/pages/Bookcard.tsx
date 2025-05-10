import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../reducers/cart";
// import { RootState } from "../app/store";
import { useToast } from "../helpers/toasts/useToast";
import { Product } from "../types/ProductTypes";

const Bookcard = (props) => {
  console.log(props);
  const {
    id,
    title,
    image,
    price,
    thumbnail,
    brand,
    returnPolicy,
    discountPercentage,
  } = props.data;
  console.log(title);

  // const carts = useSelector((store: RootState) => store.cart.items);

  const showToast = useToast();
  // const showError = useErrorToast();
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    showToast("Added to Cart Successfully");
    dispatch(
      addToCart({
        id,
        title,
        image,
        price,
        brand,
        returnPolicy,
        discountPercentage,
        thumbnail,
      })
    );
  };
  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={3}>
        <Card
          key={id}
          className="h-[280px]"
          sx={{
            width: 350,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: 6,
            },
          }}
        >
          <Link to={`/menu/product/${id}`}>
            <Box
              sx={{
                position: "relative",
                height: 200,
                overflow: "hidden",
                // "&::before": {
                //   content: '""',
                //   position: "absolute",
                //   bottom: 0,
                //   left: 0,
                //   width: "100%",
                //   height: "50%",
                //   background:
                //     "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
                //   opacity: 0,
                //   transition: "opacity 0.3s ease",
                //   zIndex: 1,
                // },
                // "&:hover::before": {
                //   opacity: 1,
                // },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "50%",
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 1,
                },
                "&:hover::before": {
                  opacity: 1,
                },
                "&:hover img": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={thumbnail}
                alt={name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
              />
            </Box>{" "}
          </Link>

          <CardContent>
            <Link to={`/menu/product/${id}`}>
              <Typography
                variant="h6"
                fontSize={15}
                fontWeight={800}
                gutterBottom
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                title={title}
              >
                {title}
              </Typography>
            </Link>

            {/* <Typography
              variant="body2"
              color="primary"
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ mb: 1 }}
            > */}
            {/* <IoLocationOutline /> */}
            {/* {country}
            </Typography> */}

            {/* <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
              {tags.map((tag, index) => (
                <Chip key={index} label={tag} variant="outlined" size="small" />
              ))}
            </Stack> */}

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                // sx={{ background: "blue", width: "60px",padding }}
                // className=" text-black w-[65px] rounded-2xl p-1.5 border-x-fuchsia-500"
                sx={{ textShadow: `0px 1px 1px black`, maxWidth: "10px" }}
                variant="body2"
                // color="secondary"
                fontWeight={600}
                gutterBottom
              >
                ${price}
              </Typography>
              <Button
                className="bg-black rounded-2xl"
                // sx={{ backgroundColor: "black" }}
                // color="primary"
                // variant="outlined"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>

            {/* <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography> */}
          </CardContent>
        </Card>
      </Box>

      {/* <Typography variant="h3">BookCard</Typography> */}
      {/* Box component="img" src="..." sx={{ ... }}/> */}
      {/* <Box className=" border p-4 rounded ">
        <Link to={`/menu/product/${id}`}>
          {" "} */}
      {/* //! /product/${id} */}
      {/* <figure className="w-full h-42  mb-2 ">
            <img src={image} alt={title} className="w-full  object-cover" />
          </figure>
          <Box>
            <Typography sx={{ fontWeight: "bold" }} variant="h6">
              {title}
            </Typography>
            <Typography variant="body2">${price}</Typography>
          </Box>
        </Link>
      </Box> */}
      {/* <ImageList sx={{ width: 'auto' }} cols={4} gap={10} >

            <ImageListItem key={image}>
                <img
                    srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${image}?w=248&fit=crop&auto=format`}
                    alt={title}
                    loading="lazy"
                    className="w-full  object-contain"
                />
                <ImageListItemBar
                    // title={title}
                    title={<Typography sx={{ fontWeight: 'bold', fontSize: '16px' }} variant="h6">{title}</Typography>}
                    // subtitle={<span>$ {price}</span>}
                    subtitle={<Typography variant="body2">${price}</Typography>}
                    position="below"
                />
            </ImageListItem>
        </ImageList> */}
    </>
  );
};

export default Bookcard;
