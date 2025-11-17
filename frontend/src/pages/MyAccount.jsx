import "../styles/my-account.css";

// My Account page: profile details
const MyAccount = () => {
  return (
    <div className="profile-details-container">
      <div className="heading">
        <h2>My Profile</h2>
      </div>

      <div className="profile-details">
        <div className="profile-details-header">
          <p>Personal Details</p>
          <button className="edit-btn">
            <img src="/icons/edit_24dp_FFFFFF_FILL1_wght400_GRAD0_opsz24.svg" alt="edit" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="profilea_info">
          {[
            ["First Name", "Ashutosh"],
            ["Last Name", "Patil"],
            ["Date Of Birth", "DD/MM/YYYY"],
            ["Gender", "Male"],
            ["Email Address", "ashutosh.patil1409@gmail.com"],
            ["Mobile Number", "9130747809"],
          ].map(([label, value]) => (
            <div className="info-row" key={label}>
              <span className="label">{label}</span>
              <span className="value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;