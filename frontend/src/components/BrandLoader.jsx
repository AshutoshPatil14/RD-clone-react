// components/BrandLoader.jsx
import { useEffect, useState } from "react";
import {
  FaLaptop,
  FaMobileAlt,
  FaClock,
  FaSnowflake,
} from "react-icons/fa";
// import "./BrandLoader.css";

const iconComponents = [
  FaLaptop,
  FaMobileAlt,
  FaClock,
  FaSnowflake, // fridge substitute
];

const BrandLoader = () => {
  const [icons, setIcons] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const shuffleIcons = () => {
      const shuffled = [...iconComponents].sort(
        () => 0.5 - Math.random()
      );
      setIcons(shuffled.slice(0, 3));
    };

    shuffleIcons();

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
      shuffleIcons();
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="brand-loader-container">
      <h2 className="brand-text">
        Reliance Digital
        <span className="brand-loader-icon-dots">
          {icons.map((Icon, index) => (
            <span
              key={index}
              className={`brand-loader-icon ${activeIndex === index ? "active" : ""}`}
            >
              <Icon />
            </span>
          ))}
        </span>
      </h2>
    </div>
  );
};

export default BrandLoader;