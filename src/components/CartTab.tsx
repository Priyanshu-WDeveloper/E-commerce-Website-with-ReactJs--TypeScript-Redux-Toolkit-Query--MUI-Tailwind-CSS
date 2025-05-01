import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import CartItem from "./CartItem";
import { toggleStatusTab } from "../reducers/cart";
import { ProductData } from "../pages/MainContent";

const CartTab = () => {
  const carts = useSelector((store: RootState) => store.cart.items);
  // console.log(carts);
  const dispatch = useDispatch();
  const statusTab = useSelector((store: RootState) => store.cart.statusTab);
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };
  // console.log(carts?.quantity);
  // console.log(item.price);

  const totalPrice: number = carts.reduce(
    (acc: number, item) => acc + item.price * item.quantity,
    0
  );
  // console.log(totalPrice);

  const cartTotalPrice = carts.reduce((acc: number, item) => {
    const p = ProductData.find((pd) => pd.id === item.productId);
    return acc + (p?.price ?? 0) * item.quantity;
  }, 0);
  console.log(cartTotalPrice);

  return (
    <Box
      className={`fixed pb-7  z-50 top-16 right-0 bg-gray-700 shadow-2xl w-[345px] h-[92vh] grid grid-rows-[60px_1fr_60px] transform transition-transform 
        ${statusTab === false ? "translate-x-full" : ""} `}
    >
      <Typography variant="h6" className="p-5 text-white text-2xl ">
        Shopping Cart
      </Typography>
      <Box className="p-5">
        {carts.map((item, key) => (
          <CartItem key={key} data={item} />
        ))}
      </Box>
      <Box className="grid grid-cols-2 gap-4  ml-10 justify-center ">
        <Typography
          variant="body2"
          className="col-span-2 pr-13 text-white text-right"
        >
          Total Price:{" "}
          <span className="bg-slate-500   p-2  rounded-md">
            ${cartTotalPrice.toFixed(2)}
          </span>
        </Typography>
        <Button
          sx={{
            bgcolor: "black",
            borderRadius: "10px",
            width: "100px",
            color: "white",
          }}
          onClick={handleCloseTabCart}
        >
          CLOSE
        </Button>
        <Button
          sx={{
            bgcolor: "black",
            borderRadius: "10px",
            width: "100px",
            color: "white",
          }}
        >
          CHECKOUT
        </Button>
      </Box>
    </Box>
  );
};

export default CartTab;
