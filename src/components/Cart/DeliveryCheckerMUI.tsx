import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import CloseIcon from "@mui/icons-material/Close";
import {
  useCheckDeliveryQuery,
  useSuggestPincodesQuery,
} from "../../services/delivery";
import OrderButton from "../Buttons/OrderButton";

const DeliveryCheckerMUI = () => {
  const [pincode, setPincode] = useState("");
  const [triggered, setTriggered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const { data: suggestionsData } = useSuggestPincodesQuery(pincode, {
    skip: pincode.length < 3,
  });

  const suggestions = React.useMemo(() => {
    if (!suggestionsData) return [];
    if (Array.isArray(suggestionsData)) return suggestionsData;
    if (
      suggestionsData?.data?.results &&
      Array.isArray(suggestionsData.data.results)
    ) {
      return suggestionsData.data.results;
    }
    if (Array.isArray(suggestionsData?.data)) return suggestionsData.data;
    if (Array.isArray(suggestionsData?.suggestions))
      return suggestionsData.suggestions;
    return [];
  }, [suggestionsData]);

  const { data, error, isFetching } = useCheckDeliveryQuery(pincode, {
    skip: !triggered,
  });
  console.log("Delivery Checker Data:", data);

  const handleCheck = () => {
    if (/^\d{6}$/.test(pincode)) {
      setTriggered(true);
      setOpen(false); // Close modal after submission
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, maxWidth: 900, mx: "auto", mb: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 0 }}
        >
          <Typography variant="body1">
            {data?.data?.pin?.pincode ? (
              <>
                <Typography variant="body1" component="span">
                  {" "}
                  Deliver to:
                </Typography>
                <strong>
                  {" "}
                  {data?.data?.pin?.pincode} - {data?.data?.pin?.area}
                </strong>
              </>
            ) : (
              `Check delivery time & services`
            )}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleOpenModal}
          >
            {data?.data?.pin?.pincode ? `CHANGE PIN CODE` : ` ENTER PIN CODE`}
          </Button>
        </Box>

        {triggered && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {isFetching
              ? "Loading..."
              : error
              ? "Delivery not available for this pincode."
              : data?.data?.pin?.message}
          </Typography>
        )}
      </Paper>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
            boxShadow: 10,
            overflow: "visible",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1.25rem",
            pb: 2,
          }}
        >
          Enter Your Pincode
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Get accurate delivery times and services for your location.
          </Typography> */}

          <Autocomplete
            freeSolo
            options={suggestions}
            inputValue={pincode}
            onInputChange={(e, val) => {
              setPincode(val);
              setTriggered(false);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pincode"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <RoomIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 4, mt: 1 }}
              />
            )}
          />
          <OrderButton
            onClick={handleCheck}
            disabled={isFetching}
            sx={{ width: "100%" }}
            size="large"
          >
            {isFetching ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Check Delivery"
            )}
          </OrderButton>
          {/* <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheck}
            disabled={isFetching}
            size="large"
            sx={{
              py: 1.5,
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
              boxShadow: 2,
            }}
          >
            {isFetching ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Check Delivery"
            )}
          </Button> */}
        </DialogContent>
      </Dialog>
      {/* <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogTitle>
          Enter Your Pincode
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Autocomplete
            freeSolo
            options={suggestions}
            inputValue={pincode}
            onInputChange={(e, val) => {
              setPincode(val);
              setTriggered(false);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter Pincode"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <RoomIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            )}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheck}
            disabled={isFetching}
          >
            {isFetching ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Check Delivery"
            )}
          </Button>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default DeliveryCheckerMUI;
