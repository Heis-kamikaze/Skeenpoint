import React, { useState, useEffect } from 'react';
import { useUserStore } from './../stores/useUserStore';
import axInstance from '../lib/axios';
import toast from 'react-hot-toast';

const BillingDetails = () => {
  const { user, setUser } = useUserStore();
  
  // Create local state for user and billing details
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    billDetails: {
      country: '',
      address: '',
      city: '',
      stateName: ''
    }
  });

  // Pre-fill the form with existing user data when component mounts
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        billDetails: {
          country: user.billDetails?.country || '',
          address: user.billDetails?.address || '',
          city: user.billDetails?.city || '',
          stateName: user.billDetails?.stateName || ''
        }
      });
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('billDetails.')) {
      const field = name.split('.')[1];
      setUserInfo((prevState) => ({
        ...prevState,
        billDetails: {
          ...prevState.billDetails,
          [field]: value
        }
      }));
    } else {
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update the user's information
      await axInstance.put(`/auth/${user._id}`, userInfo);
      toast.success('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user info:', error);
      toast.error('Failed to update user information.');
    }
  };

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
          />
        </div>
        <h3>Billing Details</h3>
        {user.billDetails.isCompleted && <p>
          Completed</p>}
        <div>
          <label>Country</label>
          <input
            type="text"
            name="billDetails.country"
            value={userInfo.billDetails.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="billDetails.address"
            value={userInfo.billDetails.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="billDetails.city"
            value={userInfo.billDetails.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="billDetails.stateName"
            value={userInfo.billDetails.stateName}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default BillingDetails;
