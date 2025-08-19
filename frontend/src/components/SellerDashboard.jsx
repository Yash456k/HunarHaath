import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../contexts/AuthContext';

export default function SellerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [regularOrders, setRegularOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    if (user && user.isSeller) {
      fetchSellerData();
    }
  }, [user]);

  const fetchSellerData = async () => {
    try {
      const token = user?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Fetch seller's products
      const productsRes = await axios.get(`${API_BASE_URL}/api/products/seller/${user._id}`, config);
      setProducts(productsRes.data);

      // Fetch orders for this seller
      const ordersRes = await axios.get(`${API_BASE_URL}/api/orders/seller/${user._id}`, config);
      setCustomOrders(ordersRes.data.acceptedCustomOrders || []);
      setPendingOrders(ordersRes.data.pendingCustomOrders || []);
      setRegularOrders(ordersRes.data.regularOrders || []);
    } catch (error) {
      console.error('Error fetching seller data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = user?.token;
      await axios.put(
        `${API_BASE_URL}/api/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh the data to get updated order lists
      await fetchSellerData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleRegularOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = user?.token;
      await axios.put(
        `${API_BASE_URL}/api/orders/regular/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchSellerData();
    } catch (error) {
      console.error('Error updating regular order status:', error);
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = user?.token;
        await axios.delete(`${API_BASE_URL}/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setProducts(prev => prev.filter(product => product._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (!user || !user.isSeller) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="mb-4" style={{ color: "#1F2937" }}>Access Denied</h2>
            <p>You need to be a seller to access this dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4" style={{ color: "#1F2937" }}>
            Welcome, {user.name}! 
            <span className="badge bg-success ms-2">Seller</span>
          </h2>
          
          {/* Navigation Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                My Products ({products.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'regular' ? 'active' : ''}`}
                onClick={() => setActiveTab('regular')}
              >
                Product Orders ({regularOrders.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Accepted Orders ({customOrders.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Orders ({pendingOrders.length})
              </button>
            </li>
          </ul>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>My Products</h4>
                <a 
                  href="/upload-product" 
                  className="btn"
                  style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}
                >
                  Add New Product
                </a>
              </div>
              
              {products.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No products yet</h5>
                  <p>Start by adding your first product!</p>
                  <a 
                    href="/upload-product" 
                    className="btn"
                    style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}
                  >
                    Add Product
                  </a>
                </div>
              ) : (
                <div className="row">
                  {products.map((product) => (
                    <div key={product._id} className="col-md-6 col-lg-4 mb-4">
                      <div className="card h-100" style={{ backgroundColor: "#faf7f1ff" }}>
                        <img
                          src={product.image}
                          className="card-img-top"
                          alt={product.title}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.description}</p>
                          <h6 className="text-primary">${product.price}</h6>
                          <div className="d-flex justify-content-between mt-3">
                            <a 
                              href={`/edit-product/${product._id}`}
                              className="btn btn-outline-primary btn-sm"
                            >
                              Edit
                            </a>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteProduct(product._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Regular Product Orders Tab */}
          {activeTab === 'regular' && (
            <div>
              <h4 className="mb-4">Product Orders</h4>
              {regularOrders.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No product orders yet</h5>
                  <p>Orders for your listed products will appear here.</p>
                </div>
              ) : (
                <div className="row">
                  {regularOrders.map((order) => (
                    <div key={order._id} className="col-12 mb-4">
                      <div className="card" style={{ backgroundColor: "#faf7f1ff" }}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Order #{order._id.slice(-6)}</h6>
                          <span className={`badge ${
                            order.status === 'pending' ? 'bg-warning' :
                            order.status === 'confirmed' ? 'bg-primary' :
                            order.status === 'shipped' ? 'bg-info' :
                            order.status === 'delivered' ? 'bg-success' :
                            order.status === 'cancelled' ? 'bg-danger' :
                            'bg-secondary'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="card-body">
                          <div className="mb-2">
                            <strong>Customer:</strong> {order.customerName} ({order.customerEmail})
                          </div>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Product</th>
                                  <th>Qty</th>
                                  <th>Price</th>
                                  <th>Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(order.items || []).map((item, idx) => (
                                  <tr key={idx}>
                                    <td>{item.productName}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>${(item.price || 0) * (item.quantity || 0)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="d-flex justify-content-end">
                            <h6 className="mb-0">Total: ${order.totalAmount}</h6>
                          </div>
                          <div className="mt-3 d-flex gap-2">
                            {order.status === 'pending' && (
                              <>
                                <button className="btn btn-success btn-sm" onClick={() => handleRegularOrderStatusUpdate(order._id, 'confirmed')}>Accept</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleRegularOrderStatusUpdate(order._id, 'cancelled')}>Reject</button>
                              </>
                            )}
                            {order.status === 'confirmed' && (
                              <button className="btn btn-outline-primary btn-sm" onClick={() => handleRegularOrderStatusUpdate(order._id, 'shipped')}>Mark Shipped</button>
                            )}
                            {order.status === 'shipped' && (
                              <button className="btn btn-outline-success btn-sm" onClick={() => handleRegularOrderStatusUpdate(order._id, 'delivered')}>Mark Delivered</button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Accepted Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h4 className="mb-4">Accepted Custom Orders</h4>
              
              {customOrders.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No accepted orders yet</h5>
                  <p>Orders you accept will appear here.</p>
                </div>
              ) : (
                <div className="row">
                  {customOrders.map((order) => (
                    <div key={order._id} className="col-12 mb-4">
                      <div className="card" style={{ backgroundColor: "#faf7f1ff" }}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Order #{order._id.slice(-6)}</h6>
                          <span className={`badge ${
                            order.status === 'pending' ? 'bg-warning' :
                            order.status === 'accepted' ? 'bg-success' :
                            order.status === 'rejected' ? 'bg-danger' :
                            order.status === 'shipped' ? 'bg-info' :
                            order.status === 'delivered' ? 'bg-primary' :
                            'bg-secondary'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <h6>Product Details</h6>
                              <p><strong>Name:</strong> {order.productName}</p>
                              <p><strong>Quantity:</strong> {order.quantity}</p>
                              <p><strong>Description:</strong> {order.description}</p>
                              <p><strong>Budget:</strong> {order.budget}</p>
                              <p><strong>Timeline:</strong> {order.timeline}</p>
                            </div>
                            <div className="col-md-6">
                              <h6>Customer Information</h6>
                              <p><strong>Name:</strong> {order.customerName}</p>
                              <p><strong>Email:</strong> {order.customerEmail}</p>
                              <p><strong>Special Requirements:</strong></p>
                              <p className="text-muted">{order.specialRequirements || 'None'}</p>
                            </div>
                          </div>
                          <div className="mt-3 d-flex gap-2">
                            {order.status === 'pending' && (
                              <>
                                <button className="btn btn-success" onClick={() => handleOrderStatusUpdate(order._id, 'accepted')}>Accept</button>
                                <button className="btn btn-danger" onClick={() => handleOrderStatusUpdate(order._id, 'rejected')}>Reject</button>
                              </>
                            )}
                            {order.status === 'accepted' && (
                              <button className="btn btn-outline-primary" onClick={() => handleOrderStatusUpdate(order._id, 'shipped')}>Mark Shipped</button>
                            )}
                            {order.status === 'shipped' && (
                              <button className="btn btn-outline-success" onClick={() => handleOrderStatusUpdate(order._id, 'delivered')}>Mark Delivered</button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pending Orders Tab */}
          {activeTab === 'pending' && (
            <div>
              <h4 className="mb-4">Pending Custom Orders</h4>
              
              {pendingOrders.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No pending orders available</h5>
                  <p>New custom order requests will appear here.</p>
                </div>
              ) : (
                <div className="row">
                  {pendingOrders.map((order) => (
                    <div key={order._id} className="col-12 mb-4">
                      <div className="card" style={{ backgroundColor: "#faf7f1ff" }}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Order #{order._id.slice(-6)}</h6>
                          <span className="badge bg-warning">
                            Pending
                          </span>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <h6>Product Details</h6>
                              <p><strong>Name:</strong> {order.productName}</p>
                              <p><strong>Quantity:</strong> {order.quantity}</p>
                              <p><strong>Description:</strong> {order.description}</p>
                              <p><strong>Budget:</strong> {order.budget}</p>
                              <p><strong>Timeline:</strong> {order.timeline}</p>
                            </div>
                            <div className="col-md-6">
                              <h6>Customer Information</h6>
                              <p><strong>Name:</strong> {order.customerName}</p>
                              <p><strong>Email:</strong> {order.customerEmail}</p>
                              <p><strong>Special Requirements:</strong></p>
                              <p className="text-muted">{order.specialRequirements || 'None'}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <button
                              className="btn btn-success me-2"
                              onClick={() => handleOrderStatusUpdate(order._id, 'accepted')}
                            >
                              Accept Order
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleOrderStatusUpdate(order._id, 'rejected')}
                            >
                              Reject Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
