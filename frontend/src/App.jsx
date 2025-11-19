import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MobileSection from "./pages/MobileSection";
import MobileProducts from "./pages/MobileProducts";
import SingleMobileProduct from "./pages/SingleMobileProduct";
import MyAccount from "./pages/MyAccount";
import MyOrders from "./pages/MyOrders";
import MyAddresses from "./pages/MyAddresses";
import MyWishlist from "./pages/MyWishlist";
import AccountPage from "./pages/AccountPage";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import api from "./api/axiosConfig";
import { loginSuccess } from "./features/authSlice";
import { useEffect } from "react";
import AddProduct from "./pages/AddProduct";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  async function getUserData() {
    try {
      const response = await api.get("/auth/get-current-user");
      console.log("user data", response.data);

      if (response.status === 200) {
        dispatch(loginSuccess(response.data.user));
        console.log("User object after loginSuccess:", response.data.user); // Added this line
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, [user]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Mobiles */}
        <Route path="/mobiles" element={<MobileSection />} />
        <Route path="/mobiles/all" element={<MobileProducts />} />
        <Route path="/mobiles/:slug" element={<SingleMobileProduct />} />
        {/* Account */}
        <Route path="/account" element={<MyAccount />} />
        <Route path="/account/orders" element={<MyOrders />} />
        <Route path="/account/addresses" element={<MyAddresses />} />
        {/* Payment */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failed" element={<PaymentFailed />} />
        {/* User */}
        <Route path="/wishlist" element={<MyWishlist />} />
        {/* Seller */}
        <Route path="/add-product" element={<AddProduct />} />
        {/* <Route path="/view-products" element={<ViewProducts />} /> */}
      </Routes>
      <Footer />
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
