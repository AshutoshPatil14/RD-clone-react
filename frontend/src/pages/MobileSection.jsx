import React from "react";
import { Link } from "react-router-dom";
import "../styles/mobile-sec.css";

// Mobiles landing section: banners and best-selling grid
const MobileSection = () => {
  return (
    <div className="mobile-section">
      {/* Fresh Arrivals section */}
      <section className="fa">
        <div className="fa-banner">
          <img
            src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750335740025.gif"
            alt="Fresh Arrivals"
          />
        </div>
        <h2>Fresh Arrivals</h2>
        <div className="fa-img">
          {["1750922686750","1750922801146","1750923490521","1750923558367"].map((id) => (
            <div className="fa-img-card" key={id}>
              <img
                src={`https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-${id}.jpeg`}
                alt="promo"
              />
            </div>
          ))}
        </div>
        <div className="fa-banner">
          <img
            src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750157702701.jpeg"
            alt="Deals Banner"
          />
        </div>
      </section>

      {/* Best Selling Smartphones */}
      <section className="bs-deals">
        <div className="bs-heading">
          <h2>Best Selling Smartphones</h2>
          <Link to="/mobiles/all">View All →</Link>
        </div>
        <div className="bs-deals-grid">
          {[
            {
              img:
                "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/Jx5cqKU_3W-realme-p1-speed-5g-494494552-i-1-1200wx1200h.jpeg",
              title:
                "Realme P1 Speed 5G 128 GB, 8 GB RAM, Brushed Blue, Mobile Phone",
              price: "₹13,649.00",
              off: "24% OFF",
            },
            {
              link: "/mobiles/pixel-9a",
              img:
                "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/y6kyI361bq-oppo-k12x-5g-494422233-i-1-1200wx1200h.jpeg",
              title:
                "Oppo K12x 5G 128 GB, 6 GB RAM, Breeze Blue, Mobile Phone",
              price: "₹12,999.00",
            },
            {
              img:
                "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/dlOkT567xF-redmi-14c-5g-494493873-i-1-1200wx1200h.jpeg",
              title: "Redmi 14C 5G 64 GB, 4 GB RAM, Purple, Mobile Phone",
              price: "₹9,499.00",
              off: "27% OFF",
            },
            {
              img:
                "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/hb_s14K6NH-op-nord-ce4-lite-494421625-i-1-1200wx1200h.jpeg",
              title:
                "OnePlus Nord CE4 Lite 5G 128 GB, 8 GB RAM, Super Silver, Mobile Phone",
              price: "₹17,999.00",
              off: "14% OFF",
            },
            {
              img:
                "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/APINfdOq-Y-moto-razr-50-ultra-mobile-phone-494421576-i-1-1200wx1200h.jpeg",
              title:
                "Motorola Razr 50 Ultra 5G 12 GB RAM, 512 GB, Midnight Blue, with Moto Buds+",
              price: "₹54,999.00",
              off: "54% OFF",
            },
          ].map((p, i) => (
            <div className="bs-deals-card" key={i}>
              {p.link ? (
                <Link to={p.link}>
                  <img src={p.img} alt="Smartphone" />
                  <p>{p.title}</p>
                  <h3>{p.price}{p.off && <span>{p.off}</span>}</h3>
                </Link>
              ) : (
                <>
                  <img src={p.img} alt="Smartphone" />
                  <p>{p.title}</p>
                  <h3>
                    {p.price}
                    {p.off && <span>{p.off}</span>}
                  </h3>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MobileSection;