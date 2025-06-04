import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Pagenotfound from "./pages/Pagenotfound";
// import { Box } from "@mui/material";
// import TopSellers from "./pages/TopSellers";
// import PopularBlogs from "./pages/PopularBlogs";
// import Sidebar from "./pages/Sidebar";
import MainContent from "./pages/MainContent";
import ProductPage from "./pages/ProductPage";
import Analytics from "./pages/Analytics";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import LoginPage from "./pages/auth/Login";
import NoProductsFound from "./components/NoProductsFound";
// import CusBackdrop from "./components/Backdrop";
import LoadingBackdrop from "./components/Backdrop";
import OrderConfirmation from "./pages/Checkout";
import AddressPage from "./components/Address";
import PaymentPage from "./components/PaymentPage";
import SignupPage from "./pages/auth/SignUp";
// import ShoppingCart from "./components/Cart2";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/menu" element={<Menu />}>
          <Route index element={<MainContent />} />
          <Route path="product" element={<MainContent />} />
          <Route path="product/:id" element={<ProductPage />} />
          {/* </Route> */}
        </Route>
        <Route path="/checkout" element={<Checkout />}>
          <Route index element={<Cart />} />
          <Route path="cart" element={<Cart />} />
          {/* <Route path="cart2" element={<ShoppingCart />} /> */}
          <Route path="address" element={<AddressPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="confirmation" element={<OrderConfirmation />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/noProducts" element={<NoProductsFound />} />
        <Route path="/backdrop" element={<LoadingBackdrop />} />
      </Routes>
    </Router>
  );
}

export default App;
