import React from 'react';
import Header from '../components/Header';
import '../styles/home.css';
import Mainphase from '../components/Mainphase';
import StarRating from '../components/StarRating';

const home = () => {
    return (
        <div>
            <Header />
            <Mainphase />
            <div className="review-phase">
                <div className='review-heading-phase'><h1>Build trust at every high converting touch point</h1>
                    <p>Display impactful social proof at the most crucial pages across the buyer journey</p>
                </div>
                <h1>Customer Reviews</h1>
                <h1 className="total-rating">
                    4.7
                    <StarRating />
                </h1>
            </div>
        </div>
    )
}

export default home;