import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';

export default function CustomOrderPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    productName: '',
    description: '',
    quantity: 1,
    budget: '',
    timeline: '',
    specialRequirements: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a custom order.');
      return;
    }
    if (user.isSeller) {
      alert('Sellers cannot submit custom orders.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/custom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      alert('Custom order submitted!');
      setForm({ productName: '', description: '', quantity: 1, budget: '', timeline: '', specialRequirements: '' });
    } catch (e) {
      alert(e.message || 'Failed to submit custom order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card" style={{ backgroundColor: '#faf7f1ff' }}>
            <div className="card-header"><h5 className="mb-0">Request a Custom Order</h5></div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Product Name</label>
                    <input className="form-control" name="productName" value={form.productName} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Quantity</label>
                    <input type="number" min="1" className="form-control" name="quantity" value={form.quantity} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" name="description" value={form.description} onChange={handleChange} required />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Budget Range</label>
                    <input className="form-control" name="budget" value={form.budget} onChange={handleChange} placeholder="e.g., $50-100" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Timeline</label>
                    <input className="form-control" name="timeline" value={form.timeline} onChange={handleChange} placeholder="e.g., 2 weeks" required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Special Requirements</label>
                  <textarea className="form-control" rows="2" name="specialRequirements" value={form.specialRequirements} onChange={handleChange} placeholder="Any specific requirements, materials, or preferences..." />
                </div>
                <button disabled={submitting} type="submit" className="btn" style={{ backgroundColor: '#DC2626', color: '#FDF5E6' }}>{submitting ? 'Submitting...' : 'Submit Request'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
