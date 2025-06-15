import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
  ThunkAction,
} from "@reduxjs/toolkit";
import filterReducer from "../reducers/FilterSlice";
import cartReducer from "../reducers/cart";
// import { apiSlice } from "../services/api/ApiSlice";
import { apiSlicess } from "../utils/rtk";
import authReducer from "../reducers/authSlice";

const appReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  auth: authReducer,
  // api: apiSlice.reducer,
  // api: apiSlicess.reducer,
  [apiSlicess.reducerPath]: apiSlicess.reducer,
});
export type RootState = ReturnType<typeof appReducer>; //If you add/remove slices, this updates automatically  // defines store before

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/resetAuth") {
    // state = {} as RootState;
    return appReducer(undefined, action); // 🧼 clean reset
  }
  return appReducer(state, action);
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }) //You're using redux-persist and storing Date, Map, or custom classes
      // .concat(apiSlice.middleware)
      .concat(apiSlicess.middleware),
});
// getDefaultMiddleware({
//   serializableCheck: {
//     ignoredActions: ['api/executeQuery/fulfilled'],
//     ignoredPaths: ['someSlice.blobData'],
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
