import React from "react";
import { Link } from "react-router-dom";
import "../styles/cart.css";

// Cart page with two sample items and summary
const Cart = () => {
  return (
    <main>
      <div className="cart-container">
        <div className="cart-heading">
          <div className="cart-title">
            <h2>My Cart</h2>
            <p>(2 items)</p>
          </div>
          <div className="empty-cart">
            <button>
              <img src="/icons/delete_24dp_000093_FILL0_wght400_GRAD0_opsz24.svg" alt="delete" />
              <p>Empty Cart</p>
            </button>
          </div>
        </div>

        <div className="cart-body">
          {/* Left: items */}
          <div className="left-body">
            {[1, 2].map((n) => (
              <div className="cart-item-card" key={n}>
                <div className="card-upper-part">
                  <div className="item-img">
                    <img
                      src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/lDiLDzASGg-google-pixel9a-5g-494494547-i-1-1200wx1200h.jpeg"
                      alt="Product"
                    />
                    <div className="item-quantity">
                      <button className="decrease-btn">-</button>
                      <span className="quantity">1</span>
                      <button className="increase-btn">+</button>
                    </div>
                  </div>
                  <div className="item-details">
                    <div className="item-description">
                      <h3>Google Pixel 9a, 256 GB, 8 GB RAM, Obsidian, Mobile Phone</h3>
                      <h2>₹49,999.00</h2>
                      <p>
                        MRP <span>(Inclusive of all taxes)</span>
                      </p>
                      <div className="delivery-info">
                        <img
                          src="/icons/delivery_truck_speed_24dp_1ECCB0_FILL1_wght400_GRAD0_opsz24.svg"
                          alt="delivery"
                        />
                        <p>Free Delivery by Tomorrow</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-lower-part">
                  <button className="save-btn">Move to Wishlist</button>
                  <button className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: summary */}
          <div className="right-body">
            <div className="apply-coupon">
              <button>
                <div className="apply-coupon-btn">
                  <img src="/icons/local_activity_24dp_3535F3_FILL1_wght400_GRAD0_opsz24.svg" alt="coupon" />
                  <h4>Apply Coupon Code</h4>
                </div>
                <img src="/icons/keyboard_arrow_right_24dp_3535F3_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              </button>
            </div>
            <div className="payment-section">
              <h4 className="payment-description-box2">Payment Summary</h4>
              <div className="payment-description-box">
                <p>Price (2 items)</p>
                <p>₹99,998</p>
              </div>
              <div className="payment-description-box">
                <span>Promotion</span>
                <p>-₹2,000</p>
              </div>
              <div className="payment-description-box">
                <span>Delivery Charges</span>
                <p>₹0</p>
              </div>
              <div className="payment-description-box2">
                <p>Total</p>
                <p>₹97,998</p>
              </div>
              <div className="payment-description-box3">
                <div className="payment-description-box4">
                  <p>2 items</p>
                  <span>₹97,998</span>
                </div>
                <div>
                  <Link to="/payment">
                    <button>Checkout</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;