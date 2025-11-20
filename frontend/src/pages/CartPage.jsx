import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../features/cartSlice";
import "../styles/cart.css"; // Assuming you have a cart.css for styling

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
  };

  return (
    <main>
      <div className="cart-container">
        <div className="cart-heading">
          <div className="cart-title">
            <h2>My Cart</h2>
            <p>({totalQuantity} items)</p>
          </div>
          {/* <div className="empty-cart">
            <button>
              <img src="/icons/delete_24dp_000093_FILL0_wght400_GRAD0_opsz24.svg" alt="delete" />
              <p>Empty Cart</p>
            </button>
          </div> */}
        </div>

        <div className="cart-body">
          {/* Left: items */}
          <div className="left-body">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item-card" key={item.productId}>
                  <div className="card-upper-part">
                    <div className="item-img">
                      <img src={item.imgUrl} alt={item.name} />
                      <div className="item-quantity">
                        <button
                          className="decrease-btn"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="increase-btn"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="item-details">
                      <div className="item-description">
                        <h3>{item.name}</h3>
                        <h2>₹{item.price}</h2>
                        {/* <p>
                          MRP <span>(Inclusive of all taxes)</span>
                        </p> */}
                      </div>
                      <button onClick={() => handleRemoveFromCart(item.productId)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: summary */}
          <div className="right-body">
            <div className="payment-section">
              <h3>PRICE DETAILS</h3>
              <div className="payment-description-box">
                <span>Price ({totalQuantity} items)</span>
                <p>₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="payment-description-box">
                <span>Discount</span>
                <p>-₹0.00</p>
              </div>
              <div className="payment-description-box">
                <span>Delivery Charges</span>
                <p>₹0</p>
              
              </div>
              <div className="payment-description-box2">
                <p>Total</p>
                <p>₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="payment-description-box3">
                <div className="payment-description-box4">
                  <p>{totalQuantity} items</p>
                  <span>₹{totalAmount.toFixed(2)}</span>
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

export default CartPage;