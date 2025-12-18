import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axiosConfig";
import "../styles/add-product.css";
import toast from "react-hot-toast";

function AddProduct() {
  const user = useSelector((state) => state.auth.user);
  const userId = user.userId;
  // console.log(userId, "userId");
  // const seller = userId;

  const [product, setProduct] = useState({
    name: "",
    color: "",
    price: "",
    category: "",
    stock: "",
    imgUrl: "",
    sellerId: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(product)

    // console.log(product, "from frontend, above api");
    try {
      const response = await api.post("/seller/add-product", product);
      // console.log("Product Added:", response.data);
      toast.success(response.data.message);

      setProduct({
        name: "",
        color: "",
        price: "",
        category: "",
        stock: "",
        imgUrl: "",
        sellerId: userId,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding product. Please try again.");
      // alert("Error adding product. Please try again.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
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
            <option value="air-conditioner">Air Conditioner</option>
            <option value="mixer-grinder">Mixer Grinder</option>
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
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;