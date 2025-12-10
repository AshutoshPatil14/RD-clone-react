import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { logout } from "../features/authSlice";
import toast from "react-hot-toast";

// Header/Navbar component replicating the HTML header structure
// Uses public assets under `/images` and `/icons` and React Router `Link`s
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.status === 200) {
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm.trim()}`);
    }
  };

  return (
    <header>
      {/* Upper header: small text links */}
      <div className="upper-header">
        {/* Search/logo/profile strip */}
        <div className="search-bar-section">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo-white.webp" alt="Reliance Digital Logo" />
            </Link>
          </div>
          <div className="search-bar">
            <img
              src="/icons/search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
              alt="Search"
              onClick={handleSearchSubmit}
              style={{ cursor: "pointer" }}
            />
            <input
              type="text"
              placeholder="Search Products & Brands"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
          </div>
          <div className="profile-items">
            {!user && (
              <div className="profile-item">
                <Link to="/login">
                  <img
                    src="/icons/person_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg"
                    alt="Account"
                  />
                  <span>Login</span>
                </Link>
              </div>
            )}
            {user?.role === "seller" && (
              <div className="profile-item">
                <Link to="/add-product">
                  <img
                    src="/icons/box_add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Add Product"
                  />
                  <span>Add Product</span>
                </Link>
              </div>
            )}
            {user?.role === "seller" && (
              <div className="profile-item">
                <Link to="/view-products">
                  <img
                    src="/icons/view_agenda_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="View Products"
                  />
                  <span>View Products</span>
                </Link>
              </div>
            )}
            {user && (
              <div className="profile-item">
                <Link to="/account">
                  <img
                    src="/icons/person_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg"
                    alt="Account"
                  />
                  <span>Account</span>
                </Link>
              </div>
            )}
            {user?.role === "user" && (
              <div className="profile-item">
                <Link to="/cart">
                  <img
                    src="/icons/shopping_cart_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg"
                    alt="Cart"
                  />
                  <span>Cart</span>
                </Link>
              </div>
            )}
            {user && (
              <div className="profile-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                <img src="/icons/logout_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Logout" />
                <span>Logout</span>
              </div>
            )}
          </div>
        </div>
        {/* Mobile search bar and mic icon */}
        <div className="middle-header">
          <div className="mobile-search-bar">
            <img
              src="/icons/search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
              alt="Search"
              onClick={handleSearchSubmit}
              style={{ cursor: "pointer" }}
            />
            <input
              type="text"
              placeholder="Search Products & Brands"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
          </div>
          <div className="mic-icon">
            <img src="/icons/mic_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
          </div>
        </div>
      </div>

      {/* Lower header: category navigation */}
      <div className="lower-header">
        <nav>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/TvinFGkVU-Primary-Menu.png"
              alt="All Categories"
            />
            <Link to="/all-products">ALL PRODUCTS</Link>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/jJc56F0NF-menu_Mobiles.png"
              alt="Mobiles"
            />
            <Link to="/mobiles">MOBILES</Link>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/ro7KmfkN_-menu_Television.png"
              alt="Televisions"
            />
            <a href="#">TELEVISIONS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/HAT8U8-9N-Primary-Menu.jpeg"
              alt="Washing Machines"
            />
            <a href="#">WASHING MACHINES</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/MO-msO1GU-menu_Laptop.png"
              alt="Laptops"
            />
            <a href="#">LAPTOPS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/GhVsBI1rO-Primary-Menu.png"
              alt="Small Appliances"
            />
            <a href="#">SMALL APPLIANCES</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/6kAylQ0cV-menu_Accessories.png"
              alt="Air Conditioners"
            />
            <a href="#">AIR CONDITIONERS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/LXuLXjYf5-menu_Earphones.png"
              alt="Earphones"
            />
            <a href="#">EARPHONES</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/2DoKFV_Ss-Primary-Menu.jpeg"
              alt="Tablets"
            />
            <a href="#">TABLETS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/mXaE3y_7l-menu_Kitchen-Appliances.png"
              alt="Refrigerators"
            />
            <a href="#">REFRIGERATORS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/TvMZUb1Xg-Primary-Menu.png"
              alt="Smart Watches"
            />
            <a href="#">SMART WATCHES</a>
          </div>
        </nav>
        <div className="filter">
          <button>Filter by Categories</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
