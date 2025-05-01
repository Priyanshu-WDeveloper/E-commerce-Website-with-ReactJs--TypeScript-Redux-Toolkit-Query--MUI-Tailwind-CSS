// import { MenuList } from "../data/data";
// import Layout from "./../components/Layout/Layout";
// import {
//   Box,
//   Typography,
// } from "@mui/material";
// import Sidebar from "../Sidebar";
// import { Outlet } from "react-router-dom";
// import TopSellers from "../TopSellers";
// import PopularBlogs from "../PopularBlogs";
// import Header from "../components/Layout/Header";

// const Menu = () => {
//   return (
//     <>
//       <Header />
//       <Box className="flex h-screen mt-8">
//         <Box className="flex flex-col" style={{ flex: '0 0 250px' }}>
//           <Sidebar />
//         </Box>
//         <Box className="flex-grow flex justify-center flex-wrap">
//           <Outlet /> {/* This renders MainContent or ProductPage based on nested routes */}
//         </Box>
//         <Box className="flex flex-col" style={{ flex: '0 0 300px' }}>
//           <TopSellers />
//           <PopularBlogs />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Menu;

// import { MenuList } from "../data/data";
// import Layout from "../components/Layout/Layout";
import {
  Box,
  // Card,
  // CardActionArea,
  // CardContent,
  // CardMedia,
  // Typography,
} from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import TopSellers from "./TopSellers";
import PopularBlogs from "./PopularBlogs";
// import ProductPage from "./ProductPage";
// import MainContent from "./MainContent";
import Header from "../components/Layout/Header";
import CartTab from "../components/CartTab";

const Menu = () => {
  return (
    <>
      <Header />
      <Box className="flex h-screen mt-18">
        <Box className="rounded w-full flex justify-center flex-wrap">
          {/* <MainContent /> */}
          <Outlet />{" "}
          {/* This renders MainContent or ProductPage based on nested routes */}
        </Box>

        {/* <Box className="fixed right-0 top-0 shadow-lg overflow-y-auto"> */}
        <Box>
          <CartTab />
          <TopSellers />
          <PopularBlogs />
        </Box>
      </Box>
    </>
  );
};

export default Menu;
