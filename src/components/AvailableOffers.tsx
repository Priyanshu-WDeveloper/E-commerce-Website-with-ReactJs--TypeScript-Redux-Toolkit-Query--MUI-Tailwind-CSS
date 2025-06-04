import { useState } from "react";
import { Typography, Collapse, Button, Box, Paper } from "@mui/material";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
const offers = [
  "10% Instant Discount on Axis Bank Credit Cards, Flipkart Axis Bank Credit Card & Axis Bank Credit Caro EMI on a min spend of ₹3,500, TCA",
  "10% Instant Discount on ICICI Bank Credit Cards & Debit Cards on a min spend of ₹3,500, TCA",
  "10% Instant Discount on ICICI Bank Netbanking on a min spend of ₹3,000, TCA",
  "100% Instant Discount on Kotak Bank Credit Cards & Credit Card EMI on a min spend of ₹3,500, TCA",
  "10% Instant Discount on IDFC FIRST SWYP Credit Card on a min spend of ₹850 (Applicable only on Myntra FWD Roller Products), TCA",
  "10% Instant Discount on HDFC Bank Credit & Debit Cards EMI on a min spend of ₹3,500, TCA",
  "100% Instant Discount on HSBC Credit Cards on a min spend of ₹5,000, TCA",
  "7.5% Instant Discount up to ₹1,750 on every spend with Myntra Kulak Credit Card, TCA",
  "Assured Flat ₹20 Cashback on Paytm UPI transaction on a min spend of ₹750, TCA",
  "Flat ₹40 Cashback on BAJAJ UPI Transactions on a min spend of ₹1,999, TCA",
  "Up to ₹1,500 Cashback on RuPay Credit card via PhonePe UPI on Myntra on a min spend of ₹1,000, TCA",
  "Assured up to ₹300 Cashback on Paytm UPI transaction on min spend of ₹530, TCA",
  "Get ₹750–₹7,900 Assured Cashback on min transaction of ₹1,000 via RuPay Credit Card with Paytm UPI, TCA",
  "Get up to ₹399 Cashback on CRED UPI on a min spend of ₹500, TCA",
  "Get up to ₹500 Cashback on RuPay Credit Card transaction via CRED UPI on a min spend of ₹1,000, TCA",
  "Get Assured ₹230 Cashback on Freecharge UPI on a min spend of ₹1,995, TCA",
  "Get up to ₹500 cashback on Mobikwik Wallet transaction on a min spend of ₹1,500, TCA",
  "Get up to ₹250 Cashback on Mobikwik UPI on a min spend of ₹1,999, TCA",
  "Flat ₹200 Assured Cashback on first-ever transaction using Mobikwik UPI on a min spend of ₹2,500, TCA",
];

const AvailableOffers = () => {
  const [showAll, setShowAll] = useState(false);
  const initialVisibleCount = 2;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box display="flex" alignItems="center" mb={1}>
        <LocalOfferIcon sx={{ fontSize: 20 }} />
        <Typography variant="body1" fontWeight="bold" ml={1}>
          Available Offers
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          p: "16px 16px 0px 16px",
        }}
      >
        {(showAll ? offers : offers.slice(0, initialVisibleCount)).map(
          (offer, index) => (
            <Typography
              key={index}
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
            >
              • {offer}
            </Typography>
          )
        )}

        <Collapse in={showAll}>
          {offers.slice(initialVisibleCount).map((offer, index) => (
            <Typography
              key={index + initialVisibleCount}
              variant="body2"
              gutterBottom
            >
              • {offer}
            </Typography>
          ))}
        </Collapse>

        <Button
          size="small"
          onClick={() => setShowAll(!showAll)}
          sx={{ mt: 1, fontWeight: "bold", textTransform: "none" }}
        >
          {showAll ? "Show Less " : "Show More "}
          {showAll ? (
            <MdExpandLess className="text-base ml-1" />
          ) : (
            <MdExpandMore className="text-base ml-1" />
          )}{" "}
        </Button>
      </Box>
    </Paper>
  );
};

export default AvailableOffers;
