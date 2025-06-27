import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { applyCoupon, clearMessages } from "../../reducers/coupon";
import type { RootState, AppDispatch } from "../../app/store";

interface ApplyCouponModalProps {
  open: boolean;
  onClose: () => void;
}

const ApplyCouponModal: React.FC<ApplyCouponModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, success, appliedCoupon } = useSelector(
    (state: RootState) => state.coupon
  );

  const [couponCode, setCouponCode] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setCouponCode("");
      dispatch(clearMessages());
    }
  }, [open, dispatch]);

  const handleApply = () => {
    if (!couponCode.trim()) return;
    dispatch(applyCoupon(couponCode));
  };

  const handleClose = () => {
    dispatch(clearMessages());
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Apply Coupon
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Coupon Code"
          variant="outlined"
          fullWidth
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          autoFocus
          error={!!error}
          helperText={error || "Enter your coupon code here"}
        />
        {success && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            {success}
          </Typography>
        )}
        {appliedCoupon && (
          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            Applied Coupon: <strong>{appliedCoupon}</strong>
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleApply} variant="contained" color="primary">
          Apply
        </Button>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyCouponModal;
