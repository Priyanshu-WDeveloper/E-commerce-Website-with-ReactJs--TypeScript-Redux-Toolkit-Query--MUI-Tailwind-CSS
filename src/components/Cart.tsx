import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Grid,
  Checkbox,
  IconButton,
  CardContent,
  Card,
} from "@mui/material";
// import { Check, X, ChevronDown, Tag, Gift } from "lucide-react";
import {
  MdCheck as Check,
  MdClose as X,
  MdLocalOffer as Tag,
  MdCardGiftcard as Gift,
} from "react-icons/md";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  // addToCart,
  changeQuantity,
  clearCart,
  selectCartTotal,
  setOrderDetails,
} from "../reducers/cart";
import { NavLink, useNavigate } from "react-router-dom";
import { Product } from "../types/productTypes";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { selectCurrentUser } from "../reducers/authSlice";
import AvailableOffers from "./AvailableOffers";
import { showToast } from "../helpers/toast";
import calculateSelectedItemsTotals, {
  findMRP,
} from "../utils/calculateTotalItems";
import OrderButton from "./Buttons/OrderButton";
import AddMinusButton from "./Buttons/AddMinusButton";
import DeliveryCheckerMUI from "./Cart/DeliveryCheckerMUI";
import GiftPackageModal from "./Cart/GiftPackageModal";
import ApplyCouponModal from "./Cart/CouponModal";
import { useAppSelector } from "../hooks/store";
// import ApplyCouponModal from "./Cart/ApplyCouponModal";
// import CouponModal from "./Cart/CouponModal";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [donationAmount, setDonationAmount] = useState<string | null>(null);
  const [donateEnabled, setDonateEnabled] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const items = useSelector((store: RootState) => store.cart.items);
  // State for the component
  // console.log(items);
  const totalAmount = useAppSelector(selectCartTotal);

  const dispatch = useDispatch();

  // Calculate totals
  // const totalMRP = items.reduce((sum, item) => sum + item.originalPrice, 0);
  // const totalDiscount = items.reduce(
  //   (sum, item) => sum + (item.originalPrice - item.price),
  //   0
  // );
  const platformFee = 20;

  const handleRemoveItem = (id: number) => {
    // Remove the item from the cart
    dispatch(
      changeQuantity({
        productId: id,
        quantity: 0, // Setting quantity to 0 removes the item
      })
    );

    // Also remove it from selected items if it's selected
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };
  // Function to toggle item selection
  const toggleItemSelection = (id: number) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Remove the ID if it's already selected
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        // Add the ID if it's not selected
        return [...prevSelected, id];
      }
    });
  };
  const handleMinus = (item: Product) => {
    dispatch(
      changeQuantity({
        productId: item.id,
        quantity: item.quantity - 1,
      })
    );
  };
  const handlePlus = (item: Product) => {
    dispatch(
      changeQuantity({
        productId: item.id,
        quantity: item.quantity + 1,
      })
    );
  };
  // const cartTotalPrice = items.reduce((acc: number, item) => {
  //   // const price = getPriceByProductId(item.id);
  //   return acc + (item.price ?? 0) * item.quantity;
  //   // return acc + (p?.price ?? 0) * item.quantity;
  // }, 0);
  // function findMRP(discountedPrice: number, discountPercent: number): number {
  //   if (discountPercent >= 100) {
  //     throw new Error("Discount cannot be 100% or more");
  //   }

  //   const mrp = discountedPrice / (1 - discountPercent / 100);
  //   return parseFloat(mrp.toFixed(2));
  // }
  // const totalDiscounted = items.reduce((acc, item) => {
  //   return (
  //     acc +
  //     (((item.price ?? 0) * item.discountPercentage) / 100) * item.quantity
  //   );
  // }, 0);
  // const TotalAmount = (
  //   items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0) +
  //   platformFee +
  //   (donationAmount ? Number(donationAmount) : 0)
  // ).toLocaleString();
  // const orderPayload = {
  //   items,
  //   total: cartTotalPrice + platformFee,
  // };

  // Calculate totals for selected items only
  // const calculateSelectedItemsTotals = () => {
  //   const selectedItemsData = items.filter((item) =>
  //     selectedItems.includes(item.id)
  //   );

  //   const selectedTotalPrice = selectedItemsData.reduce(
  //     (sum, item) => sum + (item.price ?? 0) * item.quantity,
  //     0
  //   );

  //   const selectedTotalDiscount = selectedItemsData.reduce(
  //     (acc, item) =>
  //       acc +
  //       (((item.price ?? 0) * item.discountPercentage) / 100) * item.quantity,
  //     0
  //   );
  //   const selectedTotalDiscount2 = selectedItemsData.reduce((acc, item) => {
  //     if (!item.price) return acc; // Skip if price missing

  //     // Calculate MRP from discounted price & discount percentage
  //     const mrp = findMRP(item.price, item.discountPercentage);

  //     // Discount per unit = MRP - discounted price
  //     const discountPerUnit = mrp - item.price;

  //     // Add total discount for this item (discount per unit * quantity)
  //     return acc + discountPerUnit * item.quantity;
  //   }, 0);
  //   const selectedTotalMRP = selectedItemsData.reduce((acc, item) => {
  //     if (!item.price) return acc; // Skip if price missing
  //     // Calculate MRP from discounted price & discount percentage
  //     return acc + findMRP(item.price, item.discountPercentage) * item.quantity;
  //   }, 0);
  //   return {
  //     selectedTotalPrice,
  //     selectedTotalDiscount,
  //     selectedTotalDiscount2,
  //     // selectedTotalMRP: selectedTotalPrice + selectedTotalDiscount,
  //     selectedTotalMRP,
  //     selectedTotalAmount:
  //       selectedTotalPrice +
  //       platformFee +
  //       (donationAmount ? Number(donationAmount) : 0),
  //   };
  // };
  const { selectedTotalAmount, selectedTotalDiscount2, selectedTotalMRP } =
    calculateSelectedItemsTotals(
      items,
      selectedItems,
      platformFee,
      donationAmount
    );
  console.log(items);
  // console.log(items.id);
  // console.log(items.id);

  const handlePlaceOrder = () => {
    if (selectedItems.length === 0) {
      showToast("Please select at least one item");
      return;
    }
    if (user) {
      // Only include selected items in the order
      const selectedItemsData = items.filter((item) =>
        selectedItems.includes(item.id)
      );
      const selectedOrderPayload = {
        items: selectedItemsData,
        total: selectedTotalAmount,
      };

      // dispatch(setOrderDetails(orderPayload));
      dispatch(setOrderDetails(selectedOrderPayload));

      dispatch(clearCart());

      navigate("/checkout/address");
    } else {
      showToast("Please Login First");
    }
  };
  const handleOpenGiftModal = () => setGiftModalOpen(true);
  const handleCloseGiftModal = () => setGiftModalOpen(false);
  if (items.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <Card
          sx={{
            textAlign: "center",
            py: 5,
            px: 3,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <ShoppingCartOutlined sx={{ fontSize: 60, color: "gray" }} />
            <Typography variant="h5" mt={2}>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1} mb={3}>
              Looks like you haven’t added anything yet. Let’s fix that!
            </Typography>
            {/* <Button variant="contained" onClick={() => navigate("/menu")}>
              Browse Products
            </Button> */}
            <OrderButton onClick={() => navigate("/menu")}>
              Browse Products
            </OrderButton>
          </CardContent>
        </Card>
      </Box>
    );
  }
  return (
    <Box>
      {/* Header with logo and secure badge */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <Check color="#4caf50" size={20} />
          <Typography variant="body2" color="text.secondary" ml={1}>
            100% SECURE
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Delivery time check */}
          <DeliveryCheckerMUI />

          {/* <Paper sx={{ p: 2, mb: 2, bgcolor: "#FFF8F8" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                Check delivery time & services
              </Typography>
              <Button variant="outlined" size="small" color="error">
                ENTER PIN CODE
              </Button>
            </Box>
          </Paper> */}

          {/* Available offers */}
          <AvailableOffers />

          {/* Item count and actions */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={
                  items.length > 0 && selectedItems.length === items.length
                }
                indeterminate={
                  selectedItems.length > 0 &&
                  selectedItems.length < items.length
                }
                onChange={() => {
                  if (selectedItems.length === items.length) {
                    // If all are selected, deselect all
                    setSelectedItems([]);
                  } else {
                    // Otherwise, select all
                    setSelectedItems(items.map((item) => item.id));
                  }
                }}
                disabled={items.length === 0}
                color="error"
              />
              <Typography variant="body1" fontWeight="bold">
                {items.length > 0
                  ? `${selectedItems.length}/${items.length} ITEMS SELECTED`
                  : "NO ITEMS"}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="text"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={() => {
                  // Remove all selected items
                  selectedItems.forEach((id) => {
                    dispatch(
                      changeQuantity({
                        productId: id,
                        quantity: 0,
                      })
                    );
                  });
                  // Clear selection
                  setSelectedItems([]);
                }}
                disabled={selectedItems.length === 0}
              >
                REMOVE
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() => {
                  // This would typically move items to a wishlist
                  // For now, just show a message
                  alert("Wishlist feature coming soon!");
                }}
                disabled={selectedItems.length === 0}
              >
                MOVE TO WISHLIST
              </Button>
            </Box>
          </Box>

          {/* Product list */}
          {items.map((item) => (
            <Paper key={item.id} sx={{ p: 2, mb: 2, position: "relative" }}>
              <IconButton
                size="small"
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={() => handleRemoveItem(item.id)}
              >
                <X size={16} />
              </IconButton>

              <Box display="flex">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItemSelection(item.id)}
                  color="error"
                  sx={{
                    width: 10,
                    height: 10,
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                      // fill: "transparent", // remove inner fill if you want
                      stroke: "#ffffff", // 👈 your custom border color
                      strokeWidth: 0.5,
                    },
                    // "&.Mui-checked .MuiSvgIcon-root": {
                    //   fill: "#6a0dad", // filled color when checked
                    //   stroke: "#6a0dad", // outline color still visible
                    // },
                  }}
                />
                <Box
                  component="img"
                  src={item.thumbnail}
                  alt={item.title}
                  sx={{ width: 100, height: 120, mr: 2 }}
                />

                <Box flex={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {item.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* Sold by: {item.seller || "Trusted Seller"} */}
                    {!item.brand ? (
                      <span style={{ color: "black", fontWeight: 700 }}>
                        {" "}
                        {item.title}
                      </span>
                    ) : (
                      <>{item.title}</>
                    )}
                    {/* {item.title} */}
                  </Typography>

                  {/* <Box display="flex" mt={2}>
                    <Box mr={4}>
                      <Typography variant="body2">Size: {item.size}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2">Qty: {item.qty}</Typography>
                    </Box>
                  </Box> */}
                  <Box className="w-20 mt-2  flex justify-center gap-2">
                    {/* <Button
                      sx={{
                        width: "24px",
                        height: "24px",
                        minWidth: "1px",
                        bgcolor: "black",
                        color: "white",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black",
                          boxShadow: 5,
                        },
                      }}
                      className="bg-gray-200  rounded-full h-6 text-cyan-600  "
                      onClick={() => handleMinus(item)}
                    >
                      {" "}
                      -
                    </Button> */}
                    <AddMinusButton onClick={() => handleMinus(item)}>
                      {" "}
                      -
                    </AddMinusButton>
                    <span>{item.quantity} </span>
                    {/* <Button
                      sx={{
                        width: "24px",
                        height: "24px",
                        minWidth: "1px",
                        bgcolor: "black",
                        color: "white",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black",
                          boxShadow: 5,
                        },
                      }}
                      className="bg-gray-200  rounded-full w-2 h-6 text-cyan-600"
                      onClick={() => handlePlus(item)}
                    >
                      +
                    </Button> */}
                    <AddMinusButton onClick={() => handlePlus(item)}>
                      +
                    </AddMinusButton>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body1" fontWeight="bold" mr={1}>
                      ${(item.price ?? 0).toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
                      mr={1}
                    >
                      {/* ₹{item.originalPrice.toLocaleString()} */}$
                      {findMRP(item.price, item.discountPercentage)}
                    </Typography>
                    <Typography variant="body2" color="error.main">
                      {item.discountPercentage}% OFF
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mt={1}>
                    <Check size={16} color="green" />
                    <Typography variant="body2" color="text.secondary" ml={1}>
                      <span className="font-bold ">
                        {item.returnPolicy || "Standard"}
                      </span>{" "}
                      available
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Right Section */}
          {/* Coupons section */}

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800 }}
              gutterBottom
            >
              COUPONS
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Box display="flex" alignItems="center">
                <Tag size={18} />
                <Typography variant="body1" ml={1}>
                  Apply Coupons
                </Typography>
              </Box>

              {/* <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => setModalOpen(true)}
              >
                Apply Coupon
              </Button> */}
              <Button variant="outlined" onClick={() => setModalOpen(true)}>
                Enter Coupon
              </Button>
              {/* <CouponModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
              /> */}
              <ApplyCouponModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                cartTotal={totalAmount}
              />
            </Box>
            {!user ? (
              <Box display="flex" alignItems="center">
                <Typography
                  component={NavLink}
                  to="/login"
                  variant="body2"
                  color="error.main"
                  mr={1}
                >
                  Login
                </Typography>
                {/* <NavLink to="/login">Login</NavLink> */}
                <Typography variant="body2">
                  to get upto ₹300 OFF on first order
                </Typography>
              </Box>
            ) : (
              ""
            )}
          </Paper>
          {/* <ApplyCouponModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          /> */}

          {/* Gifting section */}

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800 }}
              gutterBottom
            >
              GIFTING & PERSONALISATION
            </Typography>
            <Box display="flex">
              <Gift size={60} color="#f44336" />
              <Box ml={2}>
                <Typography variant="body1" fontWeight="bold">
                  Buying for a loved one?
                </Typography>
                <Typography variant="body2">
                  Gift Packaging and personalised message on card, Only for ₹35
                </Typography>
                <Button
                  onClick={handleOpenGiftModal}
                  variant="text"
                  color="error"
                  sx={{ pl: 0 }}
                >
                  ADD GIFT PACKAGE
                </Button>
              </Box>
            </Box>
          </Paper>

          <GiftPackageModal
            open={giftModalOpen}
            onClose={handleCloseGiftModal}
          />
          {/* Donation section */}

          <Paper sx={{ p: 2, mb: 2 }}>
            {/* <Button variant="text" color="error" sx={{ pl: 0 }}>
              Know More
            </Button> */}
            {/* Donation */}
            {/* <div className="bg-white rounded-lg shadow-sm p-4"> */}
            <h3 className="font-semibold mb-3">SUPPORT A CAUSE</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={donateEnabled}
                  onChange={(e) => {
                    setDonateEnabled(e.target.checked);
                    if (!e.target.checked) setDonationAmount(null);
                  }}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
                />
                <span className="text-sm">Donate and make a difference</span>
              </label>

              {donateEnabled && (
                <div className="grid grid-cols-4 gap-2">
                  {["5", "10", "25", "50"].map((amount) => (
                    <label key={amount} className="text-center">
                      <input
                        type="radio"
                        name="donation"
                        value={amount}
                        checked={donationAmount === amount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`border rounded p-2 cursor-pointer transition-colors ${
                          donationAmount === amount
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <span className="text-sm font-medium">${amount}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {/* </div> */}
          </Paper>

          {/* Price details */}
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800 }}
              gutterBottom
            >
              PRICE DETAILS
              {selectedItems.length > 0 && ` (${selectedItems.length} Items)`}
              {/* (2 Items) */}
            </Typography>
            {selectedItems.length > 0 ? (
              <>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Total MRP</Typography>
                  <Typography variant="body2">
                    {/* ₹{totalMRP.toLocaleString()} */}
                    {/* {`${(cartTotalPrice + totalDiscounted).toFixed(2)}`} */}
                    ${selectedTotalMRP.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      mr={1}
                      color="success.main"
                      // className="text-green-600"
                    >
                      Discount on MRP
                    </Typography>
                    <Button
                      //   className="bg-black text-white"
                      variant="text"
                      color="inherit"
                      //   size="small"
                      sx={{
                        paddingBlock: 0.5,
                        fontSize: "10px",
                        minWidth: "auto",
                        fontWeight: 700,
                        // color: "gray",
                      }}
                    >
                      Know More
                    </Button>
                  </Box>
                  <Typography variant="body2" color="success.main">
                    {/* -$
                {items
                  .reduce((acc, item) => {
                    return (
                      acc +
                      (((item.price ?? 0) * item.discountPercentage) / 100) *
                        item.quantity
                    );
                  }, 0)
                  .toFixed(2)} */}
                    -$
                    {selectedTotalDiscount2.toFixed(2)}
                  </Typography>
                </Box>
                {/* <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">Coupon Discount</Typography>
              <Button variant="text" color="error" size="small">
                Apply Coupon
              </Button>
            </Box> */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" mr={1}>
                      Platform Fee
                    </Typography>
                    <Button
                      variant="text"
                      color="inherit"
                      //   size="small"
                      sx={{
                        // p: 0,
                        paddingBlock: 0.5,
                        fontSize: "10px",
                        minWidth: "auto",
                        fontWeight: 700,
                      }}
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
                    {/* ${TotalAmount} */}${selectedTotalAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  onClick={handlePlaceOrder}
                  variant="contained"
                  fullWidth
                  color="error"
                  sx={{ borderRadius: 0, py: 1.5 }}
                  // disabled={items.length === 0 || selectedItems.length === 0}
                  // disabled={items.length === 0}
                  disabled={selectedItems.length === 0}
                >
                  PLACE ORDER
                </Button>
              </>
            ) : (
              <Box py={2} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Select items to see price details
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;

// import React, { useState, useMemo } from "react";
// import {
//   MdShoppingCart as ShoppingCart,
//   MdDelete as Trash2,
//   MdAdd as Plus,
//   MdRemove as Minus,
//   MdLocalOffer as Tag,
//   MdCardGiftcard as Gift,
//   MdCheck as Check,
//   MdClose as X,
//   MdExpandMore as ChevronDown,
//   MdFavorite as Heart,
//   MdLocationOn as MapPin,
// } from "react-icons/md";
// import AvailableOffers from "./AvailableOffers";

// const ShoppingCartComponent = () => {
//   // Sample data - in real app this would come from Redux store
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       title: "Premium Cotton T-Shirt",
//       brand: "StyleCo",
//       price: 29.99,
//       originalPrice: 49.99,
//       discountPercentage: 40,
//       quantity: 2,
//       size: "M",
//       thumbnail:
//         "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
//       returnPolicy: "30 days return",
//       category: "clothing",
//     },
//     {
//       id: 2,
//       title: "Wireless Bluetooth Headphones",
//       brand: "TechSound",
//       price: 79.99,
//       originalPrice: 129.99,
//       discountPercentage: 38,
//       quantity: 1,
//       size: "One Size",
//       thumbnail:
//         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop",
//       returnPolicy: "15 days return",
//       category: "electronics",
//     },
//   ]);

//   const [selectedItems, setSelectedItems] = useState([1, 2]);
//   const [donationAmount, setDonationAmount] = useState(null);
//   const [donateEnabled, setDonateEnabled] = useState(false);
//   const [promoCode, setPromoCode] = useState("");
//   const [appliedPromo, setAppliedPromo] = useState(null);

//   // Calculations
//   const calculations = useMemo(() => {
//     const subtotal = cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     const totalOriginalPrice = cartItems.reduce(
//       (sum, item) => sum + item.originalPrice * item.quantity,
//       0
//     );
//     const totalDiscount = totalOriginalPrice - subtotal;
//     const platformFee = 3.99;
//     const donation =
//       donateEnabled && donationAmount ? parseFloat(donationAmount) : 0;
//     const promoDiscount = appliedPromo ? subtotal * 0.1 : 0; // 10% promo discount
//     const total = subtotal + platformFee + donation - promoDiscount;

//     return {
//       subtotal,
//       totalOriginalPrice,
//       totalDiscount,
//       platformFee,
//       donation,
//       promoDiscount,
//       total,
//     };
//   }, [cartItems, donateEnabled, donationAmount, appliedPromo]);

//   // Handlers
//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity === 0) {
//       setCartItems((prev) => prev.filter((item) => item.id !== id));
//       setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
//     } else {
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.id === id
//             ? { ...item, quantity: Math.max(1, newQuantity) }
//             : item
//         )
//       );
//     }
//   };

//   const toggleItemSelection = (id) => {
//     setSelectedItems((prev) =>
//       prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
//     );
//   };

//   const selectAll = () => {
//     setSelectedItems(
//       selectedItems.length === cartItems.length
//         ? []
//         : cartItems.map((item) => item.id)
//     );
//   };

//   const removeSelected = () => {
//     setCartItems((prev) =>
//       prev.filter((item) => !selectedItems.includes(item.id))
//     );
//     setSelectedItems([]);
//   };

//   const applyPromoCode = () => {
//     if (promoCode.toLowerCase() === "save10") {
//       setAppliedPromo({ code: promoCode, discount: 0.1 });
//     }
//     setPromoCode("");
//   };

//   const removePromoCode = () => {
//     setAppliedPromo(null);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//             <ShoppingCart className="mx-auto text-6xl text-gray-400 mb-4" />
//             <h2 className="text-2xl font-semibold text-gray-900 mb-2">
//               Your cart is empty
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Looks like you haven't added anything yet. Let's fix that!
//             </p>
//             <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex items-center text-green-600 mb-4">
//             <Check className="text-xl mr-2" />
//             <span className="text-sm font-medium">100% SECURE CHECKOUT</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {/* Delivery Check */}
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center">
//                   <MapPin className="text-xl text-red-600 mr-2" />
//                   <span className="text-sm font-medium">
//                     Check delivery time & services
//                   </span>
//                 </div>
//                 <button className="border border-red-600 text-red-600 px-4 py-2 rounded text-sm hover:bg-red-50 transition-colors">
//                   ENTER PIN CODE
//                 </button>
//               </div>
//             </div>

//             {/* Available Offers */}
//             {/* <div className="bg-white rounded-lg shadow-sm p-4">
//               <div className="flex items-center mb-3">
//                 <Tag className="text-xl text-orange-600 mr-2" />
//                 <h3 className="font-semibold">Available Offers</h3>
//               </div>
//               <ul className="text-sm text-gray-600 space-y-1 mb-3">
//                 <li>• 10% off on first order with code WELCOME10</li>
//                 <li>• Free shipping on orders above $50</li>
//                 <li>• Extra 5% off on prepaid orders</li>
//               </ul>
//               <button className="text-blue-600 text-sm flex items-center hover:text-blue-700 transition-colors">
//                 Show More <ChevronDown className="text-base ml-1" />
//               </button>
//             </div> */}
//             <AvailableOffers />

//             {/* Item Selection Header */}
//             <div className="bg-white rounded-lg shadow-sm p-4">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.length === cartItems.length}
//                     onChange={selectAll}
//                     className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
//                   />
//                   <span className="font-semibold">
//                     {selectedItems.length}/{cartItems.length} ITEMS SELECTED
//                   </span>
//                 </div>
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={removeSelected}
//                     disabled={selectedItems.length === 0}
//                     className="text-gray-600 hover:text-red-600 disabled:opacity-50 disabled:hover:text-gray-600 transition-colors"
//                   >
//                     REMOVE
//                   </button>
//                   <button
//                     disabled={selectedItems.length === 0}
//                     className="text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-600 transition-colors flex items-center"
//                   >
//                     <Heart className="text-base mr-1" />
//                     WISHLIST
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Cart Items */}
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white rounded-lg shadow-sm p-4 relative"
//                 >
//                   <button
//                     onClick={() => updateQuantity(item.id, 0)}
//                     className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
//                   >
//                     <X className="text-xl" />
//                   </button>

//                   <div className="flex space-x-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedItems.includes(item.id)}
//                       onChange={() => toggleItemSelection(item.id)}
//                       className="h-4 w-4 text-blue-600 rounded border-gray-300 mt-2"
//                     />

//                     <img
//                       src={item.thumbnail}
//                       alt={item.title}
//                       className="w-24 h-32 object-cover rounded-lg"
//                     />

//                     <div className="flex-1 space-y-2">
//                       <div>
//                         <h3 className="font-semibold text-gray-900">
//                           {item.brand}
//                         </h3>
//                         <p className="text-gray-600 text-sm">{item.title}</p>
//                       </div>

//                       <div className="flex space-x-6 text-sm text-gray-600">
//                         <span>Size: {item.size}</span>
//                       </div>

//                       {/* Quantity Controls */}
//                       <div className="flex items-center space-x-3">
//                         <span className="text-sm text-gray-600">Qty:</span>
//                         <div className="flex items-center border rounded-lg">
//                           <button
//                             onClick={() =>
//                               updateQuantity(item.id, item.quantity - 1)
//                             }
//                             className="p-2 hover:bg-gray-100 transition-colors"
//                           >
//                             <Minus className="text-base" />
//                           </button>
//                           <span className="px-4 py-2 min-w-[3rem] text-center">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() =>
//                               updateQuantity(item.id, item.quantity + 1)
//                             }
//                             className="p-2 hover:bg-gray-100 transition-colors"
//                           >
//                             <Plus className="text-base" />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Price */}
//                       <div className="flex items-center space-x-2">
//                         <span className="text-lg font-semibold">
//                           ${item.price}
//                         </span>
//                         <span className="text-gray-500 line-through text-sm">
//                           ${item.originalPrice}
//                         </span>
//                         <span className="text-green-600 text-sm font-medium">
//                           {item.discountPercentage}% OFF
//                         </span>
//                       </div>

//                       {/* Return Policy */}
//                       <div className="flex items-center text-sm text-green-600">
//                         <Check className="text-base mr-1" />
//                         <span>{item.returnPolicy} available</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column - Summary */}
//           <div className="space-y-4">
//             {/* Coupons */}
//             <div className="bg-white rounded-lg shadow-sm p-4">
//               <h3 className="font-semibold mb-3">COUPONS</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <Tag className="text-base text-orange-600 mr-2" />
//                     <span className="text-sm">Apply Coupon</span>
//                   </div>
//                 </div>

//                 {appliedPromo ? (
//                   <div className="flex items-center justify-between bg-green-50 p-2 rounded">
//                     <span className="text-sm font-medium text-green-700">
//                       {appliedPromo.code} Applied
//                     </span>
//                     <button
//                       onClick={removePromoCode}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex space-x-2">
//                     <input
//                       type="text"
//                       value={promoCode}
//                       onChange={(e) => setPromoCode(e.target.value)}
//                       placeholder="Enter coupon code"
//                       className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
//                     />
//                     <button
//                       onClick={applyPromoCode}
//                       className="border border-red-600 text-red-600 px-4 py-2 rounded text-sm hover:bg-red-50 transition-colors"
//                     >
//                       APPLY
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Gifting */}
//             <div className="bg-white rounded-lg shadow-sm p-4">
//               <h3 className="font-semibold mb-3">GIFTING & PERSONALISATION</h3>
//               <div className="flex space-x-3">
//                 <Gift className="h-12 w-12 text-red-600 flex-shrink-0" />
//                 <div className="space-y-2">
//                   <h4 className="font-medium">Buying for a loved one?</h4>
//                   <p className="text-sm text-gray-600">
//                     Gift wrapping and personalized message, only $2.99
//                   </p>
//                   <button className="text-red-600 text-sm hover:text-red-700 transition-colors">
//                     ADD GIFT PACKAGE
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Donation */}
//             <div className="bg-white rounded-lg shadow-sm p-4">
//               <h3 className="font-semibold mb-3">SUPPORT A CAUSE</h3>
//               <div className="space-y-3">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={donateEnabled}
//                     onChange={(e) => {
//                       setDonateEnabled(e.target.checked);
//                       if (!e.target.checked) setDonationAmount(null);
//                     }}
//                     className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
//                   />
//                   <span className="text-sm">Donate and make a difference</span>
//                 </label>

//                 {donateEnabled && (
//                   <div className="grid grid-cols-4 gap-2">
//                     {["5", "10", "25", "50"].map((amount) => (
//                       <label key={amount} className="text-center">
//                         <input
//                           type="radio"
//                           name="donation"
//                           value={amount}
//                           checked={donationAmount === amount}
//                           onChange={(e) => setDonationAmount(e.target.value)}
//                           className="sr-only"
//                         />
//                         <div
//                           className={`border rounded p-2 cursor-pointer transition-colors ${
//                             donationAmount === amount
//                               ? "border-blue-600 bg-blue-50"
//                               : "border-gray-300 hover:border-gray-400"
//                           }`}
//                         >
//                           <span className="text-sm font-medium">${amount}</span>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Price Summary */}
//             <div className="bg-white rounded-lg shadow-sm p-4">
//               <h3 className="font-semibold mb-3">PRICE DETAILS</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span>Total MRP</span>
//                   <span>${calculations.totalOriginalPrice.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount on MRP</span>
//                   <span>-${calculations.totalDiscount.toFixed(2)}</span>
//                 </div>
//                 {appliedPromo && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Coupon Discount</span>
//                     <span>-${calculations.promoDiscount.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>Platform Fee</span>
//                   <span>${calculations.platformFee}</span>
//                 </div>
//                 {calculations.donation > 0 && (
//                   <div className="flex justify-between">
//                     <span>Donation</span>
//                     <span>${calculations.donation.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <hr className="my-3" />
//                 <div className="flex justify-between font-semibold text-lg">
//                   <span>Total Amount</span>
//                   <span>${calculations.total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button
//                 disabled={cartItems.length === 0}
//                 className="w-full bg-red-600 text-white py-3 rounded-lg mt-4 font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 PLACE ORDER
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCartComponent;

// // import { useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Divider,
// //   Paper,
// //   Grid,
// //   Checkbox,
// //   FormControlLabel,
// //   IconButton,
// //   Radio,
// //   RadioGroup,
// //   FormControl,
// //   CardContent,
// //   Card,
// // } from "@mui/material";
// // // import { Check, X, ChevronDown, Tag, Gift } from "lucide-react";
// // import {
// //   MdCheck as Check,
// //   MdClose as X,
// //   MdExpandMore as ChevronDown,
// //   MdLocalOffer as Tag,
// //   MdCardGiftcard as Gift,
// // } from "react-icons/md";
// // import { RootState } from "../app/store";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   addToCart,
// //   changeQuantity,
// //   clearCart,
// //   setOrderDetails,
// // } from "../reducers/cart";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Product } from "../types/productTypes";
// // import { ShoppingCartOutlined } from "@mui/icons-material";
// // import { selectCurrentUser } from "../reducers/authSlice";
// // import { useErrorToast } from "../helpers/toasts/useToast";

// // const ShoppingCart = () => {
// //   const navigate = useNavigate();
// //   const user = useSelector(selectCurrentUser);
// //   const showToast = useErrorToast();
// //   const [selectedItems, setSelectedItems] = useState<number[]>([]);
// //   const [donationAmount, setDonationAmount] = useState<string | null>(null);
// //   const [donateEnabled, setDonateEnabled] = useState(false);
// //   const items = useSelector((store: RootState) => store.cart.items);
// //   // State for the component

// //   const dispatch = useDispatch();

// //   // const items = [
// //   //   {
// //   //     id: 0,
// //   //     name: "Aeropostale High IQ Lasting Colour Printed Co-Ords",
// //   //     size: "M",
// //   //     qty: 1,
// //   //     price: 1590,
// //   //     originalPrice: 4299,
// //   //     discount: "63% OFF",
// //   //     seller: "RetailNet",
// //   //     returnDays: 14,
// //   //     image: "/api/placeholder/100/120",
// //   //   },
// //   //   {
// //   //     id: 1,
// //   //     name: "Aeropostale High IQ Lasting Colour Printed Co-Ords",
// //   //     size: "L",
// //   //     qty: 1,
// //   //     price: 1590,
// //   //     originalPrice: 4299,
// //   //     discount: "63% OFF",
// //   //     seller: "RetailNet",
// //   //     returnDays: 14,
// //   //     image: "/api/placeholder/100/120",
// //   //   },
// //   // ];

// //   // Calculate totals
// //   const totalMRP = items.reduce((sum, item) => sum + item.originalPrice, 0);
// //   const totalDiscount = items.reduce(
// //     (sum, item) => sum + (item.originalPrice - item.price),
// //     0
// //   );
// //   const platformFee = 20;

// //   const handleRemoveItem = (id: number) => {
// //     // Remove the item from the cart
// //     dispatch(
// //       changeQuantity({
// //         productId: id,
// //         quantity: 0, // Setting quantity to 0 removes the item
// //       })
// //     );

// //     // Also remove it from selected items if it's selected
// //     if (selectedItems.includes(id)) {
// //       setSelectedItems(selectedItems.filter(itemId => itemId !== id));
// //     }
// //   };

// //   // const toggleItemSelection = (id) => {
// //   //   if (selectedItems.includes(id)) {
// //   //     setSelectedItems(selectedItems.filter((item) => item !== id));
// //   //   } else {
// //   //     setSelectedItems([...selectedItems, id]);
// //   //   }
// //   // };
// //   const toggleItemSelection = (id: number) => {
// //     setSelectedItems((prevSelected) => {
// //       if (prevSelected.includes(id)) {
// //         // Remove the ID if it's already selected
// //         return prevSelected.filter((itemId) => itemId !== id);
// //       } else {
// //         // Add the ID if it's not selected
// //         return [...prevSelected, id];
// //       }
// //     });
// //   };
// //   const handleMinus = (item: Product) => {
// //     dispatch(
// //       changeQuantity({
// //         productId: item.id,
// //         quantity: item.quantity - 1,
// //       })
// //     );
// //   };
// //   const handlePlus = (item: Product) => {
// //     dispatch(
// //       changeQuantity({
// //         productId: item.id,
// //         quantity: item.quantity + 1,
// //       })
// //     );
// //   };
// //   const cartTotalPrice = items.reduce((acc: number, item) => {
// //     // const price = getPriceByProductId(item.id);
// //     return acc + (item.price ?? 0) * item.quantity;
// //     // return acc + (p?.price ?? 0) * item.quantity;
// //   }, 0);
// //     function findMRP(discountedPrice: number, discountPercent: number): number {
// //     if (discountPercent >= 100) {
// //       throw new Error("Discount cannot be 100% or more");
// //     }

// //     const mrp = discountedPrice / (1 - discountPercent / 100);
// //     return parseFloat(mrp.toFixed(2));
// //   }
// //   const totalDiscounted = items.reduce((acc, item) => {
// //     return (
// //       acc +
// //       (((item.price ?? 0) * item.discountPercentage) / 100) * item.quantity
// //     );
// //   }, 0);
// //   const TotalAmount = (
// //     items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0) +
// //     platformFee +
// //     (donationAmount ? Number(donationAmount) : 0)
// //   ).toLocaleString();
// //   const orderPayload = {
// //     items,
// //     total: cartTotalPrice + platformFee,
// //   };

// //   const handlePlaceOrder = () => {
// //     if (user) {
// //       dispatch(setOrderDetails(orderPayload));
// //       dispatch(clearCart());
// //       navigate("/checkout/address");
// //     } else {
// //       showToast("Please Login First");
// //     }
// //   };

// //   return (
// //     <Box>
// //       {/* Header with logo and secure badge */}
// //       <Box
// //         display="flex"
// //         justifyContent="space-between"
// //         alignItems="center"
// //         mb={2}
// //       >
// //         <Box display="flex" alignItems="center">
// //           <Check color="#4caf50" size={20} />
// //           <Typography variant="body2" color="text.secondary" ml={1}>
// //             100% SECURE
// //           </Typography>
// //         </Box>
// //       </Box>

// //       <Grid container spacing={3}>
// //         <Grid item xs={12} md={8}>
// //           {/* Delivery time check */}
// //           <Paper sx={{ p: 2, mb: 2, bgcolor: "#FFF8F8" }}>
// //             <Box
// //               display="flex"
// //               justifyContent="space-between"
// //               alignItems="center"
// //             >
// //                 <Typography variant="body1">
// //                 Check delivery time & services
// //               </Typography>
// //               <Button variant="outlined" size="small" color="error">
// //                 ENTER PIN CODE
// //               </Button>
// //             </Box>
// //             </Paper>

// //           {/* Available offers */}
// //           <Paper sx={{ p: 2, mb: 2 }}>
// //             <Box display="flex" alignItems="center" mb={1}>
// //               <Tag size={20} />
// //               <Typography variant="body1" fontWeight="bold" ml={1}>
// //                 Available Offers
// //               </Typography>
// //             </Box>
// //             <Typography variant="body2" color="text.secondary" mb={1}>
// //               • 10% Instant Discount on Canara Bank Credit Cards on a min
// //               spend of ₹3,500. TCA
// //             </Typography>
// //             <Button
// //               onClick={() => alert("This Feature is coming soon!")}
// //               variant="text"
// //               color="error"
// //               size="small"
// //               endIcon={<ChevronDown size={16} />}
// //             >
// //               Show More
// //             </Button>
// //             </Paper>

// //           {/* Item count and actions */}
// //           <Box
// //             display="flex"
// //             justifyContent="space-between"
// //             alignItems="center"
// //             mb={2}
// //           >
// //               <Box display="flex" alignItems="center">
// //               <Checkbox
// //                 checked={
// //                   items.length > 0 && selectedItems.length === items.length
// //                 }
// //                 indeterminate={
// //                   selectedItems.length > 0 &&
// //                   selectedItems.length < items.length
// //                 }
// //                 onChange={() => {
// //                   if (selectedItems.length === items.length) {
// //                     // If all are selected, deselect all
// //                     setSelectedItems([]);
// //                   } else {
// //                     // Otherwise, select all
// //                     setSelectedItems(items.map((item) => item.id));
// //                   }
// //                 }}
// //                 disabled={items.length === 0}
// //                 color="error"
// //               />
// //               <Typography variant="body1" fontWeight="bold">
// //                 {items.length > 0
// //                   ? `${selectedItems.length}/${items.length} ITEMS SELECTED`
// //                   : "NO ITEMS"}
// //               </Typography>
// //             </Box>
// //             <Box>
// //               <Button
// //                 variant="text"
// //                 color="inherit"
// //                 sx={{ mr: 2 }}
// //                 onClick={() => {
// //                   // Remove all selected items
// //                   selectedItems.forEach(id => {
// //                     dispatch(
// //                       changeQuantity({
// //                         productId: id,
// //                         quantity: 0,
// //                       })
// //                     );
// //                   });
// //                   // Clear selection
// //                   setSelectedItems([]);
// //                 }}
// //                 disabled={selectedItems.length === 0}
// //               >
// //                 REMOVE
// //               </Button>
// //               <Button
// //                 variant="text"
// //                 color="inherit"
// //                 onClick={() => {
// //                   // This would typically move items to a wishlist
// //                   // For now, just show a message
// //                   alert("Wishlist feature coming soon!");
// //                 }}
// //                 disabled={selectedItems.length === 0}
// //               >
// //                 MOVE TO WISHLIST
// //               </Button>
// //             </Box>
// //             </Box>

// //           {/* Product list */}
// //           {items.length === 0 ? (
// //             <Box
// //               display="flex"
// //               justifyContent="center"
// //               alignItems="center"
// //               p={2}
// //             >
// //                 <Card
// //                   sx={{
// //                     textAlign: "center",
// //                     py: 5,
// //                     px: 3,
// //                     borderRadius: 3,
// //                     boxShadow: 3,
// //                   }}
// //                 >
// //                   <CardContent>
// //                     <ShoppingCartOutlined
// //                       sx={{ fontSize: 60, color: "gray" }}
// //                     />
// //                     <Typography variant="h5" mt={2}>
// //                       Your cart is empty
// //                     </Typography>
// //                     <Typography
// //                       variant="body2"
// //                       color="text.secondary"
// //                       mt={1}
// //                       mb={3}
// //                     >
// //                       Looks like you haven’t added anything yet. Let’s fix that!
// //                     </Typography>
// //                     <Button
// //                       variant="contained"
// //                       onClick={() => navigate("/menu")}
// //                     >
// //                       Browse Products
// //                     </Button>
// //                   </CardContent>
// //                 </Card>
// //               </Box>
// //             ) : (
// //               items.map((item) => (
// //                 <Paper key={item.id} sx={{ p: 2, mb: 2, position: "relative" }}>
// //                   <IconButton
// //                     size="small"
// //                     sx={{ position: "absolute", top: 8, right: 8 }}
// //                     onClick={() => handleRemoveItem(item.id)}
// //                   >
// //                     <X size={16} />
// //                   </IconButton>

// //                   <Box display="flex">
// //                     <Checkbox
// //                       checked={selectedItems.includes(item.id)}
// //                       onChange={() => toggleItemSelection(item.id)}
// //                       color="error"
// //                       sx={{
// //                         width: 10,
// //                         height: 10,
// //                         "& .MuiSvgIcon-root": {
// //                           fontSize: 20,
// //                           // fill: "transparent", // remove inner fill if you want
// //                           stroke: "#ffffff", // 👈 your custom border color
// //                           strokeWidth: 0.5,
// //                         },
// //                         // "&.Mui-checked .MuiSvgIcon-root": {
// //                         //   fill: "#6a0dad", // filled color when checked
// //                         //   stroke: "#6a0dad", // outline color still visible
// //                         // },
// //                       }}
// //                     />
// //                     <Box
// //                       component="img"
// //                       src={item.thumbnail}
// //                       alt={item.title}
// //                       sx={{ width: 100, height: 120, mr: 2 }}
// //                     />

// //                     <Box flex={1}>
// //                       <Typography variant="body1" fontWeight="bold">
// //                         {item.brand}
// //                       </Typography>
// //                       <Typography variant="body2" color="text.secondary">
// //                         {/* Sold by: {item.seller || "Trusted Seller"} */}
// //                         {!item.brand ? (
// //                           <span style={{ color: "black", fontWeight: 700 }}>
// //                             {" "}
// //                             {item.title}
// //                           </span>
// //                         ) : (
// //                           <>{item.title}</>
// //                         )}
// //                         {/* {item.title} */}
// //                       </Typography>

// //                       <Box display="flex" mt={2}>
// //                         <Box mr={4}>
// //                           <Typography variant="body2">
// //                             Size: {item.size}
// //                           </Typography>
// //                         </Box>
// //                         <Box>
// //                           <Typography variant="body2">
// //                             Qty: {item.qty}
// //                           </Typography>
// //                         </Box>
// //                       </Box>
// //                       <Box className="w-20 mt-2  flex justify-center gap-2">
// //                         <Button
// //                           sx={{
// //                             width: "24px",
// //                             height: "24px",
// //                             minWidth: "1px",
// //                             bgcolor: "black",
// //                             color: "white",
// //                             borderRadius: "50%",
// //                             "&:hover": {
// //                               backgroundColor: "white",
// //                               color: "black",
// //                               boxShadow: 5,
// //                             },
// //                           }}
// //                           className="bg-gray-200  rounded-full h-6 text-cyan-600  "
// //                           onClick={() => handleMinus(item)}
// //                         >
// //                           {" "}
// //                           -
// //                         </Button>
// //                         <span>{item.quantity} </span>
// //                         <Button
// //                           sx={{
// //                             width: "24px",
// //                             height: "24px",
// //                             minWidth: "1px",
// //                             bgcolor: "black",
// //                             color: "white",
// //                             borderRadius: "50%",
// //                             "&:hover": {
// //                               backgroundColor: "white",
// //                               color: "black",
// //                               boxShadow: 5,
// //                             },
// //                           }}
// //                           className="bg-gray-200  rounded-full w-2 h-6 text-cyan-600"
// //                           onClick={() => handlePlus(item)}
// //                         >
// //                           +
// //                         </Button>
// //                       </Box>
// //                       <Box display="flex" alignItems="center" mt={1}>
// //                         <Typography variant="body1" fontWeight="bold" mr={1}>
// //                           ${(item.price ?? 0).toLocaleString()}
// //                         </Typography>
// //                         <Typography
// //                           variant="body2"
// //                           color="text.secondary"
// //                           sx={{ textDecoration: "line-through" }}
// //                           mr={1}
// //                         >
// //                           {/* ₹{item.originalPrice.toLocaleString()} */}$
// //                           {findMRP(item.price, item.discountPercentage)}
// //                         </Typography>
// //                         <Typography variant="body2" color="error.main">
// //                           {item.discountPercentage}% OFF
// //                         </Typography>
// //                       </Box>

// //                       <Box display="flex" alignItems="center" mt={1}>
// //                         <Check size={16} color="green" />
// //                         <Typography
// //                           variant="body2"
// //                           color="text.secondary"
// //                           ml={1}
// //                         >
// //                           {item.returnPolicy} available
// //                         </Typography>
// //                       </Box>
// //                     </Box>
// //                   </Box>
// //                 </Paper>
// //               ))
// //             )}
// //           </Grid>

// //         <Grid item xs={12} md={4}>
// //             {/* Right Section */}
// //             {/* Coupons section */}
// //             <Paper sx={{ p: 2, mb: 2 }}>
// //               <Typography variant="subtitle1" gutterBottom>
// //                 COUPONS
// //               </Typography>
// //               <Box
// //                 display="flex"
// //                 justifyContent="space-between"
// //                 alignItems="center"
// //                 mb={1}
// //               >
// //                 <Box display="flex" alignItems="center">
// //                   <Tag size={18} />
// //                   <Typography variant="body1" ml={1}>
// //                     Apply Coupons
// //                   </Typography>
// //                 </Box>
// //                 <Button
// //                   onClick={() => alert("This Feature is coming soon!")}
// //                   variant="outlined"
// //                   size="small"
// //                   color="error"
// //                 >
// //                   APPLY
// //                 </Button>
// //               </Box>
// //               <Box display="flex" alignItems="center">
// //                 <Typography variant="body2" color="error.main" mr={1}>
// //                   Login
// //                 </Typography>
// //                 <Typography variant="body2">
// //                   to get upto ₹300 OFF on first order
// //                 </Typography>
// //               </Box>
// //             </Paper>

// //             {/* Gifting section */}
// //             <Paper sx={{ p: 2, mb: 2 }}>
// //               <Typography variant="subtitle1" gutterBottom>
// //                 GIFTING & PERSONALISATION
// //               </Typography>
// //               <Box display="flex" mb={2}>
// //                 <Gift size={60} color="#f44336" />
// //                 <Box ml={2}>
// //                   <Typography variant="body1" fontWeight="bold">
// //                     Buying for a loved one?
// //                   </Typography>
// //                   <Typography variant="body2">
// //                     Gift Packaging and personalised message on card, Only for
// //                     ₹35
// //                   </Typography>
// //                   <Button
// //                     onClick={() => alert("This Feature is coming soon!")}
// //                     variant="text"
// //                     color="error"
// //                     sx={{ pl: 0 }}
// //                   >
// //                     ADD GIFT PACKAGE
// //                   </Button>
// //                 </Box>
// //               </Box>
// //             </Paper>

// //             {/* Donation section */}
// //             <Paper sx={{ p: 2, mb: 2 }}>
// //               <Typography variant="subtitle1" gutterBottom>
// //                 SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
// //               </Typography>
// //               <FormControlLabel
// //                 control={
// //                   <Checkbox
// //                     checked={donateEnabled}
// //                     onChange={(e) => {
// //                       setDonateEnabled(e.target.checked);
// //                       if (!e.target.checked) {
// //                         setDonationAmount(null);
// //                       }
// //                     }}
// //                   />
// //                 }
// //                 label="Donate and make a difference"
// //               />
// //               <RadioGroup
// //                 row
// //                 value={donationAmount}
// //                 onChange={(e) => setDonationAmount(e.target.value)}
// //                 disabled={!donateEnabled}
// //               >
// //                 <FormControl sx={{ m: 1 }}>
// //                   <Radio value="10" disabled={!donateEnabled} />
// //                   <Typography variant="body2" textAlign="center">
// //                     ₹10
// //                   </Typography>
// //                 </FormControl>
// //                 <FormControl sx={{ m: 1 }}>
// //                   <Radio value="20" disabled={!donateEnabled} />
// //                   <Typography variant="body2" textAlign="center">
// //                     ₹20
// //                   </Typography>
// //                 </FormControl>
// //                 <FormControl sx={{ m: 1 }}>
// //                   <Radio value="50" disabled={!donateEnabled} />
// //                   <Typography variant="body2" textAlign="center">
// //                     ₹50
// //                   </Typography>
// //                 </FormControl>
// //                 <FormControl sx={{ m: 1 }}>
// //                   <Radio value="100" disabled={!donateEnabled} />
// //                   <Typography variant="body2" textAlign="center">
// //                     ₹100
// //                   </Typography>
// //                 </FormControl>
// //               </RadioGroup>
// //               <Button variant="text" color="error" sx={{ pl: 0 }}>
// //                 Know More
// //               </Button>
// //             </Paper>

// //             {/* Price details */}
// //             <Paper sx={{ p: 2 }}>
// //               <Typography variant="subtitle1" gutterBottom>
// //                 PRICE DETAILS
// //                 {/* (2 Items) */}
// //               </Typography>
// //               <Box display="flex" justifyContent="space-between" mb={1}>
// //                 <Typography variant="body2">Total MRP</Typography>
// //                 <Typography variant="body2">
// //                   {/* ₹{totalMRP.toLocaleString()} */}$
// //                   {`${(cartTotalPrice + totalDiscounted).toFixed(2)}`}
// //                 </Typography>
// //               </Box>
// //               <Box display="flex" justifyContent="space-between" mb={1}>
// //                 <Box display="flex" alignItems="center">
// //                   <Typography variant="body2" mr={1}>
// //                     Discount on MRP
// //                   </Typography>
// //                   <Button
// //                     variant="text"
// //                     color="error"
// //                     size="small"
// //                     sx={{ p: 0, minWidth: "auto" }}
// //                   >
// //                     Know More
// //                   </Button>
// //                 </Box>
// //                 <Typography variant="body2" color="success.main">
// //                   -$
// //                   {items
// //                     .reduce((acc, item) => {
// //                       return (
// //                         acc +
// //                         (((item.price ?? 0) * item.discountPercentage) / 100) *
// //                           item.quantity
// //                       );
// //                     }, 0)
// //                     .toFixed(2)}
// //                 </Typography>
// //               </Box>
// //               <Box display="flex" justifyContent="space-between" mb={1}>
// //                 <Typography variant="body2">Coupon Discount</Typography>
// //                 <Button variant="text" color="error" size="small">
// //                   Apply Coupon
// //                 </Button>
// //               </Box>
// //               <Box display="flex" justifyContent="space-between" mb={2}>
// //                 <Box display="flex" alignItems="center">
// //                   <Typography variant="body2" mr={1}>
// //                     Platform Fee
// //                   </Typography>
// //                   <Button
// //                     variant="text"
// //                     color="error"
// //                     size="small"
// //                     sx={{ p: 0, minWidth: "auto" }}
// //                   >
// //                     Know More
// //                   </Button>
// //                 </Box>
// //                 <Typography variant="body2">${platformFee}</Typography>
// //               </Box>
// //               <Divider sx={{ my: 2 }} />
// //               <Box display="flex" justifyContent="space-between" mb={2}>
// //                 <Typography variant="subtitle1" fontWeight="bold">
// //                   Total Amount
// //                 </Typography>
// //                 <Typography variant="subtitle1" fontWeight="bold">
// //                   ${TotalAmount}
// //                 </Typography>
// //               </Box>
// //               <Button
// //                 onClick={handlePlaceOrder}
// //                 variant="contained"
// //                 fullWidth
// //                 color="error"
// //                 sx={{ borderRadius: 0, py: 1.5 }}
// //                 // disabled={items.length === 0 || selectedItems.length === 0}
// //                 disabled={items.length === 0}
// //               >
// //                 PLACE ORDER
// //               </Button>
// //             </Paper>
// //           </Grid>
// //         </Grid>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default ShoppingCart;
