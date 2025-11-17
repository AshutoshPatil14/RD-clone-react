import "../styles/my-account.css";

// Delivery addresses page
const MyAddresses = () => {
  return (
    <div className="addresses-container">
      <h2>My Delivery Addresses</h2>
      <div className="delivery-content">
        <div className="address-card">
          <h4>Ashutosh Patil</h4>
          <p>Pride City, Borgaon Road</p>
          <p>Pen, Raigad, Maharashtra – 402107</p>
          <p>Mobile: +91 9130747809</p>
          <div className="address-actions">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>

        <div className="address-card">
          <h4>Work</h4>
          <p>3rd Floor, TechPark Tower</p>
          <p>Navi Mumbai, Maharashtra – 400703</p>
          <p>Mobile: +91 9130747809</p>
          <div className="address-actions">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddresses;