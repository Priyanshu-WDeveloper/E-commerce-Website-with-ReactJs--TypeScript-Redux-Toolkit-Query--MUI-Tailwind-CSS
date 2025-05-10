import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/productTypes";

interface CartSlice {
  items: Product[];
  statusTab: boolean;
  //   items: [],
}
const initialState: CartSlice = {
  items: [],
  statusTab: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const item = action.payload;
      // const productId = item.productId || item.id;
      const existingItem = state.items.find((i) => i.productId === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1; // added quantity may be users choice or default
        // existingItem.quantity += 1;
      } else {
        // state.items.push(item);
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      // const { productId, quantity } = action.payload;
      // const indexProductId = state.items.findIndex(
      //   (item) => item.productId === productId
      // );
      // if (indexProductId >= 0) {
      //   state.items[indexProductId].quantity += quantity;
      // } else {
      //   state.items.push({ productId, quantity });
      // }
    },
    // changeQuantity(state, action: PayloadAction<Product>) {
    changeQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;

      const indexProductId = state.items.findIndex(
        (item) => item.id === productId
      );
      if (indexProductId === -1) {
        console.error(`Item with id ${productId} not found in cart`);
        return;
      }
      if (quantity > 0) {
        state.items[indexProductId].quantity = quantity;
      } else {
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
    toggleStatusTab(state) {
      state.statusTab = !state.statusTab;
    },
  },
});
export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   id: number;
//   title?: string;
//   image?: string;
//   price?: number;
//   quantity: number;
//   productId?: number;
// }

// interface CartSlice {
//   items: { [id: number]: CartItem };
//   statusTab: boolean;
// }

// const initialState: CartSlice = {
//   items: {},
//   statusTab: false,
// };
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<CartItem>) {
//       const item = action.payload;
//       const itemId = item.id;

//       if (state.items[itemId]) {
//         state.items[itemId].quantity += item.quantity || 1;
//       } else {
//         state.items[itemId] = { ...item, quantity: item.quantity || 1 };
//       }
//     },
//     changeQuantity(
//       state,
//       action: PayloadAction<{ productId: number; quantity: number }>
//     ) {
//       const { productId, quantity } = action.payload;

//       if (state.items[productId]) {
//         if (quantity > 0) {
//           state.items[productId].quantity = quantity;
//         } else {
//           delete state.items[productId];
//         }
//       }
//     },
//     toggleStatusTab(state) {
//       state.statusTab = !state.statusTab;
//     },
//   },
// });
// export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
// export default cartSlice.reducer;
// //
