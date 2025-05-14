import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../reducers/FilterSlice";
import cartReducer from "../reducers/cart";
import { apiSlice } from "../services/api/ApiSlice";
import { apiSlicess } from "../utils/rtk";
const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSlicess.reducerPath]: apiSlicess.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(apiSlicess.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
