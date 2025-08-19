import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';

export default function UserOrders() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [customOrders, setCustomOrders] = useState([]);
  const [regularOrders, setRegularOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('regular');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${API_BASE_URL}/api/orders/user/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
        setCustomOrders(data.customOrders || []);
        setRegularOrders(data.regularOrders || []);
      } catch (e) {
        setError(e.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="container my-5 text-center">
        <h4>Please log in to view your orders.</h4>
        <a href="/login" className="btn btn-primary mt-3">Login</a>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4" style={{ color: '#1F2937' }}>Your Orders</h2>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'regular' ? 'active' : ''}`} onClick={() => setActiveTab('regular')}>
            Regular Orders ({regularOrders.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'custom' ? 'active' : ''}`} onClick={() => setActiveTab('custom')}>
            Custom Orders ({customOrders.length})
          </button>
        </li>
      </ul>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {!loading && !error && activeTab === 'regular' && (
        regularOrders.length === 0 ? (
          <p className="text-muted">No regular orders yet.</p>
        ) : (
          <div className="row">
            {regularOrders.map((order) => (
              <div key={order._id} className="col-12 mb-4">
                <div className="card" style={{ backgroundColor: '#faf7f1ff' }}>
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Order #{order._id.slice(-6)}</h6>
                    <span className={`badge ${
                      order.status === 'pending' ? 'bg-warning' :
                      order.status === 'confirmed' ? 'bg-primary' :
                      order.status === 'shipped' ? 'bg-info' :
                      order.status === 'delivered' ? 'bg-success' :
                      order.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="card-body">
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
                      <strong>Total: ${order.totalAmount}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {!loading && !error && activeTab === 'custom' && (
        customOrders.length === 0 ? (
          <p className="text-muted">No custom orders yet.</p>
        ) : (
          <div className="row">
            {customOrders.map((order) => (
              <div key={order._id} className="col-12 mb-4">
                <div className="card" style={{ backgroundColor: '#faf7f1ff' }}>
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Order #{order._id.slice(-6)}</h6>
                    <span className={`badge ${
                      order.status === 'pending' ? 'bg-warning' :
                      order.status === 'accepted' ? 'bg-success' :
                      order.status === 'rejected' ? 'bg-danger' :
                      order.status === 'shipped' ? 'bg-info' :
                      order.status === 'delivered' ? 'bg-primary' : 'bg-secondary'
                    }`}>
                      {order.status}
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
                        <h6>Special Requirements</h6>
                        <p className="text-muted">{order.specialRequirements || 'None'}</p>
                      </div>
                    </div>
                    <small className="text-muted">Placed on {new Date(order.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
