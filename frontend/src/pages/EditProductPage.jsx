import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";
import "../styles/add-product.css"; // Reusing add-product styles for now
import { useSelector } from "react-redux";

const EditProductPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    color: "",
    price: "",
    category: "",
    stock: "",
    imgUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        if (response.status === 200) {
          setProduct(response.data.product);
        }
      } catch (error) {
        setError(error);
        toast.error(error.response?.data?.message || "Failed to fetch product details for editing");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/seller/edit-product/${id}`, { ...product, sellerId: user.userId });
      // const response = await api.put(`/seller/update-product/${id}`, product);
      if (response.status === 200) {
        toast.success("Product updated successfully!");
        navigate("/view-products"); // Navigate back to seller's products page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };

  if (loading) {
    return <div className="loading-indicator">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="add-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <select name="color" id="color" value={product.color} onChange={handleChange} required>
            <option value="">Select Color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="purple">Purple</option>
            <option value="black">Black</option>
            <option value="white">White</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select name="category" id="category" value={product.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="laptop">Laptop</option>
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
            <option value="tv">TV</option>
            <option value="headphone">Headphone</option>
            <option value="speaker">Speaker</option>
            <option value="camera">Camera</option>
            <option value="smart-watch">Smart Watch</option>
            <option value="washing-machine">Washing Machine</option>
            <option value="refrigerator">Refrigerator</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={product.imgUrl}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;