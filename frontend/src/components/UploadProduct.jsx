import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';

const UploadProduct = () => {
  const { user } = useAuth();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      alert('Product name is required.');
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      alert('Please enter a valid price.');
      return;
    }
    if (!description.trim()) {
      alert('Product description is required.');
      return;
    }
    if (!imageUrl.trim()) {
      alert('Please provide an image URL.');
      return;
    }

    setLoading(true);

    try {
      const token = user?.token;
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: productName.trim(),
          price: parseFloat(price),
          description: description.trim(),
          image: imageUrl.trim(),
          category: category.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Server response:', data);

      alert('Product uploaded successfully!');
      setProductName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
      setCategory('');
    } catch (error) {
      console.error('Upload error:', error);

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Network error. Please check your connection and try again.');
      } else if (error.message.includes('404')) {
        alert('API endpoint not found. Please check the server configuration.');
      } else if (error.message.includes('500')) {
        alert('Server error. Please try again later.');
      } else {
        alert('Upload failed. Please try again.');
      }
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
            <p>You need to be logged in to upload products.</p>
            <a href="/login" className="btn" style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}>
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!user.isSeller) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="mb-4" style={{ color: "#1F2937" }}>Become a Seller</h2>
            <p>You need to be a seller to upload products.</p>
            <a href="/become-seller" className="btn" style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}>
              Become a Seller
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
<div style={{ minHeight: "100vh", width: "100%", backgroundColor: "#FFF8F0", paddingTop: "2rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow p-4 rounded-4">
            <h1 className="text-center fw-bold mb-4" style={{ color: "#D97706" }}>
              Upload New Product
            </h1>

            <form onSubmit={handleUpload}>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    className="form-control rounded-pill"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Product Description</label>
                <textarea
                  className="form-control"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  disabled={loading}
                  required
                  style={{ borderRadius: "20px" }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Image URL</label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-control rounded-pill"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={loading}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Handmade Jewelry">Handmade Jewelry</option>
                  <option value="Textiles">Textiles</option>
                  <option value="Pottery">Pottery</option>
                  <option value="Woodwork">Woodwork</option>
                  <option value="Metalwork">Metalwork</option>
                  <option value="Paintings">Paintings</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn text-white rounded-pill fw-semibold"
                  style={{
                    backgroundColor: "#D97706",
                    border: "none",
                    padding: "12px"
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Uploading...
                    </>
                  ) : (
                    'Upload Product'
                  )}
                </button>
              </div>
            </form>

            {loading && (
              <div className="text-center mt-3">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted small">Uploading product...</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
