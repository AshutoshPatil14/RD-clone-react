import React from 'react';
import '../styles/DisplayCard.css';

const DisplayCard = ({ image, title, price, discount, rating }) => {
    return (
        <div className="display-card">
            <img src={image} alt={title} className="display-card-image" />
            <div className="display-card-content">
                <h3 className="display-card-title">{title}</h3>
                <p className="display-card-price">₹{price}</p>
                <p className="display-card-discount">{discount}% OFF</p>
                <p className="display-card-rating">⭐ {rating}</p>
            </div>
        </div>
    );
};

export default DisplayCard;