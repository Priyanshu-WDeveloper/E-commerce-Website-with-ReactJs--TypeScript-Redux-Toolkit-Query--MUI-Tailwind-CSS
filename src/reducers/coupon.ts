import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CouponState {
  appliedCoupon: string | null;
  error: string | null;
  success: string | null;
}

const initialState: CouponState = {
  appliedCoupon: null,
  error: null,
  success: null,
};

const validCoupons = ["DISCOUNT10", "SAVE20", "FREESHIP"];

const couponSlices = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    applyCoupon(state, action: PayloadAction<string>) {
      const code = action.payload.toUpperCase().trim();
      if (validCoupons.includes(code)) {
        state.appliedCoupon = code;
        state.success = `Coupon "${code}" applied successfully! 🎉`;
        state.error = null;
      } else {
        state.error = "Invalid coupon code 😕";
        state.success = null;
        state.appliedCoupon = null;
      }
    },
    clearMessages(state) {
      state.error = null;
      state.success = null;
    },
    clearCoupon(state) {
      state.appliedCoupon = null;
      state.error = null;
      state.success = null;
    },
  },
});

export const { applyCoupon, clearMessages, clearCoupon } = couponSlices.actions;
export default couponSlices.reducer;
