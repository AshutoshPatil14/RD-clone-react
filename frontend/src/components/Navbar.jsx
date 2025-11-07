import React from "react";
import "../styles/navbar.css"



const Navbar = () => {
  return (
    <div className="header">
      <div className="upper-header">
        <div className="text-navs">
          <a href="">Orders</a>
          <a href="">Contact us</a>
          <a href="">Resource Center</a>
          <a href="">Find a store</a>
        </div>
        <div className="search-bar-section">
          <div className="logo">
            <a href="/">
              <img src="./src/assets/images/logo-white.webp" alt="Reliance Digital Logo" />
            </a>
          </div>
          <div className="search-bar">
            <img src="./src/assets/icons/search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="Search" />
            <input type="text" placeholder="Search Products & Brands" />
          </div>
          <div className="profile-items">
            <div className="profile-item">
              <a href="../html/login.html">
                <img
                  src="./src/assets/icons/person_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg"
                  alt="Account"
                />
                <span>Login</span>
              </a>
            </div>
            <div className="profile-item">
              <a href="../html/my-wishlist.html">
                <img
                  src="./src/assets/icons/favorite_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg"
                  alt="Wishlist"
                />
                <span>Wishlist</span>
              </a>
            </div>
            <div className="profile-item">
              <a href="../html/cart.html">
                <img
                  src="./src/assets/icons/shopping_cart_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg"
                  alt="Cart"
                />
                <span>Cart</span>
              </a>
            </div>
          </div>
        </div>
        <div className="middle-header">
          <div className="mobile-search-bar">
            <img src="../src/assets/icons/search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
            <input type="text" placeholder="Search Products & Brands" />
          </div>
          <div className="mic-icon">
            <img src="../src/assets/icons/mic_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="lower-header">
        <nav>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/jJc56F0NF-menu_Mobiles.png"
              alt=""
            />
            <a href="./mobile-section.html">MOBILES</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/ro7KmfkN_-menu_Television.png"
              alt=""
            />
            <a href="">TELEVISIONS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/HAT8U8-9N-Primary-Menu.jpeg"
              alt=""
            />
            <a href="">WASHING MACHINES</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/MO-msO1GU-menu_Laptop.png"
              alt=""
            />
            <a href="">LAPTOPS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/GhVsBI1rO-Primary-Menu.png"
              alt=""
            />
            <a href="">SMALL APPLIANCES</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/6kAylQ0cV-menu_Accessories.png"
              alt=""
            />
            <a href="">AIR CONDITIONERS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/LXuLXjYf5-menu_Earphones.png"
              alt=""
            />
            <a href="">EARPHONES</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/2DoKFV_Ss-Primary-Menu.jpeg"
              alt=""
            />
            <a href="">TABLETS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/mXaE3y_7l-menu_Kitchen-Appliances.png"
              alt=""
            />
            <a href="">REFRIGERATORS</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/TvMZUb1Xg-Primary-Menu.png"
              alt=""
            />
            <a href="">SMART WATCHES</a>
          </div>
          <div className="header-navs">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/TvinFGkVU-Primary-Menu.png"
              alt=""
            />
            <a href="">ALL CATEGORIES</a>
          </div>
        </nav>
        <div className="filter">
          <button>Filter by Categories</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
