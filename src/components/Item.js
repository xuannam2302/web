import React from 'react';
import { Link } from 'react-router-dom';

import RatingStar from '../util/RatingStar';

const Item = ({ data }) => {
    return (
        <Link to={`/book/${data._id}`}>
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
                            <h4 className="item-author">
                                <strong>Tác giả: </strong>{data.author}
                            </h4>
                        </div>
                        <div className="item-control">
                            <div className="item-rating">
                                <RatingStar value={data.book_depository_stars}/>
                            </div>
                            <div className="item-comment">
                                (300 nhận xét)
                                </div>
                        </div>
                        <div className="item-control">
                            <div className="item-price">
                                Giá: <strong>{data.price === null ? 0 : 
                                data.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </strong>
                            </div>
                            {data.old_price !== undefined && data.old_price !== null ? <div className="item-discount">
                                <strong>-{Math.ceil((1 - data.price / data.old_price) * 100)}%</strong>
                            </div> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Item;
