import React from "react";
import "../styles/single-mobile-product-page.css";

// Single mobile product detail page (visual only)
const SingleMobileProduct = () => {
  return (
    <main>
      <section className="product-container">
        {/* Left: product images */}
        <div className="product-images">
          <div className="display-img">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:450/lDiLDzASGg-google-pixel9a-5g-494494547-i-1-1200wx1200h.jpeg"
              alt="Google Pixel 9a"
            />
          </div>
          <div className="secondary-img">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:450/lDiLDzASGg-google-pixel9a-5g-494494547-i-1-1200wx1200h.jpeg"
              alt=""
            />
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:75/R_b1-J6pSa-google-pixel9a-5g-494494547-i-11-1200wx1200h.jpeg"
              alt=""
            />
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:460/L7XiejZw91-google-pixel9a-5g-494494547-i-15-1200wx1200h.jpeg"
              alt=""
            />
          </div>
        </div>

        {/* Right: product details */}
        <div className="product-details">
          <div className="price-details">
            <h3>Google Pixel 9a, 256 GB, 8 GB RAM, Obsidian, Mobile Phone</h3>
            <h3>
              MRP <span>₹49,999</span>
            </h3>
            <p>MRP (Inclusive of all taxes)</p>
          </div>

          <div className="location-details">
            <h3>Delivery Related</h3>
            <div className="delivery-info">
              <img
                src="/icons/location_on_24dp_0000F5_FILL1_wght400_GRAD0_opsz24.svg"
                alt="location"
              />
              <input type="tel" placeholder="Enter your pincode" required />
              <button>Check</button>
            </div>
          </div>

          <div className="buy-now">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>

          {/* Offers */}
          <div className="offer-section">
            <h3>Offers Available</h3>
            <div className="offers">
              {[
                {
                  icon: "/icons/shoppingmode_24dp_75FBFD_FILL1_wght400_GRAD0_opsz24.svg",
                  title: "No Cost EMI",
                  details:
                    "EMI starts from ₹3,049.04/month Cashback discount of ₹6,112.52",
                },
                {
                  icon: "/icons/account_balance_24dp_75FBFD_FILL1_wght400_GRAD0_opsz24.svg",
                  title: "Payment Page Offers",
                  details: "10% Instant Discount upto 3000 with SBI Credit EMI",
                },
                {
                  icon: "/icons/redeem_24dp_75FBFD_FILL1_wght400_GRAD0_opsz24.svg",
                  title: "Cart Promotions",
                  details: "Get Rs.1000 off. Click on ADD TO CART or Buy Now",
                },
              ].map((o, i) => (
                <div className="offer" key={i}>
                  <div className="offer-title">
                    <img src={o.icon} alt="offer" />
                    <h4>{o.title}</h4>
                  </div>
                  <div className="offer-details">
                    <p>{o.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="product-description">
            <h3>Product Description</h3>
            <p>
              The Google Pixel 9a is a powerful smartphone that combines cutting-edge technology with a sleek design.
              It features a stunning 6.1-inch OLED display, powered by the latest Google Tensor G3 processor.
            </p>
            <p>
              Capture stunning photos with the advanced dual-camera system, featuring a 50 MP main camera and a 12 MP
              ultra-wide lens. The Pixel 9a also supports 5G connectivity.
            </p>
          </div>

          {/* Specifications */}
          <div className="product-specifications">
            <h3>Product Specifications</h3>
            <ul>
              <li>
                <strong>Display:</strong> 6.1-inch OLED
              </li>
              <li>
                <strong>Processor:</strong> Google Tensor G3
              </li>
              <li>
                <strong>RAM:</strong> 8 GB
              </li>
              <li>
                <strong>Storage:</strong> 256 GB
              </li>
              <li>
                <strong>Camera:</strong> 50 MP (Main), 12 MP (Ultra-wide)
              </li>
              <li>
                <strong>Connectivity:</strong> 5G
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleMobileProduct;