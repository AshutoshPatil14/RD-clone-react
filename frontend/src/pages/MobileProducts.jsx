import React from "react";
import { Link } from "react-router-dom";
import "../styles/mobile-product-page.css";

// Mobile product listing with filters (visual only)
const MobileProducts = () => {
  return (
    <div className="mobile-products">
      <section>
        <div className="actual-body">
          {/* Left: filter pane (non-functional stubs) */}
          <div className="filter-pane">
            <h4>Filters</h4>
            {["Available","Price","Brand","Internal Storage","Screen Size","RAM","Processor","Operating System Type","Display Type","Color","Series"].map(
              (name, idx) => (
                <div className="filters-section" key={idx}>
                  <div className="filter-name-bar">
                    <p>{name}</p>
                    <img
                      src={
                        idx === 0
                          ? "/icons/keyboard_arrow_up_24dp_434343_FILL0_wght400_GRAD0_opsz24.svg"
                          : "/icons/keyboard_arrow_down_24dp_434343_FILL0_wght400_GRAD0_opsz24.svg"
                      }
                      alt="toggle"
                    />
                  </div>
                  {idx === 0 && (
                    <div className="sub-filter-name">
                      <input type="checkbox" id="available" />
                      <label htmlFor="available">Available</label>
                    </div>
                  )}
                  {name === "Price" && (
                    <>
                      <div className="slider-track">
                        <div className="thumb left"></div>
                        <div className="thumb right"></div>
                      </div>
                      <div className="price-values">
                        <span>₹6,498</span>
                        <span>₹72,790</span>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
          </div>

          {/* Right: product grid */}
          <div className="products-pane">
            <div className="sort-bar">
              <div>
                <h4>Great Deals On Smartphones</h4>
              </div>
              <div>
                <button>
                  <img
                    src="/icons/swap_vert_24dp_434343_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Sort"
                  />
                  Sort
                </button>
              </div>
            </div>
            <div className="product-display">
              {/* Example cards; first links to a single product route */}
              <Link to="/mobiles/pixel-9a">
                <div className="product-card">
                  <img
                    src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/lDiLDzASGg-google-pixel9a-5g-494494547-i-1-1200wx1200h.jpeg"
                    alt="Google Pixel 9a"
                  />
                  <p>Google Pixel 9a, 256 GB, 8 GB RAM, Obsidian, Mobile Phone</p>
                  <h3>₹49,999.00</h3>
                </div>
              </Link>

              {[
                {
                  img:
                    "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/lvHPX3IZ-i-googlegoogle-pixel-8a-494422665-i-1-1200wx1200h.jpeg",
                  p: "Google Pixel 8a 128 GB, 8 GB RAM, Porcelain, Mobile Phone",
                  price: "₹37,999.00",
                  off: "28% OFF",
                },
                {
                  img:
                    "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/Yjp_A80jVJ-samsung-s-series-mobile-phone-494352139-i-1-1200wx1200h.jpeg",
                  p: "Samsung S24 5G 256 GB, 8 GB RAM, Onxy Black, Mobile Phone",
                  price: "₹70,999.00",
                  off: "11% OFF",
                },
                {
                  img:
                    "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/TpI17D6p5b-apple-mlpf3hn-a-smart-phone-491997699-i-1-1200wx1200h.jpeg",
                  p: "Apple iPhone 13 128 GB, Midnight (Black)",
                  price: "₹44,700.00",
                  off: "10% OFF",
                },
                {
                  img:
                    "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UclHZnZ2-R-apple-iphone-16-494423016-i-1-1200wx1200h.jpeg",
                  p: "Apple iPhone 16 128 GB, Ultramarine",
                  price: "₹70,690.00",
                  off: "12% OFF",
                },
                {
                  img:
                    "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/5GaQTrQ4Wi-apple-iphone-15-128gb-blue-493839312-i-1-1200wx1200h.jpeg",
                  p: "Apple iPhone 15 128GB Blue",
                  price: "₹61,490.00",
                  off: "12% OFF",
                },
              ].map((item, i) => (
                <a href="#" key={i}>
                  <div className="product-card">
                    <img src={item.img} alt="Smartphones" />
                    <p>{item.p}</p>
                    <h3>
                      {item.price}
                      <span>{item.off}</span>
                    </h3>
                    <h5>MRP shown for reference</h5>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileProducts;