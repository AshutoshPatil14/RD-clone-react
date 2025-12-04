import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
    console.log(products)
  const loadProducts = async () => {
    const res = await api.get("/admin/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>

      <div className="admin-products-container">
        <div className="admin-products">
          {products.map(product => (
            <div key={product._id} className="admin-product-card">
            <img src={product.imgUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price.toLocaleString()}</p>
            <p>Category: {product.category}</p>
            <p>SellerId: {product.sellerId._id}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
