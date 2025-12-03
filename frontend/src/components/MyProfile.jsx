import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MyProfile.css";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});
  const dispatch = useDispatch();

  
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await api.get(`/user/get-user/${user.userId}`);
      if (response.status === 200) {
        setEditedUser(response.data.user);
      }
    };
    fetchUserProfile();
  }, []);
  console.log(editedUser)
  
  const handleSave = async () => {
    try {
      const response = await api.put(`/user/update-user/${user.userId}`, editedUser);
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
      // Dispatch action to update user profile
      console.log("Saving user data:", editedUser);
      dispatch({ type: 'UPDATE_USER_PROFILE', payload: editedUser }); // Placeholder dispatch
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Error updating user profile. Please try again.");
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatInputDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="my-profile-container">
      <h2>My Profile</h2>
      <div className="profile-details">
        <h3>
          Personal Details
          {isEditing ? (
            <>
              <button onClick={() => { setIsEditing(false); setEditedUser(user); }}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <img src="/icons/stylus_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg" alt="Edit" />
              Edit Profile
            </button>
          )}
        </h3>
        <div className="profile-item-row">
          <label>First Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editedUser?.fname || ""}
              onChange={(e) => setEditedUser({ ...editedUser, fname: e.target.value })}
            />
          ) : (
            <span>{editedUser?.fname || "N/A"}</span>
          )}
        </div>
        <div className="profile-item-row">
          <label>Last Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editedUser?.lname || ""}
              onChange={(e) => setEditedUser({ ...editedUser, lname: e.target.value })}
            />
          ) : (
            <span>{editedUser?.lname || "N/A"}</span>
          )}
        </div>
        <div className="profile-item-row">
          <label>Date Of Birth</label>
          {isEditing ? (
            <input
              type="date"
              value={formatInputDate(editedUser?.dateOfBirth)}
              onChange={(e) => setEditedUser({ ...editedUser, dateOfBirth: e.target.value })}
            />
          ) : (
            <span>{formatDisplayDate(editedUser?.dateOfBirth)}</span>
          )}
        </div>
        <div className="profile-item-row">
          <label>Gender</label>
          {isEditing ? (
            <select
              value={editedUser?.gender || ""}
              onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span>{editedUser?.gender || "N/A"}</span>
          )}
        </div>
        <div className="profile-item-row">
          <label>Email Address</label>
          {isEditing ? (
            <input
              type="email"
              value={user?.email || ""}
              // onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              disabled
            />
          ) : (
            <span>{user?.email || "N/A"}</span>
          )}
        </div>
        <div className="profile-item-row">
          <label>Mobile Number</label>
          {isEditing ? (
            <input
              type="text"
              value={editedUser?.phone || ""}
              onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            />
          ) : (
            <span>{editedUser?.phone ? <div className="number">{editedUser.phone}</div> : "N/A"}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
