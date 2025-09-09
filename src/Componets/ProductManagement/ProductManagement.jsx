// ProductManagement.js - Component for managing products
import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

const ProductManagement = ({ props }) => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const restaurantName = props.name;
  const restaurantId = props.restaurantId;
  const [formData, setFormData] = useState({
    restaurant: restaurantName, // now stores name, not ID
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    available: true,
    ingredients: '',
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: false
    },
    preparationTime: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [restaurantName,restaurantId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://restaurant-backend-uclq.onrender.com/api/restaurant/${restaurantId}/products`,
        { credentials: 'include' }
      );
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("dietaryInfo.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        dietaryInfo: {
          ...prev.dietaryInfo,
          [key]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingProduct 
        ? `/api/restaurant/${restaurantId}/products/${editingProduct._id}`
        : `/api/restaurant/${restaurantId}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      
      if (response.ok) {
        setShowForm(false);
        setEditingProduct(null);
        setFormData({
          restaurant: restaurantName,
          name: '',
          description: '',
          price: '',
          category: '',
          image: '',
          available: true,
          ingredients: '',
          dietaryInfo: {
            vegetarian: false,
            vegan: false,
            glutenFree: false
          },
          preparationTime: ''
        });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      restaurant: restaurantName,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      available: product.available,
      ingredients: product.ingredients || '',
      dietaryInfo: product.dietaryInfo || {
        vegetarian: false,
        vegan: false,
        glutenFree: false
      },
      preparationTime: product.preparationTime || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`/api/restaurant/${restaurantName}/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-management">
      <div className="product-header">
        <h2>Product Management ({restaurantName})</h2>
        <button 
          className="add-product-btn"
          onClick={() => setShowForm(true)}
        >
          Add New Product
        </button>
      </div>
      
      {showForm && (
        <div className="product-form-modal">
          <div className="product-form-container">
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="ingredients">Ingredients (comma-separated)</label>
                <input
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Dietary Info</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="dietaryInfo.vegetarian"
                      checked={formData.dietaryInfo.vegetarian}
                      onChange={handleChange}
                    /> Vegetarian
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="dietaryInfo.vegan"
                      checked={formData.dietaryInfo.vegan}
                      onChange={handleChange}
                    /> Vegan
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="dietaryInfo.glutenFree"
                      checked={formData.dietaryInfo.glutenFree}
                      onChange={handleChange}
                    /> Gluten Free
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="preparationTime">Preparation Time (minutes)</label>
                <input
                  type="number"
                  id="preparationTime"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleChange}
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group checkbox-group">
                <label htmlFor="available">
                  <input
                    type="checkbox"
                    id="available"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                  />
                  Available
                </label>
              </div>
              
              <div className="form-buttons">
                <button type="submit">Save</button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="products-list">
        {products.length === 0 ? (
          <p>No products found. Add your first product!</p>
        ) : (
          products.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Ingredients:</strong> {product.ingredients}</p>
                <p>
                  <strong>Dietary:</strong> 
                  {product.dietaryInfo?.vegetarian && " 🥦 Vegetarian"}
                  {product.dietaryInfo?.vegan && " 🌱 Vegan"}
                  {product.dietaryInfo?.glutenFree && " 🌾 Gluten Free"}
                </p>
                <p><strong>Preparation Time:</strong> {product.preparationTime} mins</p>
                <div className="product-meta">
                  <span className="price">${product.price}</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
