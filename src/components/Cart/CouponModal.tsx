import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Typography,
  Box,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  applyCoupon,
  resetCoupon,
  getCouponLoading,
  getCouponSuccess,
  getCouponError,
  getCouponApplied,
  getCouponDiscount,
} from "../../reducers/couponSlice";
import CouponCard from "./CouponCard";

// Simulate dynamic coupons with eligibility logic
const availableCoupons = [
  {
    code: "MYNTRASAVE",
    discountText: "15% off on minimum purchase of Rs. 300",
    minCartAmount: 300,
    expiry: "31st October 2025, 11:59 PM",
    savings: 36,
  },
  {
    code: "HOMEBUYMORE",
    discountText: "20% off",
    minCartAmount: 200,
    expiry: "31st December 2025, 11:59 PM",
    savings: 48,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  cartTotal: number;
}

const ApplyCouponModal: React.FC<Props> = ({ open, onClose, cartTotal }) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(getCouponLoading);
  const success = useAppSelector(getCouponSuccess);
  const error = useAppSelector(getCouponError);
  const applied = useAppSelector(getCouponApplied);
  const appliedDiscount = useAppSelector(getCouponDiscount);

  const [manualCode, setManualCode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const handleCheck = () => {
    if (manualCode.trim()) {
      dispatch(applyCoupon(manualCode.trim()));
    }
  };

  const handleApplySelected = () => {
    if (selectedCoupon) {
      dispatch(applyCoupon(selectedCoupon));
    }
  };

  const handleClose = () => {
    dispatch(resetCoupon());
    setManualCode("");
    setSelectedCoupon(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        APPLY COUPON
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" gap={1} alignItems="center" mb={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter coupon code"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value.toUpperCase())}
            disabled={applied}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCheck}
            disabled={!manualCode.trim() || loading || applied}
            sx={{ fontWeight: "bold" }}
          >
            CHECK
          </Button>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          UNLOCK COUPONS
        </Typography>

        {availableCoupons.map((coupon) => {
          const eligible = cartTotal >= coupon.minCartAmount;
          const remaining = Math.max(coupon.minCartAmount - cartTotal, 0);

          return (
            <CouponCard
              key={coupon.code}
              selected={selectedCoupon === coupon.code}
              onSelect={() =>
                setSelectedCoupon(
                  selectedCoupon === coupon.code ? null : coupon.code
                )
              }
              code={coupon.code}
              discountText={coupon.discountText}
              minCartAmount={coupon.minCartAmount}
              expiry={coupon.expiry}
              eligible={eligible}
              savings={coupon.savings}
              remainingAmount={remaining}
            />
          );
        })}
      </DialogContent>

      <DialogActions
        sx={{ display: "flex", justifyContent: "space-between", px: 3 }}
      >
        <Typography variant="subtitle2">
          Maximum savings: ₹{applied ? appliedDiscount : 0}
        </Typography>
        <Button
          variant="contained"
          disabled={!selectedCoupon || loading || applied}
          onClick={handleApplySelected}
        >
          APPLY
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyCouponModal;
