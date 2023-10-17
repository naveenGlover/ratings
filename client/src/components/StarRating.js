import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import "../styles/starRating.css";

const StarRating = ({ rating, rateProduct }) => {
    const colors = {
        yellow: "#FAAD14",
        grey: "#9CA3AF"
    }
    useEffect(() => {
        setCurrentValue(rating)
    }, [rating]);
    const [currentValue, setCurrentValue] = useState(rating);
    const [hoverValue, setHoverValue] = useState(undefined);
    const handleClick = (value) => {
        setCurrentValue(value);
        rateProduct(value);
    }
    const handleHoverIn = (value) => {
        setHoverValue(value);
    }
    const handleHoverout = () => {
        setHoverValue(undefined);
    }
    const stars = new Array(5).fill(0);
    return (
        <div className="satr-rating-product-div">
            <div className="star-rating-product">
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            style={{
                                marginRight: 10,
                                cursor: 'pointer'
                            }}
                            color={(hoverValue || currentValue) > index ? colors.yellow : colors.grey}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleHoverIn(index + 1)}
                            onMouseLeave={() => handleHoverout()}
                        />
                    )
                })}
            </div>
            <p id="star-rating-errorMsg">Please Rate This Product.!</p>
        </div>
    );
};

export default StarRating;