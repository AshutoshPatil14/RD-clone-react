import React from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Home page: hero banner, top deals, and limited time deals
const Home = () => {
  const router = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "admin") {
    router("/admin");
  }

  return (
    <div className="home">
      {/* Hero banner */}
      <section className="hero-banner">
        <img src="/images/hero-banner.jpeg" alt="Hero Banner" />
        <img
          src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750335740025.gif"
          alt="Hero Banner"
        />
      </section>

      {/* Top deals cards */}
      <section className="top-deals">
        <h2>TOP DEALS</h2>
        <div className="top-deals-grid">
          {[
            {
              img: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/iyS-OwL7Xo-lg-55-4k-uhd-smart-led-494410559-i-1-1200wx1200h.jpeg",
              title: "LG 139.7 cm (55 inch) 4K Ultra HD TV, Ashed Blue, 55UT80506LA",
              price: "₹50,990.00",
              off: "43% OFF",
              mrp: "MRP ₹89,900.00",
            },
            {
              img: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/LTNkVqf8wK-apple-iphone-16-494423019-i-1-1200wx1200h.jpeg",
              title: "Apple iPhone 16 256 GB, White",
              price: "₹84,900.00",
              off: "6% OFF",
              mrp: "MRP ₹89,900.00",
            },
            {
              img: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/SoXHwBhEuL-hp-15-fc0156au-laptop-494493504-i-1-1200wx1200h.jpeg",
              title: "HP 15 Laptop",
              price: "₹36,999.00",
              off: "27% OFF",
              mrp: "MRP ₹89,900.00",
            },
            {
              img: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/B5ZfT4dAie-samsung-galaxy-s25-ultra-494493928-i-1-1200wx1200h.jpeg",
              title: "Samsung Galaxy S25 Ultra",
              price: "₹1,29,999.00",
              off: "1% OFF",
              mrp: "MRP ₹89,900.00",
            },
            {
              img: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/iKSK9wRtqc-ipad-11th-gen-wifi-494494355-i-1-1200wx1200h.jpeg",
              title: "Apple iPad 11th Gen WiFi",
              price: "₹32,900.00",
              off: "6% OFF",
              mrp: "MRP ₹89,900.00",
            },
          ].map((d, i) => (
            <div className="top-deals-card" key={i}>
              <img src={d.img} alt={d.title} />
              <p>{d.title}</p>
              <h3>
                {d.price}
                <span>{d.off}</span>
              </h3>
              <h5>{d.mrp}</h5>
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
