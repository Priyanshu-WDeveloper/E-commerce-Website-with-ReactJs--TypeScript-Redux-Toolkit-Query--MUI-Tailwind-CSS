import { FC } from "react";
import { Product } from "../types/productTypes";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const OrderSummary: FC<{ cartItems: Product[] }> = () => {
  // const OrderSummary: FC<{ cartItems: Product[] }> = ({ cartItems }) => {
  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  // console.log(subtotal);

  // const shipping = subtotal > 500 ? 0 : 50;
  // const tax = subtotal * 0.05;
  // const total = subtotal + tax + shipping;

  // const user = useSelector(selectCurrentUser);
  // const showToast = useErrorToast();
  // const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // const [donationAmount, setDonationAmount] = useState<string | null>(null);
  const items = useSelector((store: RootState) => store.cart.items);
  // console.log(items);

  const platformFee = 20;

  const cartTotalPrice = items.reduce((acc: number, item) => {
    // const price = getPriceByProductId(item.id);
    return acc + (item.price ?? 0) * item.quantity;
    // return acc + (p?.price ?? 0) * item.quantity;
  }, 0);
  // console.log(cartTotalPrice);
  // function findMRP(discountedPrice: number, discountPercent: number): number {
  //   if (discountPercent >= 100) {
  //     throw new Error("Discount cannot be 100% or more");
  //   }

  //   const mrp = discountedPrice / (1 - discountPercent / 100);
  //   return parseFloat(mrp.toFixed(2));
  // }
  // console.log(findMRP);

  const totalDiscounted = items.reduce((acc, item) => {
    return (
      acc +
      (((item.price ?? 0) * item.discountPercentage) / 100) * item.quantity
    );
  }, 0);

  return (
    <Box>
      {/* <Typography variant="h6">Order Summary</Typography>
      <Typography>Subtotal: ₹{subtotal.toFixed(2)}</Typography>
      <Typography>Tax (5%): ₹{tax.toFixed(2)}</Typography>
      <Typography>Shipping: ₹{shipping.toFixed(2)}</Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>
        Total: ₹{total.toFixed(2)}
      </Typography> */}

      <Box>
        <Typography variant="body2">Total MRP</Typography>
        <Typography variant="body2">
          {/* ₹{totalMRP.toLocaleString()} */}

          {`${(cartTotalPrice + totalDiscounted).toFixed(2)}`}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" mr={1}>
            Discount on MRP
          </Typography>
          <Button
            variant="text"
            color="error"
            size="small"
            sx={{ p: 0, minWidth: "auto" }}
          >
            Know More
          </Button>
        </Box>
        <Typography variant="body2" color="success.main">
          -$
          {items
            .reduce((acc, item) => {
              return (
                acc +
                (((item.price ?? 0) * item.discountPercentage) / 100) *
                  item.quantity
              );
            }, 0)
            .toFixed(2)}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body2">Coupon Discount</Typography>
        <Button variant="text" color="error" size="small">
          Apply Coupon
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" mr={1}>
            Platform Fee
          </Typography>
          <Button
            variant="text"
            color="error"
            size="small"
            sx={{ p: 0, minWidth: "auto" }}
          >
            Know More
          </Button>
        </Box>
        <Typography variant="body2">${platformFee}</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          Total Amount
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          $
          {(
            items.reduce(
              (sum, item) => sum + (item.price ?? 0) * item.quantity,
              0
            ) + platformFee
          ).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderSummary;
