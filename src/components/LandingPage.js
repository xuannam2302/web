import React, { useEffect, useState } from 'react';

import { findLandingPage } from '../actions/books';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addToCart } from '../actions/cart'

import Evaluation from './Evaluation/Evaluation'
import Loading from '../components/Loading';
import Error from '../components/Error';
import RatingStar from '../util/RatingStar';

import { checkValidAmountOnBlur, checkValidAmountOnChange } from '../util/Validator'
import { changeToLocalePrice } from '../util/ChangeUnit'

import { toast } from 'react-toastify';
import ToastNotify from '../util/ToastNotify';
import Toast from '../util/Toast'

const LandingPage = ({ socket }) => {
    // Global Variables
    const dispatch = useDispatch();
    const item = useSelector(state => state.item.current_book);
    const evaluation = useSelector(state => state.getEvaluation);

    const successAddToCart = () => toast.success(<Toast state="Successfully" desc="Thêm vào giỏ hàng thành công" />)

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
        if (amount > 1)
            setAmount(amount - 1);
    }
    const handleMouseMove = (e) => {
        const zoomElement = document.querySelector('.landing_page-zoom');
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;

        zoomElement.style.display = 'block';
        zoomElement.style.backgroundPosition = `${x}% ${y}%`

    }
    const handleMouseLeave = () => {
        const zoomElement = document.querySelector('.landing_page-zoom');
        zoomElement.style.display = 'none';
    }
    const handleAmountChange = (e) => {
        setAmount(checkValidAmountOnChange(e.target.value));
    }
    const handleBlurAmount = (e) => {
        setAmount(checkValidAmountOnBlur(e.target.value));
    }
    const handleAddToCart = () => {
        const item = { book_id: _id, quantity: amount };
        const send_request = [];
        send_request.push(item);

        dispatch(addToCart(send_request));
        successAddToCart();
    }

    /// ------------------------------------------------------- ///
    useEffect(() => {
        dispatch(findLandingPage(_id));
    }, [_id, dispatch])

    useEffect(() => {
        if (socket) {
            socket.emit('join_room', _id);
        }
    }, [_id, socket])

    // Render
    if (!item) {
        if (!item._id) {
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
                <div className="landing_page-img" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    <img src={item.image} alt={item.category} />
                    <div className="landing_page-zoom" style={{ backgroundImage: `url(${item.image})` }}>
                    </div>
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
                            {item.book_depository_stars !== undefined ? <RatingStar value={item.book_depository_stars} /> : <></>}
                        </div>
                        <div className="landing_page-comment">
                            (300 nhận xét)
                        </div>
                    </div>
                    <div className="landing_page-control">
                        <div className="landing_page-new-price">
                            Giá: <strong>{item.price === undefined ? 0 : changeToLocalePrice(item.price)}</strong>
                        </div>
                        {item.old_price !== undefined && item.old_price !== null ? <div className="landing_page-old-price">
                            {changeToLocalePrice(item.old_price)}
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
                            <button className={`landing_page-amount-btn ${amount === 1 ? "landing_page-amount-btn--disable" : null}`} onClick={handleAmountMinus}>
                                <i className="fas fa-minus"></i>
                            </button>
                            <input
                                className="landing_page-amount-label"
                                value={amount}
                                onChange={handleAmountChange}
                                onBlur={handleBlurAmount}
                                required
                            />
                            <button className="landing_page-amount-btn" onClick={handleAmountPlus}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="landing_page-shopping" onClick={handleAddToCart}>
                        <button className="landing_page-shopping-btn">
                            Chọn mua
                        </button>
                    </div>
                </div>
            </div>
            <Evaluation evaluation={evaluation} socket={socket} />
            <ToastNotify />
        </div>
    )
}

export default LandingPage;
