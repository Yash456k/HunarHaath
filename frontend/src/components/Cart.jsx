import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getCartTotal, addCustomOrder, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCustomOrder, setShowCustomOrder] = useState(false);
  const [customOrder, setCustomOrder] = useState({
    productName: '',
    description: '',
    quantity: 1,
    budget: '',
    timeline: '',
    specialRequirements: ''
  });

  const handleCustomOrderSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to submit custom orders');
      return;
    }

    try {
      const token = user?.token;
      const response = await axios.post(`${API_BASE_URL}/api/orders/custom`, customOrder, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      addCustomOrder(response.data);
      setCustomOrder({
        productName: '',
        description: '',
        quantity: 1,
        budget: '',
        timeline: '',
        specialRequirements: ''
      });
      setShowCustomOrder(false);
      alert('Custom order request submitted successfully!');
    } catch (error) {
      console.error('Error submitting custom order:', error);
      alert('Failed to submit custom order. Please try again.');
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      return;
    }

    try {
      const token = user?.token;
      
      // Create order items from cart
      const orderItems = items.map(item => ({
        productId: item._id,
        productName: item.title,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }));

      const orderData = {
        customerId: user._id,
        customerName: user.name,
        customerEmail: user.email,
        items: orderItems,
        totalAmount: getCartTotal(),
        status: 'pending'
      };

      const response = await axios.post(`${API_BASE_URL}/api/orders/checkout`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Order placed successfully! Order ID: ' + response.data._id);
      
      // Clear cart after successful order
      clearCart();
      // Use client-side navigation to avoid full reload affecting auth state
      navigate('/profile');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (items.length === 0) {
    if (user?.isSeller) {
      return (
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="mb-4" style={{ color: "#1F2937" }}>Sellers cannot place orders</h2>
              <p className="text-muted mb-4">Use your dashboard to manage products and orders.</p>
              <a className="btn" style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }} href="/seller-dashboard">Go to Seller Dashboard</a>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="mb-4" style={{ color: "#1F2937" }}>Your Cart</h2>
            <div className="card p-5" style={{ backgroundColor: "#faf7f1ff" }}>
              <h4 className="text-muted mb-4">Your cart is empty</h4>
              <p className="text-muted mb-4">Add some products to get started!</p>
              <button 
                className="btn"
                style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}
                onClick={() => window.location.href = '/shop'}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8">
          <h2 className="mb-4" style={{ color: "#1F2937" }}>Your Cart</h2>
          {items.map((item) => (
            <div key={item._id} className="card mb-3" style={{ backgroundColor: "#faf7f1ff" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.image}
                    className="img-fluid rounded-start"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <label className="me-2">Quantity:</label>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                          className="form-select me-3"
                          style={{ width: "80px" }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <h6 className="mb-0">${(item.price * item.quantity).toFixed(2)}</h6>
                        <small className="text-muted">${item.price} each</small>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-lg-4">
          <div className="card" style={{ backgroundColor: "#faf7f1ff" }}>
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${getCartTotal().toFixed(2)}</strong>
              </div>
              
              {!user?.isSeller && (
                <button 
                  className="btn w-100 mb-3"
                  style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              )}
              
              {!user?.isSeller && (
                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={() => setShowCustomOrder(!showCustomOrder)}
                >
                  Request Custom Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Order Modal */}
      {showCustomOrder && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Custom Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCustomOrder(false)}
                ></button>
              </div>
              <form onSubmit={handleCustomOrderSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={customOrder.productName}
                        onChange={(e) => setCustomOrder({...customOrder, productName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        value={customOrder.quantity}
                        onChange={(e) => setCustomOrder({...customOrder, quantity: parseInt(e.target.value)})}
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={customOrder.description}
                      onChange={(e) => setCustomOrder({...customOrder, description: e.target.value})}
                      placeholder="Describe what you want..."
                      required
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Budget Range</label>
                      <input
                        type="text"
                        className="form-control"
                        value={customOrder.budget}
                        onChange={(e) => setCustomOrder({...customOrder, budget: e.target.value})}
                        placeholder="e.g., $50-100"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Timeline</label>
                      <input
                        type="text"
                        className="form-control"
                        value={customOrder.timeline}
                        onChange={(e) => setCustomOrder({...customOrder, timeline: e.target.value})}
                        placeholder="e.g., 2 weeks"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Special Requirements</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={customOrder.specialRequirements}
                      onChange={(e) => setCustomOrder({...customOrder, specialRequirements: e.target.value})}
                      placeholder="Any specific requirements, materials, or preferences..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCustomOrder(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {showCustomOrder && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
}
