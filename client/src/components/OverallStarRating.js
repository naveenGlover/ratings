import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import '../styles/overallStarRating.css'

const OverallStarRating = ({ rating, size }) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);
    const starArray = [];

    for (let i = 0; i < filledStars; i++) {
        starArray.push(<FaStar key={i} size={size ? size : 20} color={'#FFD700'} className="filled-star"></FaStar>);
    }
    if (hasHalfStar) {
        starArray.push(<FaStarHalfAlt key={filledStars} size={size ? size : 20} color={'#FFD700'} className="half-star"></FaStarHalfAlt>);
    }

    for (let i = 0; i < emptyStars; i++) {
        starArray.push(<FaRegStar key={filledStars + i + 1} size={size ? size + 1 : 21} color={'#FFD700'} className="empty-star"></FaRegStar>);
    }
    return (
        <div className="overall-star-rating">
            {starArray}
        </div>
    );
};

export default OverallStarRating;
