import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleProductPage from "./pages/SingleProductPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditProductPage from "./pages/EditProductPage";
import MyAccount from "./pages/MyAccount";
import Payment from "./pages/Payment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import api from "./api/axiosConfig";
import { loginSuccess } from "./features/authSlice";
import { useEffect, useCallback } from "react";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import ProductsAddedBySeller from "./pages/ProductsAddedBySeller";
import SearchResultsPage from "./pages/SearchResultsPage";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminUsers from "./admin/pages/AdminUsers";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getUserData = useCallback(async () => {
    try {
      const response = await api.get("/auth/get-current-user");

      if (response.status === 200) {
        dispatch(loginSuccess(response.data.user));
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch]);



  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, [user, getUserData]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Mobiles */}


        {/* Account */}
        <Route path="/account" element={<MyAccount />} />

        {/* Seller */}
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/view-products" element={<ProductsAddedBySeller />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/search" element={<SearchResultsPage />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
        {/* Payment */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
      <Footer />
      <Toaster
        position="top-right"
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
