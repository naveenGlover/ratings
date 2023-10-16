import React from 'react';
import { FaCircle } from 'react-icons/fa';

const SummaryQuestionReview = ({ type, value }) => {

    const totalDots = 5;
    const filledDots = value;
    const emptyDots = totalDots - filledDots;
    const dotsArray = [];
    const opasity = [0.2, 0.4, 0.5, 0.8, 1];
    for (let i = 0; i < filledDots; i++) {
        dotsArray.push(<FaCircle key={i} size={15} opacity={opasity[i]} color={'blck'} className="filled-dot"></FaCircle>);
    }
    for (let i = 0; i < emptyDots; i++) {
        dotsArray.push(<FaCircle key={filledDots + i + 1} size={15} color={'white'} className="empty-dot"></FaCircle>);
    }
    return (
        <div className='summary-quesion-rating-div'>
            <p>{type} : {value}</p>
            <p className='summary-quesion-rating-dots'>
                {dotsArray}
            </p>
        </div>
    )
}

export default SummaryQuestionReview