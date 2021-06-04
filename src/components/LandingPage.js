import React, { useEffect, useState } from 'react'

import { findLandingPage } from '../actions/books'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Rating from '@material-ui/lab/Rating';

const LandingPage = () => {
    // Global Variables
    const dispatch = useDispatch();
    const item = useSelector(state => state.item);

    // Component State
    const [amount, setAmount] = useState(1);
    const { _id } = useParams();
    
    // Debug
    console.log(item);

    // Function handler
    const handleAmountPlus = () => {
        setAmount(amount + 1);
    }
    const handleAmountMinus = () => {
        if(amount > 1)
            setAmount(amount - 1);
    }

    useEffect(() => {
        dispatch(findLandingPage(_id));
    }, [_id, dispatch])

    // Render
    if (!item) {
        if(!item._id) {
            return (
                <Error />
            )
        }
        return (
            <Loading />
        )
    }
    return (
        <div className="container">
            <div className="landing_page">
                <div className="landing_page-img">
                    <img src={item.image} alt={item.category}  />
                </div>
                <div className="landing_page-content">
                    <div className="landing_page-control">
                        <h4 className="landing_page-title">
                            {item.name}
                        </h4>
                    </div>
                    <div className="landing_page-control">
                        <h4 className="landing_page-author">
                            <strong>Tác giả: </strong>{item.author}
                        </h4>
                    </div>
                    <div className="landing_page-control">
                        <div className="landing_page-rating">
                            {item.book_depository_stars !== undefined ? <Rating name="half-rating-read" value={item.book_depository_stars} precision={0.5} readOnly /> : <></>}
                        </div>
                        <div className="landing_page-comment">
                            (300 nhận xét)
                        </div>
                    </div>
                    <div className="landing_page-control">
                        <div className="landing_page-new-price">
                            Giá: <strong>{item.price === undefined ? 0 : item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong>
                        </div>
                        {item.old_price !== undefined && item.old_price !== null ? <div className="landing_page-old-price">
                            {item.old_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </div> : <></>}
                        {item.old_price !== undefined && item.old_price !== null ? <div className="landing_page-discount">
                            <strong>-{Math.ceil((1 - item.price / item.old_price) * 100)}%</strong>
                        </div> : <></>}
                    </div>
                    <ul className="landing_page-promo">
                        <li className="landing_page-code">
                            <strong>Logo</strong>
                            <p>Mã giảm giá</p>
                        </li>
                        <li className="landing_page-code">
                            <strong>Logo</strong>
                            <p>Mã giảm giá</p>
                        </li>
                        <li className="landing_page-code">
                            <strong>Logo</strong>
                            <p>Mã giảm giá</p>
                        </li>
                    </ul>
                    <div className="landing_page-amount">
                        <p className="landing_page-amount-number">Số lượng:</p>
                        <div className="landing_page-amount-control">
                            <button className="landing_page-amount-btn" onClick={handleAmountMinus}>
                                <i class="fas fa-minus"></i>
                            </button>
                            <p className="landing_page-amount-label">{amount}</p>
                            <button className="landing_page-amount-btn" onClick={handleAmountPlus}>
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="landing_page-shopping">
                        <button className="landing_page-shopping-btn">
                            Chọn mua
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
