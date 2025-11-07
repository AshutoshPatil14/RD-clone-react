import React, { useEffect } from "react";
import "../styles/cardbox.css";

import { useState } from "react";
import axios from "axios";

const CardBox = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProduct(response.data);
        // setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getProducts();
  }, []);

  console.log(product);

  return (
    <div>
      <h2>CardBox</h2>
      <div className="box">
        <div className="heading">
          <div>
            <h4>Best Sellers</h4>
            <h6>Get Up To 12.5% Instant Bank Discount*</h6>
          </div>
          <h5>View All</h5>
        </div>
        <div className="card-container">
          {product.map((product) => (
            <div className="card" key={product.id}>
              <div className="card-image">
                <img src={product.image} alt="Product Image" />
              </div>
              <div className="card-content">
                <div className="card-title">
                  <h3>{product.title}</h3>
                </div>
                <div className="card-price">
                  <p>${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardBox;




