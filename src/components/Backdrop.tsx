// LoadingBackdrop.tsx

import { Backdrop } from "@mui/material";

const LoadingBackdrop = () => (
  <Backdrop
    open
    sx={{
      color: "#fff",
      backgroundColor: "rgba(0,0,0,0.3)",
      // backgroundColor: "white",
      backdropFilter: "blur(6px)",
      // zIndex: (theme) => theme.zIndex.modal + 1, // Make it top-level
      zIndex: 9999,
      position: "fixed", // KEY PART
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
    }}
  >
    {/* <CircularProgress color="inherit" /> */}
    <img src="/loaading.gif" alt="Loading..." width="120px" />
  </Backdrop>
);

export default LoadingBackdrop;
