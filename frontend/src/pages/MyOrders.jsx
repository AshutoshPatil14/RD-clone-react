import "../styles/my-account.css";

// Orders page
const MyOrders = () => {
  return (
    <div className="orders-container">
      <div className="heading">
        <h2>My Orders</h2>
        <select name="order_type" id="order_type">
          <option value="all_orders">All Orders</option>
          <option value="ordered">Ordered</option>
          <option value="under_process">Under Process</option>
          <option value="shipped">Shipped</option>
          <option value="returned">Returned</option>
          <option value="cancelled">Cancelled</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="order-details">
        <div className="order-details-bar">
          <span>No of items in list: 2</span>
          <p>Order Total: ₹97,998.00</p>
        </div>

        <div className="order-details-card">
          <img
            src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/lDiLDzASGg-google-pixel9a-5g-494494547-i-1-1200wx1200h.jpeg"
            alt="Product"
          />
          <div className="product-details">
            <p>Google Pixel 9a, 256 GB, 8 GB RAM, Obsidian, Mobile Phone</p>
            <h4>₹49,999.00</h4>
            <span>Qty: 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;