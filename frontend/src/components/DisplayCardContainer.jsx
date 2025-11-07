import React from 'react';
import DisplayCard from './DisplayCard';
import '../styles/DisplayCardContainer.css';

const DisplayCardContainer = ({ cards }) => {
    return (
        <div className="display-card-container">
            {cards.map((card, index) => (
                <DisplayCard
                    key={index}
                    image={card.image}
                    title={card.title}
                    price={card.price}
                    discount={card.discount}
                    rating={card.rating}
                />
            ))}
        </div>
    );
};

export default DisplayCardContainer;