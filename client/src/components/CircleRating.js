import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar({ rating, type }) {

    return (
        <div style={{ textAlign: "center" }}>
            <h4>{`${type}`}</h4>
            <div style={{ width: 100 }}>
                <CircularProgressbar value={rating} text={`${rating}%`} />
            </div>
        </div>
    );
}
export default CircularProgressBar;