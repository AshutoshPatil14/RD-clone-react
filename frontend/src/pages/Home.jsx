import React from "react";
import "../styles/home.css";
import DisplayCard from "../components/DisplayCard";
import DisplayCardContainer from "../components/DisplayCardContainer";
import CardBox from "../components/CardBox";

const Home = () => {
  return (
    <>

      <div className="body">
        <section className="hero-banner">
          <img
            src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750335740025.gif"
            alt="Hero Banner"
          />
          <img src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1758200409507.jpeg" alt="Hero Banner" />
        </section>

        <CardBox />

        <section className="top-deals">
          <h2>TOP DEALS</h2>
          <div className="top-deals-grid">
            <div className="top-deals-card">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/iyS-OwL7Xo-lg-55-4k-uhd-smart-led-494410559-i-1-1200wx1200h.jpeg"
                alt="Smartphones"
              />
              <p>LG 139.7 cm (55 inch) 4K Ultra HD TV, Ashed Blue, 55UT80506LA</p>
              <h3>
                &#8377;50,990.00<span>43% OFF</span>
              </h3>
              <h5>MRP &#8377;89,900.00</h5>
            </div>
            <div className="top-deals-card">
              <a href="./product.html">
                <img
                  src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/LTNkVqf8wK-apple-iphone-16-494423019-i-1-1200wx1200h.jpeg"
                  alt="Laptops"
                />
                <p>Apple iPhone 16 256 GB, White</p>
                <h3>
                  &#8377;84,900.00<span>6% OFF</span>
                </h3>
                <h5>MRP &#8377;89,900.00</h5>
              </a>
            </div>
            <div className="top-deals-card">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/SoXHwBhEuL-hp-15-fc0156au-laptop-494493504-i-1-1200wx1200h.jpeg"
                alt="Televisions"
              />
              <p>LG 139.7 cm (55 inch) 4K Ultra HD TV, Ashed Blue, 55UT80506LA</p>
              <h3>
                &#8377;36,999.00<span>27% OFF</span>
              </h3>
              <h5>MRP &#8377;89,900.00</h5>
            </div>
            <div className="top-deals-card">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/B5ZfT4dAie-samsung-galaxy-s25-ultra-494493928-i-1-1200wx1200h.jpeg"
                alt="Appliances"
              />
              <p>LG 139.7 cm (55 inch) 4K Ultra HD TV, Ashed Blue, 55UT80506LA</p>
              <h3>
                &#8377;1,29,999.00<span>1% OFF</span>
              </h3>
              <h5>MRP &#8377;89,900.00</h5>
            </div>
            <div className="top-deals-card">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/iKSK9wRtqc-ipad-11th-gen-wifi-494494355-i-1-1200wx1200h.jpeg"
                alt="Appliances"
              />
              <p>LG 139.7 cm (55 inch) 4K Ultra HD TV, Ashed Blue, 55UT80506LA</p>
              <h3>
                &#8377;32,900.00<span>6% OFF</span>
              </h3>
              <h5>MRP &#8377;89,900.00</h5>
            </div>
            {/* <div className="top-deals-card">
                        <img src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/ZesN7s6BSd-apple-iphone-16-494423022-i-1-1200wx1200h.jpeg"
                        alt="Appliances"/>
                        <p>LG 139.7 cm (55 inch) 4K Ultra HD TV, Ashed Blue, 55UT80506LA</p>
                        <h3>&#8377;84,900.00<span>6% OFF</span></h3>
                        <h5>MRP &#8377;89,900.00</h5>
                        </div> */}
          </div>
        </section>

        <section className="ltd">
          <h2>Limited Time Deals</h2>
          <div className="ltd-img">
            <div className="ltd-img-card">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750404437932.png"
                alt=""
              />
            </div>
            <div className="ltd-img-card">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750404460886.png"
                alt=""
              />
            </div>
            <div className="ltd-img-card">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750404483678.png"
                alt=""
              />
            </div>
            <div className="ltd-img-card">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750404500578.png"
                alt=""
              />
            </div>
          </div>
          <div className="ltd-banner">
            <img
              src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1750156115438.jpeg"
              alt=""
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
