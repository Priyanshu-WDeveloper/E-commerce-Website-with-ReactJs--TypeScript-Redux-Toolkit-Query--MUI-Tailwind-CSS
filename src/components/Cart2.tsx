// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Divider,
//   Paper,
//   Grid,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Radio,
//   RadioGroup,
//   FormControl,
//   CardContent,
//   Card,
// } from "@mui/material";
// // import { Check, X, ChevronDown, Tag, Gift } from "lucide-react";
// import {
//   MdCheck as Check,
//   MdClose as X,
//   MdExpandMore as ChevronDown,
//   MdLocalOffer as Tag,
//   MdCardGiftcard as Gift,
// } from "react-icons/md";
// import { RootState } from "../app/store";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   changeQuantity,
//   clearCart,
//   setOrderDetails,
// } from "../reducers/cart";
// import { Link, useNavigate } from "react-router-dom";
// import { Product } from "../types/productTypes";
// import { ShoppingCartOutlined } from "@mui/icons-material";
// import { selectCurrentUser } from "../reducers/authSlice";
// import { useErrorToast } from "../helpers/toasts/useToast";
// import AvailableOffers from "./AvailableOffers";

// const ShoppingCart = () => {
//   const navigate = useNavigate();
//   const user = useSelector(selectCurrentUser);
//   const showToast = useErrorToast();
//   const [selectedItems, setSelectedItems] = useState<number[]>([]);
//   const [donationAmount, setDonationAmount] = useState<string | null>(null);
//   const [donateEnabled, setDonateEnabled] = useState(false);
//   const items = useSelector((store: RootState) => store.cart.items);
//   // State for the component

//   const dispatch = useDispatch();

//   // const items = [
//   //   {
//   //     id: 0,
//   //     name: "Aeropostale High IQ Lasting Colour Printed Co-Ords",
//   //     size: "M",
//   //     qty: 1,
//   //     price: 1590,
//   //     originalPrice: 4299,
//   //     discount: "63% OFF",
//   //     seller: "RetailNet",
//   //     returnDays: 14,
//   //     image: "/api/placeholder/100/120",
//   //   },
//   //   {
//   //     id: 1,
//   //     name: "Aeropostale High IQ Lasting Colour Printed Co-Ords",
//   //     size: "L",
//   //     qty: 1,
//   //     price: 1590,
//   //     originalPrice: 4299,
//   //     discount: "63% OFF",
//   //     seller: "RetailNet",
//   //     returnDays: 14,
//   //     image: "/api/placeholder/100/120",
//   //   },
//   // ];

//   // Calculate totals
//   const totalMRP = items.reduce((sum, item) => sum + item.originalPrice, 0);
//   const totalDiscount = items.reduce(
//     (sum, item) => sum + (item.originalPrice - item.price),
//     0
//   );
//   const platformFee = 20;

//   const handleRemoveItem = (id: number) => {
//     // Remove the item from the cart
//     dispatch(
//       changeQuantity({
//         productId: id,
//         quantity: 0, // Setting quantity to 0 removes the item
//       })
//     );

//     // Also remove it from selected items if it's selected
//     if (selectedItems.includes(id)) {
//       setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
//     }
//   };

//   // const toggleItemSelection = (id) => {
//   //   if (selectedItems.includes(id)) {
//   //     setSelectedItems(selectedItems.filter((item) => item !== id));
//   //   } else {
//   //     setSelectedItems([...selectedItems, id]);
//   //   }
//   // };
//   const toggleItemSelection = (id: number) => {
//     setSelectedItems((prevSelected) => {
//       if (prevSelected.includes(id)) {
//         // Remove the ID if it's already selected
//         return prevSelected.filter((itemId) => itemId !== id);
//       } else {
//         // Add the ID if it's not selected
//         return [...prevSelected, id];
//       }
//     });
//   };
//   const handleMinus = (item: Product) => {
//     dispatch(
//       changeQuantity({
//         productId: item.id,
//         quantity: item.quantity - 1,
//       })
//     );
//   };
//   const handlePlus = (item: Product) => {
//     dispatch(
//       changeQuantity({
//         productId: item.id,
//         quantity: item.quantity + 1,
//       })
//     );
//   };
//   const cartTotalPrice = items.reduce((acc: number, item) => {
//     // const price = getPriceByProductId(item.id);
//     return acc + (item.price ?? 0) * item.quantity;
//     // return acc + (p?.price ?? 0) * item.quantity;
//   }, 0);
//   function findMRP(discountedPrice: number, discountPercent: number): number {
//     if (discountPercent >= 100) {
//       throw new Error("Discount cannot be 100% or more");
//     }

//     const mrp = discountedPrice / (1 - discountPercent / 100);
//     return parseFloat(mrp.toFixed(2));
//   }
//   const totalDiscounted = items.reduce((acc, item) => {
//     return (
//       acc +
//       (((item.price ?? 0) * item.discountPercentage) / 100) * item.quantity
//     );
//   }, 0);
//   const TotalAmount = (
//     items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0) +
//     platformFee +
//     (donationAmount ? Number(donationAmount) : 0)
//   ).toLocaleString();
//   const orderPayload = {
//     items,
//     total: cartTotalPrice + platformFee,
//   };

//   const handlePlaceOrder = () => {
//     if (user) {
//       dispatch(setOrderDetails(orderPayload));
//       dispatch(clearCart());
//       navigate("/checkout/address");
//     } else {
//       showToast("Please Login First");
//     }
//   };
//   if (items.length === 0) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" p={2}>
//         <Card
//           sx={{
//             textAlign: "center",
//             py: 5,
//             px: 3,
//             borderRadius: 3,
//             boxShadow: 3,
//           }}
//         >
//           <CardContent>
//             <ShoppingCartOutlined sx={{ fontSize: 60, color: "gray" }} />
//             <Typography variant="h5" mt={2}>
//               Your cart is empty
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mt={1} mb={3}>
//               Looks like you haven’t added anything yet. Let’s fix that!
//             </Typography>
//             <Button variant="contained" onClick={() => navigate("/menu")}>
//               Browse Products
//             </Button>
//           </CardContent>
//         </Card>
//       </Box>
//     );
//   }
//   return (
//     <Box>
//       {/* Header with logo and secure badge */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Box display="flex" alignItems="center">
//           <Check color="#4caf50" size={20} />
//           <Typography variant="body2" color="text.secondary" ml={1}>
//             100% SECURE
//           </Typography>
//         </Box>
//       </Box>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           {/* Delivery time check */}
//           <Paper sx={{ p: 2, mb: 2, bgcolor: "#FFF8F8" }}>
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <Typography variant="body1">
//                 Check delivery time & services
//               </Typography>
//               <Button variant="outlined" size="small" color="error">
//                 ENTER PIN CODE
//               </Button>
//             </Box>
//           </Paper>

//           {/* Available offers */}
//           <AvailableOffers />

//           {/* Item count and actions */}
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             mb={2}
//           >
//             <Box display="flex" alignItems="center">
//               <Checkbox
//                 checked={
//                   items.length > 0 && selectedItems.length === items.length
//                 }
//                 indeterminate={
//                   selectedItems.length > 0 &&
//                   selectedItems.length < items.length
//                 }
//                 onChange={() => {
//                   if (selectedItems.length === items.length) {
//                     // If all are selected, deselect all
//                     setSelectedItems([]);
//                   } else {
//                     // Otherwise, select all
//                     setSelectedItems(items.map((item) => item.id));
//                   }
//                 }}
//                 disabled={items.length === 0}
//                 color="error"
//               />
//               <Typography variant="body1" fontWeight="bold">
//                 {items.length > 0
//                   ? `${selectedItems.length}/${items.length} ITEMS SELECTED`
//                   : "NO ITEMS"}
//               </Typography>
//             </Box>
//             <Box>
//               <Button
//                 variant="text"
//                 color="inherit"
//                 sx={{ mr: 2 }}
//                 onClick={() => {
//                   // Remove all selected items
//                   selectedItems.forEach((id) => {
//                     dispatch(
//                       changeQuantity({
//                         productId: id,
//                         quantity: 0,
//                       })
//                     );
//                   });
//                   // Clear selection
//                   setSelectedItems([]);
//                 }}
//                 disabled={selectedItems.length === 0}
//               >
//                 REMOVE
//               </Button>
//               <Button
//                 variant="text"
//                 color="inherit"
//                 onClick={() => {
//                   // This would typically move items to a wishlist
//                   // For now, just show a message
//                   alert("Wishlist feature coming soon!");
//                 }}
//                 disabled={selectedItems.length === 0}
//               >
//                 MOVE TO WISHLIST
//               </Button>
//             </Box>
//           </Box>

//           {/* Product list */}
//           {items.map((item) => (
//             <Paper key={item.id} sx={{ p: 2, mb: 2, position: "relative" }}>
//               <IconButton
//                 size="small"
//                 sx={{ position: "absolute", top: 8, right: 8 }}
//                 onClick={() => handleRemoveItem(item.id)}
//               >
//                 <X size={16} />
//               </IconButton>

//               <Box display="flex">
//                 <Checkbox
//                   checked={selectedItems.includes(item.id)}
//                   onChange={() => toggleItemSelection(item.id)}
//                   color="error"
//                   sx={{
//                     width: 10,
//                     height: 10,
//                     "& .MuiSvgIcon-root": {
//                       fontSize: 20,
//                       // fill: "transparent", // remove inner fill if you want
//                       stroke: "#ffffff", // 👈 your custom border color
//                       strokeWidth: 0.5,
//                     },
//                     // "&.Mui-checked .MuiSvgIcon-root": {
//                     //   fill: "#6a0dad", // filled color when checked
//                     //   stroke: "#6a0dad", // outline color still visible
//                     // },
//                   }}
//                 />
//                 <Box
//                   component="img"
//                   src={item.thumbnail}
//                   alt={item.title}
//                   sx={{ width: 100, height: 120, mr: 2 }}
//                 />

//                 <Box flex={1}>
//                   <Typography variant="body1" fontWeight="bold">
//                     {item.brand}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {/* Sold by: {item.seller || "Trusted Seller"} */}
//                     {!item.brand ? (
//                       <span style={{ color: "black", fontWeight: 700 }}>
//                         {" "}
//                         {item.title}
//                       </span>
//                     ) : (
//                       <>{item.title}</>
//                     )}
//                     {/* {item.title} */}
//                   </Typography>

//                   <Box display="flex" mt={2}>
//                     <Box mr={4}>
//                       <Typography variant="body2">Size: {item.size}</Typography>
//                     </Box>
//                     <Box>
//                       <Typography variant="body2">Qty: {item.qty}</Typography>
//                     </Box>
//                   </Box>
//                   <Box className="w-20 mt-2  flex justify-center gap-2">
//                     <Button
//                       sx={{
//                         width: "24px",
//                         height: "24px",
//                         minWidth: "1px",
//                         bgcolor: "black",
//                         color: "white",
//                         borderRadius: "50%",
//                         "&:hover": {
//                           backgroundColor: "white",
//                           color: "black",
//                           boxShadow: 5,
//                         },
//                       }}
//                       className="bg-gray-200  rounded-full h-6 text-cyan-600  "
//                       onClick={() => handleMinus(item)}
//                     >
//                       {" "}
//                       -
//                     </Button>
//                     <span>{item.quantity} </span>
//                     <Button
//                       sx={{
//                         width: "24px",
//                         height: "24px",
//                         minWidth: "1px",
//                         bgcolor: "black",
//                         color: "white",
//                         borderRadius: "50%",
//                         "&:hover": {
//                           backgroundColor: "white",
//                           color: "black",
//                           boxShadow: 5,
//                         },
//                       }}
//                       className="bg-gray-200  rounded-full w-2 h-6 text-cyan-600"
//                       onClick={() => handlePlus(item)}
//                     >
//                       +
//                     </Button>
//                   </Box>
//                   <Box display="flex" alignItems="center" mt={1}>
//                     <Typography variant="body1" fontWeight="bold" mr={1}>
//                       ${(item.price ?? 0).toLocaleString()}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{ textDecoration: "line-through" }}
//                       mr={1}
//                     >
//                       {/* ₹{item.originalPrice.toLocaleString()} */}$
//                       {findMRP(item.price, item.discountPercentage)}
//                     </Typography>
//                     <Typography variant="body2" color="error.main">
//                       {item.discountPercentage}% OFF
//                     </Typography>
//                   </Box>

//                   <Box display="flex" alignItems="center" mt={1}>
//                     <Check size={16} color="green" />
//                     <Typography variant="body2" color="text.secondary" ml={1}>
//                       {item.returnPolicy} availabled
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </Paper>
//           ))}
//         </Grid>

//         <Grid item xs={12} md={4}>
//           {/* Right Section */}
//           {/* Coupons section */}
//           <Paper sx={{ p: 2, mb: 2 }}>
//             <Typography
//               variant="subtitle1"
//               sx={{ fontWeight: 800 }}
//               gutterBottom
//             >
//               COUPONS
//             </Typography>
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               mb={1}
//             >
//               <Box display="flex" alignItems="center">
//                 <Tag size={18} />
//                 <Typography variant="body1" ml={1}>
//                   Apply Coupons
//                 </Typography>
//               </Box>
//               <Button
//                 onClick={() => alert("This Feature is coming soon!")}
//                 variant="outlined"
//                 size="small"
//                 color="error"
//               >
//                 APPLY
//               </Button>
//             </Box>
//             <Box display="flex" alignItems="center">
//               <Typography variant="body2" color="error.main" mr={1}>
//                 Login
//               </Typography>
//               <Typography variant="body2">
//                 to get upto ₹300 OFF on first order
//               </Typography>
//             </Box>
//           </Paper>

//           {/* Gifting section */}
//           <Paper sx={{ p: 2, mb: 2 }}>
//             <Typography
//               variant="subtitle1"
//               sx={{ fontWeight: 800 }}
//               gutterBottom
//             >
//               GIFTING & PERSONALISATION
//             </Typography>
//             <Box display="flex">
//               <Gift size={60} color="#f44336" />
//               <Box ml={2}>
//                 <Typography variant="body1" fontWeight="bold">
//                   Buying for a loved one?
//                 </Typography>
//                 <Typography variant="body2">
//                   Gift Packaging and personalised message on card, Only for ₹35
//                 </Typography>
//                 <Button
//                   onClick={() => alert("This Feature is coming soon!")}
//                   variant="text"
//                   color="error"
//                   sx={{ pl: 0 }}
//                 >
//                   ADD GIFT PACKAGE
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>

//           {/* Donation section */}
//           <Paper sx={{ p: 2, mb: 2 }}>
//             {/* <Typography variant="subtitle1" gutterBottom>
//               SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
//             </Typography>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={donateEnabled}
//                   onChange={(e) => {
//                     setDonateEnabled(e.target.checked);
//                     if (!e.target.checked) {
//                       setDonationAmount(null);
//                     }
//                   }}
//                 />
//               }
//               label="Donate and make a difference"
//             />
//             <RadioGroup
//               row
//               value={donationAmount}
//               onChange={(e) => setDonationAmount(e.target.value)}
//               disabled={!donateEnabled}
//             >
//               <FormControl sx={{ m: 1 }}>
//                 <Radio value="10" disabled={!donateEnabled} />
//                 <Typography variant="body2" textAlign="center">
//                   ₹10
//                 </Typography>
//               </FormControl>
//               <FormControl sx={{ m: 1 }}>
//                 <Radio value="20" disabled={!donateEnabled} />
//                 <Typography variant="body2" textAlign="center">
//                   ₹20
//                 </Typography>
//               </FormControl>
//               <FormControl sx={{ m: 1 }}>
//                 <Radio value="50" disabled={!donateEnabled} />
//                 <Typography variant="body2" textAlign="center">
//                   ₹50
//                 </Typography>
//               </FormControl>
//               <FormControl sx={{ m: 1 }}>
//                 <Radio value="100" disabled={!donateEnabled} />
//                 <Typography variant="body2" textAlign="center">
//                   ₹100
//                 </Typography>
//               </FormControl>
//             </RadioGroup>
//             <Button variant="text" color="error" sx={{ pl: 0 }}>
//               Know More
//             </Button> */}
//             {/* Donation */}
//             {/* <div className="bg-white rounded-lg shadow-sm p-4"> */}
//             <h3 className="font-semibold mb-3">SUPPORT A CAUSE</h3>
//             <div className="space-y-3">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={donateEnabled}
//                   onChange={(e) => {
//                     setDonateEnabled(e.target.checked);
//                     if (!e.target.checked) setDonationAmount(null);
//                   }}
//                   className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
//                 />
//                 <span className="text-sm">Donate and make a difference</span>
//               </label>

//               {donateEnabled && (
//                 <div className="grid grid-cols-4 gap-2">
//                   {["5", "10", "25", "50"].map((amount) => (
//                     <label key={amount} className="text-center">
//                       <input
//                         type="radio"
//                         name="donation"
//                         value={amount}
//                         checked={donationAmount === amount}
//                         onChange={(e) => setDonationAmount(e.target.value)}
//                         className="sr-only"
//                       />
//                       <div
//                         className={`border rounded p-2 cursor-pointer transition-colors ${
//                           donationAmount === amount
//                             ? "border-blue-600 bg-blue-50"
//                             : "border-gray-300 hover:border-gray-400"
//                         }`}
//                       >
//                         <span className="text-sm font-medium">${amount}</span>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {/* </div> */}
//           </Paper>

//           {/* Price details */}
//           <Paper sx={{ p: 2 }}>
//             <Typography
//               variant="subtitle1"
//               sx={{ fontWeight: 800 }}
//               gutterBottom
//             >
//               PRICE DETAILS
//               {/* (2 Items) */}
//             </Typography>
//             <Box display="flex" justifyContent="space-between" mb={1.5}>
//               <Typography variant="body2">Total MRP</Typography>
//               <Typography variant="body2">
//                 {/* ₹{totalMRP.toLocaleString()} */}$
//                 {`${(cartTotalPrice + totalDiscounted).toFixed(2)}`}
//               </Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   variant="body2"
//                   mr={1}
//                   color="success.main"
//                   // className="text-green-600"
//                 >
//                   Discount on MRP
//                 </Typography>
//                 <Button
//                   //   className="bg-black text-white"
//                   variant="text"
//                   color="inherit"
//                   //   size="small"
//                   sx={{
//                     paddingBlock: 0.5,
//                     fontSize: "10px",
//                     minWidth: "auto",
//                     fontWeight: 700,
//                     // color: "gray",
//                   }}
//                 >
//                   Know More
//                 </Button>
//               </Box>
//               <Typography variant="body2" color="success.main">
//                 -$
//                 {items
//                   .reduce((acc, item) => {
//                     return (
//                       acc +
//                       (((item.price ?? 0) * item.discountPercentage) / 100) *
//                         item.quantity
//                     );
//                   }, 0)
//                   .toFixed(2)}
//               </Typography>
//             </Box>
//             {/* <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography variant="body2">Coupon Discount</Typography>
//               <Button variant="text" color="error" size="small">
//                 Apply Coupon
//               </Button>
//             </Box> */}
//             <Box display="flex" justifyContent="space-between" mb={2}>
//               <Box display="flex" alignItems="center">
//                 <Typography variant="body2" mr={1}>
//                   Platform Fee
//                 </Typography>
//                 <Button
//                   variant="text"
//                   color="inherit"
//                   //   size="small"
//                   sx={{
//                     // p: 0,
//                     paddingBlock: 0.5,
//                     fontSize: "10px",
//                     minWidth: "auto",
//                     fontWeight: 700,
//                   }}
//                 >
//                   Know More
//                 </Button>
//               </Box>
//               <Typography variant="body2">${platformFee}</Typography>
//             </Box>
//             <Divider sx={{ my: 2 }} />
//             <Box display="flex" justifyContent="space-between" mb={2}>
//               <Typography variant="subtitle1" fontWeight="bold">
//                 Total Amount
//               </Typography>
//               <Typography variant="subtitle1" fontWeight="bold">
//                 ${TotalAmount}
//               </Typography>
//             </Box>
//             <Button
//               onClick={handlePlaceOrder}
//               variant="contained"
//               fullWidth
//               color="error"
//               sx={{ borderRadius: 0, py: 1.5 }}
//               // disabled={items.length === 0 || selectedItems.length === 0}
//               disabled={items.length === 0}
//             >
//               PLACE ORDER
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ShoppingCart;
