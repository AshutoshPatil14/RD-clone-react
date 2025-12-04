import React, { useState } from "react";
import "./MyAddresses.css";
import api from "../api/axiosConfig";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

const MyAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    api.get(`/user/get-user-address/${user.userId}`)
      .then((response) => {
        setAddresses(response.data.address);
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error);
      });
  }, [user.userId]);


  const handleEdit = (id) => {
    const addressToEdit = addresses.find((addr) => addr.id === id);
    setCurrentAddress(addressToEdit);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
        console.log(id)
        await api.put(`/user/delete-user-address/${user.userId}`, {addressId: id} );
      setAddresses(addresses.filter((addr) => addr.id !== id));
      // Assuming 'toast' is available for notifications
      toast.success("Address deleted successfully");
      console.log("Address deleted successfully");
    } catch (error) {
      
      console.error("Error deleting address:", error);
    }
  };

  const handleAddAddress = () => {
    setCurrentAddress(null);
    setShowForm(true);
  };

  const handleSaveAddress = async (addressData) => {
    try {
      if (addressData.id) {
        // Update existing address
        const response = await api.put(`/user/update-user-address/${user.userId}`, { addressId: addressData.id, ...addressData });
        setAddresses(addresses.map((addr) => (addr.id === addressData.id ? { ...response.data.address, id: response.data.address._id } : addr)));
        // toast.success("Address updated successfully");
        console.log("Address updated successfully");
      } else {
        // Add new address
        const response = await api.post(`/user/add-user-address/${user.userId}`, addressData);
        setAddresses([...addresses, { ...response.data.address, id: response.data.address._id }]);
        // toast.success("Address added successfully");
        console.log("Address added successfully");
      }
      setShowForm(false);
      setCurrentAddress(null);
    } catch (error) {
      console.error("Error saving address:", error);
      // toast.error("Error saving address");
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentAddress(null);
  };

  // console.log("addresses",addresses)
  return (
    <div className="my-addresses-container">
      <h2>My Delivery Addresses</h2>

      {addresses.map((address) => (
        <div key={address.id} className="address-card">
          <h3>{address.fullName}</h3>
          <p>{address.addressLine}</p>
          <p>{address.city}, {address.state} - {address.pincode}</p>
          <p>Mobile: {address.mobile}</p>
          <div className="address-actions">
            <button className="edit-button" onClick={() => handleEdit(address.id)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(address.id)}>Delete</button>
            {/* {console.log(address.id)} */}
          </div>
        </div>
      ))}

      <button className="add-address-button" onClick={handleAddAddress}>
        Add New Address
      </button>

      {showForm && (
        <AddressForm
          address={currentAddress}
          onSave={handleSaveAddress}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

const AddressForm = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState(address || {
    fullName: "",
    addressLine: "",
    pincode: "",
    city: "",
    state: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="address-form-modal">
      <div className="address-form-content">
        <h3>{address ? "Edit Address" : "Add New Address"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address Line</label>
            <input
              type="text"
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              maxLength={6}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              maxLength={10}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAddresses;
