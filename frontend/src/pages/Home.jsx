import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axiosConfig";

// Home page: hero banner, top deals, and limited time deals
const Home = () => {
  const router = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);

  const fetchHomepageProducts = async () => {
    try {
      const response = await api.get("/products/homepage-products");
      // console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchHomepageProducts();
  }, []);

  if (user?.role === "admin") {
    router("/admin");
  }

  return (
    <div className="home">
      {/* Hero banner */}
      <section className="hero-banner">
        <Link to="/product/6937e4a10fe097fc9cce16c6">
          <img
            src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1764239456724.jpeg"
            alt="Hero Banner"
          />
        </Link>
        <Link to="/product/691eb1087b1d2e3e7c8f5139">
          <img
            src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1761305109384.jpeg"
            alt="Hero Banner"
          />
        </Link>
      </section>

      {/* Top deals cards */}
      <section className="top-deals">
        <h2>LATEST DEALS</h2>
        <div className="top-deals-grid">
          {products.map((d, i) => (
            <div className="top-deals-card" key={i} onClick={() => router(`/product/${d._id}`)}>
              <div>
                <img src={d.imgUrl} alt={d.title} />
              </div>
              <div className="top-deals-card-info">
                <p>{d.name}</p>
                <h3>
                  Price:
                  <span>{d.price}</span>
                </h3>
                <h5>Color: {d.color}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Limited Time Deals */}
      <section className="ltd">
        <h2>Limited Time Deals</h2>
        <div className="ltd-img">
          {["1750404437932", "1750404460886", "1750404483678", "1750404500578"].map((id) => (
            <div className="ltd-img-card" key={id}>
              <img
                src={`https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-${id}.png`}
                alt="deal"
              />
            </div>
          ))}
        </div>
        <div className="ltd-banner">
          <img
            src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750156115438.jpeg"
            alt="ltd banner"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
