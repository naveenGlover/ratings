import React, { useState } from 'react';
import '../styles/reviewPopup.css';
import OverallStarRating from './OverallStarRating';
import SummaryQuestionReview from './SummaryQuestionReview';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

const ReviewPopup = ({ review, setReview }) => {
    const [showSummary, setSummary] = useState(undefined);
    const [showImage, setShowImage] = useState(review.review.images[0]);
    const closePopup = () => {
        setReview({ isOpen: false })
    }
    const setImage = (id, image) => {
        setShowImage(image);
    }
    return (
        <div id="popup" className="popup" >
            <div className='popup-bg' onClick={closePopup}></div>
            <div className="popup-content" id="popup-content">
                <div className="popup-left">
                    <div className="popup-image-div">
                        <img src={showImage ? showImage : '/images/image_placeholder.jpg'} alt="reviewImage" />
                    </div>
                    <div className="popup-image-prev-div">
                        {(review.review.images.length) > 0 ? (review.review.images.map((image, index) => {
                            return (
                                <label htmlFor={`prev-image-${index}`} className="radio-label" key={index}>
                                    <input type="radio" id={`prev-image-${index}`} name={`prev-image-${index}`} value={index} className='radio-input' />
                                    <img src={image} alt='preview-image' id={`prev-image-${index}`} className='radio-image' onClick={() => setImage(`prev-image-${index}`, image)} />
                                </label>
                            )
                        })) : ''}
                    </div>
                </div>
                <div className="popup-right">
                    <div className="popup-review-user-div">
                        <p className="review-user">{review.review.customerName}</p>
                        <p className="review-user-date">{new Date(review.review.date).toDateString()}</p>
                    </div>
                    <div className="popup-review-ratings-div">
                        <p>Ratings:{review.review.overallRating}/5</p>
                        <div className="popup-review-ratings">
                            <OverallStarRating rating={review.review.overallRating} size={15} />
                        </div>
                    </div>
                    <div className="popup-review-feedback-div">
                        <p>{review.review.feedback}</p>
                    </div>
                    {review.review.qualityRating || review.review.priceRating || review.review.shippingRating || review.review.supportRating ?
                        (<div className="popup-summary-questions">
                            <SummaryQuestionReview type='quality' value={review.review.qualityRating} />
                            <SummaryQuestionReview type='price' value={review.review.priceRating} />
                            <SummaryQuestionReview type='shipping' value={review.review.shippingRating} />
                            <SummaryQuestionReview type='support' value={review.review.supportRating} />
                        </div>) : ''}
                    <div className="popup-likes-div">
                        <p>Was this helpful?</p>
                        <div className="popup-likes">
                            <p><button type="button" ><FaRegThumbsUp /></button>{review.review.totalLikes ? review.review.totalLikes : ''}</p>
                            <p><button type="button" ><FaRegThumbsDown /></button>{review.review.totalDislikes ? review.review.totalDislikes : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewPopup;