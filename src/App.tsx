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
import Address from "./components/Address";
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
          <Route path="address" element={<Address />} />
        </Route>

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </Router>
  );
}

export default App;
