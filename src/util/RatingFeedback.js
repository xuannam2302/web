import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});

export default function HoverRating({ratingStars, setRatingStars}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Rating
                name="hover-feedback"
                value={ratingStars}
                onChange={(e, newValue) => {
                    setRatingStars(newValue);
                }}
            />
        </div>
    );
}