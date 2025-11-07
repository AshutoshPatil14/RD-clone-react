import React from "react";
import "../styles/product-page.css";

const ProductPage = () => {
  return (
    <div>
      <section class="product-container">
        {/* left product view  */}
        <div class="product-images">
          <div class="display-img">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:450/lDiLDzASGg-google-pixel9a-5g-494494547-i-1-1200wx1200h.jpeg"
              alt=""
            />
          </div>
          {/* <div class="secondary-img">
                        <img src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:450/lDiLDzASGg-google-pixel9a-5g-494494547-i-1-1200wx1200h.jpeg"
                            alt=""/>
                        <img src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:75/R_b1-J6pSa-google-pixel9a-5g-494494547-i-11-1200wx1200h.jpeg"
                            alt=""/>
                        <img src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:460/L7XiejZw91-google-pixel9a-5g-494494547-i-15-1200wx1200h.jpeg"
                            alt=""/>
                    </div> */}
        </div>

        {/* right product view  */}
        <div class="product-details">
          <div class="price-details">
            <h3>Google Pixel 9a, 256 GB, 8 GB RAM, Obsidian, Mobile Phone</h3>
            <h3>
              MRP <span>₹49,999</span>
            </h3>
            <p>MRP (Inclusive of all taxes)</p>
          </div>
          <div class="location-details">
            <h3>Delivery Related</h3>
            <div class="delivery-info">
              <img
                src="../icons/location_on_24dp_0000F5_FILL1_wght400_GRAD0_opsz24.svg"
                alt=""
              />
              <input
                type="tel"
                name="pincode"
                id="pincode"
                placeholder="Enter your pincode"
                required
              />
              <button>Check</button>
            </div>
          </div>
          <div class="buy-now">
            <button class="add-to-cart-btn">Add to Cart</button>
            <button class="buy-now-btn">Buy Now</button>
          </div>
          <div class="offer-section">
            <h3>Offers Available</h3>
            <div class="offers">
              <div class="offer">
                <div class="offer-title">
                  <img
                    src="../icons/shoppingmode_24dp_75FBFD_FILL1_wght400_GRAD0_opsz24.svg"
                    alt=""
                  />
                  <h4>No Cost EMI</h4>
                </div>
                <div class="offer-details">
                  <p>
                    EMI starts from ₹3,049.04/month Cashback discount of
                    ₹6,112.52
                  </p>
                </div>
              </div>
              <div class="offer">
                <div class="offer-title">
                  <img
                    src="../icons/account_balance_24dp_75FBFD_FILL1_wght400_GRAD0_opsz24.svg"
                    alt=""
                  />
                  <h4>Payment Page Offers</h4>
                </div>
                <div class="offer-details">
                  <p>10% Instant Discount upto 3000 with SBI Credit EMI</p>
                </div>
              </div>
              <div class="offer">
                <div class="offer-title">
                  <img
                    src="../icons/redeem_24dp_75FBFD_FILL1_wght400_GRAD0_opsz24.svg"
                    alt=""
                  />
                  <h4>Cart Promotions</h4>
                </div>
                <div class="offer-details">
                  <p>Get Rs.1000 off. Click on ADD TO CART or Buy Now</p>
                </div>
              </div>
            </div>
          </div>

          <div class="product-description">
            <h3>Product Description</h3>
            <p>
              The Google Pixel 9a is a powerful smartphone that combines
              cutting-edge technology with a sleek design. It features a
              stunning 6.1-inch OLED display, powered by the latest Google
              Tensor G3 processor, ensuring smooth performance and vibrant
              visuals. With 256 GB of storage and 8 GB of RAM, you can store all
              your favorite apps, photos, and videos without worry.
            </p>
            <p>
              Capture stunning photos with the advanced dual-camera system,
              featuring a 50 MP main camera and a 12 MP ultra-wide lens. The
              Pixel 9a also supports 5G connectivity, allowing you to enjoy
              lightning-fast internet speeds.
            </p>
          </div>

          <div class="product-specifications">
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
    </div>
  );
};

export default ProductPage;
