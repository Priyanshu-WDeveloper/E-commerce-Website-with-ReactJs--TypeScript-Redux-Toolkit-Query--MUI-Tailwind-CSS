import { Box, Typography, Button, Checkbox } from "@mui/material";
import React from "react";

interface Props {
  selected: boolean;
  onSelect: () => void;
  code: string;
  discountText: string;
  minCartAmount: number;
  expiry: string;
  eligible: boolean;
  savings: number;
  remainingAmount: number;
}

const CouponCard: React.FC<Props> = ({
  selected,
  onSelect,
  code,
  discountText,
  minCartAmount,
  expiry,
  eligible,
  savings,
  remainingAmount,
}) => {
  return (
    <Box
      border={1}
      borderColor={selected ? "primary.main" : "grey.300"}
      borderRadius={2}
      p={2}
      mb={2}
      display="flex"
      gap={2}
      alignItems="flex-start"
    >
      <Checkbox checked={selected} onChange={onSelect} />
      <Box flexGrow={1}>
        <Button variant="outlined" size="small" sx={{ mb: 1 }}>
          {code}
        </Button>
        <Typography variant="body2">
          Save ₹{savings} — {discountText}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Expires on: {expiry}
        </Typography>
        {!eligible && (
          <Typography variant="caption" color="error">
            Shop for ₹{remainingAmount} more to apply.
          </Typography>
        )}
        <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
          View applicable items &gt;
        </Typography>
      </Box>
    </Box>
  );
};

export default CouponCard;
