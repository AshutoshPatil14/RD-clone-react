import React from "react";

// Footer component replicating the HTML footer structure
// Static links for now; newsletter form is a stub
const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-top">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/images/logo.png" alt="Reliance Digital" />
            </div>
            <p>
              India's most loved electronics store with over 1000+ stores across the country. Your trusted partner for
              all things digital.
            </p>
            <div className="social-links">
              <a href="#">
                <img
                  src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/wTzJbgvyu-HyrX-B_Xw-Twitter.png"
                  alt="Facebook"
                />
              </a>
              <a href="#">
                <img
                  src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/YiXZegTn1-lcay3GHEh-twitter.svg"
                  alt="Twitter"
                />
              </a>
              <a href="#">
                <img
                  src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/misc/pictures/free-icon/original/mcwYyapiC-7ui5541ep-Youtube.png"
                  alt="YouTube"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press Release</a>
              </li>
              <li>
                <a href="#">Store Locator</a>
              </li>
              <li>
                <a href="#">Bulk Orders</a>
              </li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Track Your Order</a>
              </li>
              <li>
                <a href="#">Return Policy</a>
              </li>
              <li>
                <a href="#">Warranty Information</a>
              </li>
              <li>
                <a href="#">Installation Services</a>
              </li>
              <li>
                <a href="#">Extended Warranty</a>
              </li>
              <li>
                <a href="#">Product Registration</a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <img src="/icons/call_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg" alt="Phone" />
              <span>1800-889-6665 (Toll Free)</span>
            </div>
            <div className="contact-info">
              <img src="/icons/mail_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg" alt="Email" />
              <span>support@reliancedigital.in</span>
            </div>

            <div className="newsletter">
              <h3>Newsletter</h3>
              <p>Get latest deals and offers directly in your inbox</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div>
            <p>&copy; 2025 Reliance Digital. All rights reserved.</p>
            <p style={{ marginTop: 5 }}>
              <a href="#" style={{ color: "#888", textDecoration: "none", marginRight: 15 }}>
                Privacy Policy
              </a>
              <a href="#" style={{ color: "#888", textDecoration: "none", marginRight: 15 }}>
                Terms of Service
              </a>
              <a href="#" style={{ color: "#888", textDecoration: "none" }}>Sitemap</a>
            </p>
          </div>
          <div className="payment-methods">
            <span>We Accept:</span>
            <img src="/icons/upi_pay_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg" alt="UPI" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;