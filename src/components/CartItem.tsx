import { Box, Button, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ProductData } from "../pages/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "../reducers/cart";
import { RootState } from "../app/store";
interface Product {
  id: number;
  title?: string;
  thumbnail?: string;
  price?: number;
}

interface CartItemProps {
  data: {
    productId: number;
    quantity: number;
  };
}
const CartItem: FC<CartItemProps> = (props) => {
  const { productId, quantity } = props.data;

  const dispatch = useDispatch();
  // console.log("productId", productId);
  // console.log("quantity", quantity);
  const [detail, setDetail] = useState<Product | null>(null);
  let pricee;
  useEffect(() => {
    const findDetail =
      ProductData?.find((product: Product) => product?.id === productId) ||
      null; //!filterX find_/

    setDetail(findDetail);
    console.log("findDetail", findDetail);
    console.log("detail", detail?.title);

    // if (!detail) {
    //   return <Box>Loading product...</Box>;
    // }
  }, [productId]);
  const handleMinus = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
      })
    );
  };
  const handlePlus = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
      })
    );
  };
  const carts = useSelector((store: RootState) => store.cart.items);
  console.log(carts);

  const totalPrice = carts.reduce((acc: number, item) => {
    // if (!detail) return 0;
    console.log(detail?.price ?? 0);
    console.log(item.quantity);
    return acc + (detail?.price ?? 0) * item.quantity;
  }, 0);
  console.log(totalPrice);

  // const cartTotalPrice = carts.reduce((acc: number, item) => {
  //   const p = ProductData.find((pd: Product) => pd.id === item.productId);
  //   return acc + (p?.price ?? 0) * item.quantity;
  // }, 0);
  // console.log(cartTotalPrice);

  return (
    <>
      <Box>
        {" "}
        <Box className="flex justify-between items-center bg-slate-600 text-white border-b-2 border-slate-700 gap-5 mb-2 p-2 w-[315px] rounded-md ">
          <figure>
            <img src={detail?.thumbnail} alt={detail?.title} className="w-25" />
          </figure>
          <Typography variant="body2">{detail?.title}</Typography>
          <Typography variant="body2">
            ${((detail?.price ?? 0) * quantity).toFixed(2)}
          </Typography>
          <Box className="w-40  flex justify-center gap-2">
            <Button
              sx={{
                width: "24px",
                height: "24px",
                minWidth: "1px",
                bgcolor: "black",
                color: "white",
                borderRadius: "50%",
              }}
              className="bg-gray-200  rounded-full h-6 text-cyan-600"
              onClick={handleMinus}
            >
              {" "}
              -
            </Button>
            <span>{quantity}</span>
            <Button
              sx={{
                width: "24px",
                height: "24px",
                minWidth: "1px",
                bgcolor: "black",
                color: "white",
                borderRadius: "50%",
              }}
              className="bg-gray-200  rounded-full w-2 h-6 text-cyan-600"
              onClick={handlePlus}
            >
              +
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>{/* <span>{totalPrice}</span> */}</Box>
    </>
  );
};

export default CartItem;
