import React from 'react'
import Rating from '@material-ui/lab/Rating';

const Item = ({ data, index, page }) => {
    if (Math.ceil((index + 1) / 15) === page) {

        return (
            <div className="item">
                <div className="item-container">
                    <img src={data.image} alt={data.category} className="item-img" />
                    <div className="item-content">
                        <div className="item-control">
                            <h4 className="item-title">
                                {data.name}
                            </h4>
                        </div>
                        <div className="item-control">
                            <div className="item-rating">
                                <Rating name="half-rating-read" value={data.book_depository_stars} precision={0.5} readOnly />
                            </div>
                            <div className="item-comment">
                                ({Math.ceil(Math.random() * 300)} nhận xét)
                            </div>
                        </div>
                        <div className="item-control">
                            <div className="item-price">
                                Giá: <strong>{data.price === null ? 0 : data.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong>
                            </div>
                            {data.old_price !== undefined && data.old_price !== null ? <div className="item-discount">
                                <strong>-{Math.ceil((1 - data.price / data.old_price) * 100)}%</strong>
                            </div> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
        </>
    )
}

export default Item;
