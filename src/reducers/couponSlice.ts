// couponSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type Coupon = {
  code: string;
  discount: number;
  type: "percent" | "flat";
};

interface CouponState {
  coupon: Coupon | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const validCoupons: Coupon[] = [
  { code: "SAVE10", discount: 10, type: "percent" },
  { code: "SAVE20", discount: 20, type: "percent" },
  { code: "SAVE30", discount: 30, type: "percent" },
  { code: "MYNTRASAVE", discount: 15, type: "percent" },
  { code: "HOMEBUYMORE", discount: 20, type: "percent" },
];

export const applyCoupon = createAsyncThunk<
  Coupon, // return type
  string, // argument type
  { rejectValue: string } // reject type
>("coupon/apply", async (code, { rejectWithValue }) => {
  return new Promise<Coupon>((resolve, reject) => {
    setTimeout(() => {
      if (!code) {
        return reject(rejectWithValue("Coupon code is required."));
      }
      const found = validCoupons.find((c) => c.code === code);
      console.log("Applying coupon:", code, "Found:", found);

      if (found) {
        resolve(found);
      } else {
        reject(rejectWithValue("Invalid coupon code."));
      }
    }, 1000);
  });
});

const initialState: CouponState = {
  coupon: null,
  loading: false,
  error: null,
  success: null,
};
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetCoupon(state) {
      state.coupon = null;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload;
        state.success = `Coupon applied successfully! You get ${action.payload.discount}% off.`;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong.";
      });
  },
});

export const getCoupon = (state: RootState) => state.coupon.coupon;
export const getCouponLoading = (state: RootState) => state.coupon.loading;
export const getCouponError = (state: RootState) => state.coupon.error;
export const getCouponSuccess = (state: RootState) => state.coupon.success;
export const getCouponState = (state: RootState) => state.coupon;
export const getCouponCode = (state: RootState) =>
  state.coupon.coupon ? state.coupon.coupon.code : null;
export const getCouponDiscount = (state: RootState) =>
  state.coupon.coupon ? state.coupon.coupon.discount : null;
export const getCouponApplied = (state: RootState) =>
  state.coupon.coupon !== null;

export const getCouponByCode = (code: string) =>
  validCoupons.find((c) => c.code === code) ?? null;
export const getDiscountedTotal = (state: RootState, total: number) => {
  const coupon = state.coupon.coupon;
  if (!coupon) return total;
  return coupon.type === "percent"
    ? total - (total * coupon.discount) / 100
    : total - coupon.discount;
  //   return total - (total * coupon.discount) / 100;
};
export const getCouponMessage = (state: RootState) =>
  state.coupon.success || state.coupon.error || null;

export const { resetCoupon } = couponSlice.actions;
export default couponSlice.reducer;
