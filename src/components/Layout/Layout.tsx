import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Box } from "@mui/material";
interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: 0, // Remove any top margin
          // position: "relative",
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
