import React from 'react';
import Rating from '@material-ui/lab/Rating';

const RatingStar = ({ value }) => {
    return (
        <Rating name="half-rating-read" readOnly value={value} precision={0.5} />
    )
}

export default RatingStar
