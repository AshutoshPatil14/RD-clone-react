import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart as addProductToCartAPI } from "../api/cartAPI"; // Renamed to avoid conflict
import { addToCart as addProductToCartRedux } from "../features/cartSlice"; // Renamed to avoid conflict
import "../styles/single-mobile-product-page.css";

const SingleMobileProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Failed to fetch product details.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setError("");
      setMessage("Adding to cart...");
      const response = await addProductToCartAPI(product._id, quantity);
      dispatch(addProductToCartRedux({
        productId: product._id,
        name: product.name, // Assuming product has a name
        price: product.price, // Assuming product has a price
        imgUrl: product.imgUrl, // Assuming product has an image
        quantity: quantity,
      }));
      setMessage("Product added to cart successfully!");
    } catch (err) {
      setMessage("");
      setError("Failed to add product to cart. Please try again.");
      console.error("Frontend add to cart error:", err);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  if (loading) {
    return <div className="single-product-container">Loading product details...</div>;
  }

  if (error) {
    return <div className="single-product-container" style={{ color: 'red' }}>{error}</div>;
  }

  if (!product) {
    return <div className="single-product-container">Product not found.</div>;
  }

  return (
    <div className="single-product-container">
      <section className="product-container">
        {/* Left: product images */}
        <div className="product-images">
          <div className="display-img">
            <img
              src={product.imgUrl || "https://via.placeholder.com/450"} // Use product image or placeholder
              alt={product.name}
            />
          </div>
          {/* You might want to dynamically render secondary images based on product data */}
          <div className="secondary-img">
            <img
              src={product.imgUrl || "https://via.placeholder.com/75"}
              alt=""
            />
            <img
              src={product.imgUrl || "https://via.placeholder.com/75"}
              alt=""
            />
            <img
              src={product.imgUrl || "https://via.placeholder.com/75"}
              alt=""
            />
          </div>
        </div>

        {/* Right: product details */}
        <div className="product-details">
          <div className="price-details">
            <h3>{product.name}</h3>
            <h3>
              MRP <span>₹{product.price}</span>
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
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>

          {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

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
            <p>{product.description || "No description available."}</p>
          </div>

          {/* Specifications */}
          <div className="product-specifications">
            <h3>Product Specifications</h3>
            <ul>
              <li>
                <strong>Display:</strong> {product.display || "N/A"}
              </li>
              <li>
                <strong>Processor:</strong> {product.processor || "N/A"}
              </li>
              <li>
                <strong>RAM:</strong> {product.ram || "N/A"}
              </li>
              <li>
                <strong>Storage:</strong> {product.storage || "N/A"}
              </li>
              <li>
                <strong>Camera:</strong> {product.camera || "N/A"}
              </li>
              <li>
                <strong>Connectivity:</strong> {product.connectivity || "N/A"}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleMobileProduct;