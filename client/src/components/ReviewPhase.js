import React, { useState, useRef } from 'react'
import StarRating from './StarRating'
import Progressbar from './Progressbar'
import '../styles/reviewPhase.css';
import CircularProgressBar from './CircleRating';
import ReviewForm from './ReviewForm';
import OverallStarRating from './OverallStarRating';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import ReviewPopup from './ReviewPopup';

const ReviewPhase = ({ product }) => {
    const [likes, setLikes] = useState([]);
    const [reviewPopup, setReviewPopup] = useState({ isOpen: false });
    const reviewbtn = () => {
        let elem = document.getElementById('review-btn');
        let form = document.getElementById('form');
        if (elem.value === 'Write Review') {
            elem.value = 'Cancel';
            elem.innerText = "Cancel";
            form.style.display = 'block';
        }
        else {
            elem.value = 'Write Review';
            elem.innerText = 'Write Review';
            form.style.display = 'none';
        }
    }
    const likeReview = (review, action) => {
        if (action = 'like') {
            review.totalLikes += 1;
        } else {
            // review
        }
    }
    const showPopup = (review) => {
        setReviewPopup({
            isOpen: true,
            review: review
        })
    }
    return (
        <div className="review-phase">
            <div className="review-heading-phase">
                <h2>Customer Ratings</h2>
                <div className="reviews-head-container">
                    <div className="total-avgReview-container">
                        <div className="total-avgReview-div">
                            <h1 className="total-avgReview">{(product.productDetail.avgRating).toFixed(1)}</h1>
                            <div className="total-avgReview-rating-div">
                                <OverallStarRating rating={product.productDetail.avgRating} />
                            </div>
                        </div>
                        <div className="ratings-container">
                            <div className="star-rating-div">5 <span style={{ color: "#faad14" }}> &#9733;</span> <Progressbar bgcolor={"#3F3F46"} progress={Math.round((product.productDetail.individual_reviews['5star'] / product.productDetail.totalReviews) * 100)} ratings={product.productDetail.individual_reviews['5star']} /></div>
                            <div className="star-rating-div">4 <span style={{ color: "#faad14" }}> &#9733;</span> <Progressbar bgcolor={"#3F3F46"} progress={Math.round((product.productDetail.individual_reviews['4star'] / product.productDetail.totalReviews) * 100)} ratings={product.productDetail.individual_reviews['4star']} /></div>
                            <div className="star-rating-div">3 <span style={{ color: "#faad14" }}> &#9733;</span> <Progressbar bgcolor={"#3F3F46"} progress={Math.round((product.productDetail.individual_reviews['3star'] / product.productDetail.totalReviews) * 100)} ratings={product.productDetail.individual_reviews['3star']} /></div>
                            <div className="star-rating-div">2 <span style={{ color: "#faad14" }}> &#9733;</span> <Progressbar bgcolor={"#3F3F46"} progress={Math.round((product.productDetail.individual_reviews['2star'] / product.productDetail.totalReviews) * 100)} ratings={product.productDetail.individual_reviews['2star']} /></div>
                            <div className="star-rating-div">1 <span style={{ color: "#faad14" }}> &#9733;</span> <Progressbar bgcolor={"#3F3F46"} progress={Math.round((product.productDetail.individual_reviews['1star'] / product.productDetail.totalReviews) * 100)} ratings={product.productDetail.individual_reviews['1star']} /></div>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="review-questions-summary">
                        <CircularProgressBar rating={35} type={'Quality'} />
                        <CircularProgressBar rating={45} type={'Price'} />
                        <CircularProgressBar rating={55} type={'Shipping'} />
                        <CircularProgressBar rating={85} type={'Support'} />
                    </div>
                </div>
            </div>
            <div className="filter-container">
                <div className="filter-div">
                    <input type="text" className='filter-text-input' placeholder='Search for Reviews' />
                    <button className='dropdown-summary'> Filter</button>
                    <select name="Filter" id="filter" className='filter-types'>
                        <option value="volvo">Sort by date</option>
                        <option value="saab">Sort by rating</option>
                        <option value="mercedes">Sort by conent</option>
                        <option value="audi">Sort by media</option>
                    </select>
                </div>
                <div>
                    <button id='review-btn' className='review-btn' onClick={() => reviewbtn()} value='Write Review'> Write Review</button>
                </div>
            </div>
            <ReviewForm productHandle={product.productDetail.productHandle} formSubmit={reviewbtn} />
            <div className="reviews">
                {
                    product.productReviews.map((review, index) => {
                        return (
                            <div className="review-container" key={index}>
                                <div className="review-image-div">
                                    <img src={(review.images.length > 0) ? review.images[0] : '/images/image_placeholder.jpg'} alt="product_review" onClick={() => showPopup(review)} />
                                </div>
                                <div className="review-user-div">
                                    <p className='review-user'>
                                        {review.customerName}
                                    </p>
                                    <p className='review-user-date'>
                                        {new Date(review.date).toDateString()}
                                    </p>
                                </div>
                                <div className="review-ratings-div">
                                    <p>Ratings:{review.overallRating}/5</p>
                                    <div className="review-ratings">
                                        <OverallStarRating rating={review.overallRating} size={15} />
                                    </div>
                                </div>
                                <div className="review-feedback-div">
                                    <p className='review-feedback'>{review.feedback}</p>
                                </div>
                                <div className="review-likes-div">
                                    <p>Was this helpful?</p>
                                    <div className="review-likes">
                                        <p><button type="button" onClick={() => likeReview(review, 'like')}><FaRegThumbsUp /></button>{review.totalLikes ? review.totalLikes : ''}</p>
                                        <p><button type="button" onClick={() => likeReview(review, 'dislike')}><FaRegThumbsDown /></button>{review.totalDislikes ? review.totalDislikes : ''}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {reviewPopup.isOpen ? <ReviewPopup review={reviewPopup} setReview={(review) => setReviewPopup(review)} /> : ''}
        </div>
    )
}

export default ReviewPhase