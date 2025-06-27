import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

const GiftSectionModal = ({ open, onClose }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleClaim = () => {
    alert(
      `Gift Package Added!\nSubject: ${subject || "(empty)"}\nMessage: ${
        message || "(empty)"
      }`
    );
    setSubject("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 22 }}>
        🎁 Personalize Your Gift Message
        <IconButton
          aria-label="close"
          onClick={onClose}
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

      <Divider />

      <DialogContent dividers sx={{ pt: 3 }}>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
          sx={{ color: "#f44336" }}
        >
          <CardGiftcardIcon sx={{ fontSize: 80 }} />
        </Box>

        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 3, color: "text.secondary" }}
        >
          Add a heartfelt message along with your gift package to make it truly
          special.
        </Typography>

        <TextField
          label="Subject"
          placeholder="Write a short subject"
          fullWidth
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          sx={{ mb: 3 }}
          inputProps={{ maxLength: 50 }}
        />

        <TextField
          label="Message"
          placeholder="Write your personal message here..."
          fullWidth
          variant="outlined"
          multiline
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mb: 3 }}
          inputProps={{ maxLength: 300 }}
        />

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          onClick={handleClaim}
          disabled={!subject.trim() && !message.trim()}
        >
          Add Gift Package
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GiftSectionModal;
