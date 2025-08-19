import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || ''
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      const token = user?.token;
      const response = await axios.get(`http://localhost:4000/api/orders/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = user?.token;
      const response = await axios.put(`http://localhost:4000/api/users/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      updateUser(response.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="mb-4" style={{ color: "#1F2937" }}>Please Login</h2>
            <p>You need to be logged in to view your profile.</p>
            <a href="/login" className="btn" style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}>
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Profile Information */}
        <div className="col-lg-8">
          <div className="card mb-4" style={{ backgroundColor: "#faf7f1ff" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Profile Information</h4>
              {!isEditing && (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn"
                      style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name || '',
                          email: user.email || '',
                          phone: user.phone || '',
                          address: user.address || '',
                          bio: user.bio || ''
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Name:</strong> {user.name}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Account Type:</strong> 
                        <span className={`badge ms-2 ${user.isSeller ? 'bg-success' : 'bg-primary'}`}>
                          {user.isSeller ? 'Seller' : 'Customer'}
                        </span>
                      </p>
                      <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {user.address && (
                    <div className="mt-3">
                      <p><strong>Address:</strong></p>
                      <p className="text-muted">{user.address}</p>
                    </div>
                  )}
                  {user.bio && (
                    <div className="mt-3">
                      <p><strong>Bio:</strong></p>
                      <p className="text-muted">{user.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card" style={{ backgroundColor: "#faf7f1ff" }}>
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <a 
                    href="/cart" 
                    className="btn btn-outline-primary w-100"
                  >
                    View Cart
                  </a>
                </div>
                {user.isSeller && (
                  <div className="col-md-6 mb-2">
                    <a 
                      href="/seller-dashboard" 
                      className="btn btn-outline-success w-100"
                    >
                      Seller Dashboard
                    </a>
                  </div>
                )}
                {!user.isSeller && (
                  <div className="col-md-6 mb-2">
                    <a 
                      href="/become-seller" 
                      className="btn btn-outline-warning w-100"
                    >
                      Become a Seller
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="col-lg-4">
          <div className="card" style={{ backgroundColor: "#faf7f1ff" }}>
            <div className="card-header">
              <h5 className="mb-0">Recent Orders</h5>
            </div>
            <div className="card-body">
              {(!orders.customOrders || orders.customOrders.length === 0) && 
               (!orders.regularOrders || orders.regularOrders.length === 0) ? (
                <p className="text-muted">No orders yet.</p>
              ) : (
                <div>
                  {/* Show custom orders */}
                  {orders.customOrders && orders.customOrders.slice(0, 3).map((order) => (
                    <div key={order._id} className="border-bottom pb-2 mb-2">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">{order.productName} (Custom)</span>
                        <span className={`badge ${
                          order.status === 'pending' ? 'bg-warning' :
                          order.status === 'accepted' ? 'bg-success' :
                          order.status === 'rejected' ? 'bg-danger' :
                          'bg-secondary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <small className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
                  
                  {/* Show regular orders */}
                  {orders.regularOrders && orders.regularOrders.slice(0, 3).map((order) => (
                    <div key={order._id} className="border-bottom pb-2 mb-2">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">{order.items?.length || 0} items</span>
                        <span className={`badge ${
                          order.status === 'pending' ? 'bg-warning' :
                          order.status === 'confirmed' ? 'bg-success' :
                          order.status === 'shipped' ? 'bg-info' :
                          order.status === 'delivered' ? 'bg-success' :
                          order.status === 'cancelled' ? 'bg-danger' :
                          'bg-secondary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <small className="text-muted">
                        ${order.totalAmount} • {new Date(order.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
                  
                  {((orders.customOrders && orders.customOrders.length > 3) || 
                    (orders.regularOrders && orders.regularOrders.length > 3)) && (
                    <a href="/orders" className="btn btn-link p-0">
                      View all orders
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
