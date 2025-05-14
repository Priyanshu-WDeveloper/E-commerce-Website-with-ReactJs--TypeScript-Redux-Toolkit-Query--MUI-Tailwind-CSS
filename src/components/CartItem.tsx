import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../reducers/cart";
// import { DecimationAlgorithm } from "chart.js";
import { CartItemProps } from "../types/productTypes";

const CartItem: FC<CartItemProps> = ({ data: detail }) => {
  // console.log(data.title);
  // console.log("detail", detail);

  // const { productId, quantity } = props.data;

  const dispatch = useDispatch();
  // console.log("productId", productId);
  // console.log("quantity", quantity);
  // const [detail, setDetail] = useState<Product | null>(null);
  // let pricee;
  // useEffect(() => {
  //   const findDetail =
  //     ProductData?.find((product: Product) => product?.id === productId) ||
  //     null; //!filterX find_/

  //   setDetail(findDetail);
  //   // console.log("findDetail", findDetail);
  //   // console.log("detail", detail?.title);

  //   // if (!detail) {
  //   //   return <Box>Loading product...</Box>;
  //   // }
  // }, [productId]);
  const handleMinus = () => {
    dispatch(
      changeQuantity({
        productId: detail.id,
        quantity: detail.quantity - 1,
      })
    );
  };
  const handlePlus = () => {
    dispatch(
      changeQuantity({
        productId: detail.id,
        quantity: detail.quantity + 1,
      })
    );
  };

  return (
    <>
      <Box>
        {" "}
        <Box className="flex justify-between items-center bg-slate-600 text-white border-b-2 border-slate-700 gap-5 mb-2 p-2  rounded-md ">
          <figure>
            <img src={detail?.image} alt={detail?.title} className="w-25" />
          </figure>
          <Typography variant="body2">{detail?.title}</Typography>
          <Typography variant="body2">
            ${((detail?.price ?? 0) * detail.quantity).toFixed(2)}
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
            <span>{detail.quantity} </span>
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
    </>
  );
};

export default CartItem;
