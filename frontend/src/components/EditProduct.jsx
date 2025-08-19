import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';

export default function EditProduct() {
  const { productId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', price: '', description: '', image: '', category: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        if (!res.ok) throw new Error('Failed to load product');
        const data = await res.json();
        setForm({
          title: data.title || '',
          price: data.price || '',
          description: data.description || '',
          image: data.image || '',
          category: data.category || ''
        });
      } catch (e) {
        alert('Unable to load product');
        navigate('/seller-dashboard');
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchProduct();
  }, [productId, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.token}` },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          description: form.description,
          image: form.image,
          category: form.category
        })
      });
      if (!res.ok) throw new Error('Update failed');
      alert('Product updated');
      navigate('/seller-dashboard');
    } catch (e) {
      alert('Unable to update product');
    }
  };

  if (!user?.isSeller) {
    return (
      <div className="container my-5 text-center">
        <h3>You must be a seller to edit products</h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card" style={{ backgroundColor: '#faf7f1ff' }}>
            <div className="card-header"><h5 className="mb-0">Edit Product</h5></div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input type="number" step="0.01" className="form-control" name="price" value={form.price} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input className="form-control" name="image" value={form.image} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input className="form-control" name="category" value={form.category} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="4" name="description" value={form.description} onChange={handleChange} />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn" style={{ backgroundColor: '#DC2626', color: '#FDF5E6' }}>Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/seller-dashboard')}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
