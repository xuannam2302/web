import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, resetState } from '../actions/books';

import Error from './Error';
import { toast } from 'react-toastify';
import ToastNotify from '../util/ToastNotify';
import Toast from '../util/Toast';


import { isRequired, isNumber, getErrorTag, isLower, isHigher } from '../util/Validator';


const CreateItem = () => {
    const isAdmin = useSelector(state => state.auth.user).admin;

    // Global variables
    const dispatch = useDispatch();
    const history = useHistory();

    const data = useSelector(state => state.item);
    console.log(data);
    const { item, msg } = data;
    console.log(data);
    console.log("Message when created: ", msg);

    const exist = () => toast.warn(<Toast state="Warning" desc="Đã tồn tại" />);

    const createSuccessful = () => toast.success(<Toast state="Successfully" desc="Tạo thành công" />);


    // Current state
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('')
    const [book_depository_stars, setStars] = useState('');
    const [price, setPrice] = useState('');
    const [old_price, setOld_Price] = useState('');
    const [isbn, setISBN] = useState('');

    // Error state
    const [errorName, setErrorName] = useState('');
    const [errorAuthor, setErrorAuthor] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [errorStars, setErrorStars] = useState('');
    const [errorPrice, setErrorPrice] = useState('');
    const [errorOld_Price, setErrorOld_Price] = useState('');
    const [errorISBN, setErrorISBN] = useState('');

    const handleName = (target) => {
        const value = target.value;
        const getError = isRequired(value) || "";
        if (getError) {
            target.classList.add("form-create-control-input-invalid");
            setErrorName(getError);
            return 1;
        }
        return 0;
    }
    const handleAuthor = (target) => {
        const value = target.value;
        const getError = isRequired(value) || "";
        if (getError) {
            target.classList.add("form-create-control-input-invalid");
            setErrorAuthor(getError);
            return 1;
        }
        return 0;
    }
    const handleImage = (target) => {
        const value = target.value;
        const getError = isRequired(value) || "";
        if (getError) {
            target.classList.add("form-create-control-input-invalid");
            setErrorImage(getError);
            return 1;
        }
        return 0;
    }
    const handleStars = (target) => {
        const value = target.value;
        const getError = isRequired(value) || isNumber(value) || isLower(value, 0) || isHigher(value, 5) || "";
        if (getError) {
            target.classList.add("form-create-control-input-invalid");
            setErrorStars(getError);
            return 1;
        }
        return 0;
    }
    const handlePrice = (target) => {
        const value = target.value;
        const getError = isRequired(value) || isNumber(value) || isLower(value, 0, '$') || "";
        if (getError) {
            target.classList.add("form-create-control-input-invalid");
            setErrorPrice(getError);
            return 1;
        }
        return 0;
    }
    const handleOld_Price = (target) => {
        const value = target.value;
        const getError = isRequired(value) || isNumber(value) || isLower(value, 0, '$') || "";
        if (getError) {
            target.classList.add("form-create-control-input-invalid");
            setErrorOld_Price(getError);
            return 1;
        }
        return 0;
    }
    const handleISBN = (target) => {
        const value = target.value;
        const getError = isRequired(value) || "";
        if (getError) {
            target.classList.add("form-create-control-input-invalid");
            setErrorISBN(getError);
            return 1;
        }
        return 0;
    }
    const handleCheckPrice = (a, b) => {
        const value_price = a.value;
        const value_old = b.value;
        const getError = isLower(value_old, value_price, '$') || "";
        if(getError) {
            b.classList.add("form-create-control-input-invalid");
            setErrorOld_Price(getError);
            return 1;
        }
        return 0;
    }
    const clearError = (e) => {
        const errorElement = getErrorTag(e);
        errorElement.parentElement.querySelector('input').classList.remove("form-create-control-input-invalid");
        const clearState = errorElement.parentElement.querySelector('label').getAttribute('for');
        switch (clearState) {
            case "name":
                setErrorName("");
                break;
            case "author":
                setErrorAuthor("");
                break;
            case "stars":
                setErrorStars("");
                break;
            case "image":
                setErrorImage("");
                break;
            case "price":
                setErrorPrice("");
                break;
            case "old_price":
                setErrorOld_Price("");
                break;
            case "isbn":
                setErrorISBN("");
                break;
            default:

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formElement = document.getElementById("form-create");
        const nameElement = formElement.querySelector("#name");
        const authorElement = formElement.querySelector("#author");
        const imageElement = formElement.querySelector("#image");
        const isbnElement = formElement.querySelector("#isbn");
        const priceElement = formElement.querySelector("#price");
        const old_priceElement = formElement.querySelector("#old_price");
        const starsElement = formElement.querySelector("#stars");

        let check = 
            (handleName(nameElement) +
            handleAuthor(authorElement) +
            handleImage(imageElement) +
            handleISBN(isbnElement) +
            handlePrice(priceElement) +
            handleOld_Price(old_priceElement) +
            handleStars(starsElement)) ||
            handleCheckPrice(priceElement, old_priceElement);
        if (!check) {
            const newItem = {
                name,
                author,
                image,
                book_depository_stars,
                price,
                old_price,
                isbn
            }
            dispatch(createItem(newItem));
            console.log("Submit form");
        }
        else {
            console.log("Error");
        }

    }

    const handleCancel = () => {
        history.push(`/admin`);
    }
    useEffect(() => {
        if (item !== undefined) {
            if(msg === 'exist') {
                exist();
            }
            else if(msg === 'successful created') {
                createSuccessful();
                dispatch(resetState());
                setTimeout(() => {
                    history.push(`/admin`);
                }, 1000)
            }
        }
    }, [item, history, msg, dispatch])

    if(!isAdmin) {
        return (
            <Error />
        )
    }

    return (
        <div className="container">
            <form id="form-create" className="form-create" onSubmit={handleSubmit}>
                <h2 className="form-create-title">Thông tin sách</h2>
                <div className="form-control form-create-control">
                    <label htmlFor="name">Tên sách</label>
                    <input
                        className="form-create-control-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        onBlur={(e) => handleName(e.target)}
                        onKeyUp={(e) => clearError(e.target)}
                    />
                    <p className="form-control-error">{errorName}</p>
                </div>
                <div className="form-control form-create-control">
                    <label htmlFor="author">Tên tác giả</label>
                    <input
                        className="form-create-control-input"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        id="author"
                        onBlur={(e) => handleAuthor(e.target)}
                        onKeyUp={(e) => clearError(e.target)}
                    />
                    <p className="form-control-error">{errorAuthor}</p>
                </div>
                <div className="form-control form-create-control">
                    <label htmlFor="image">Hình ảnh</label>
                    <input
                        className="form-create-control-input"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        id="image"
                        onBlur={(e) => handleImage(e.target)}
                        onKeyUp={(e) => clearError(e.target)}
                    />
                    <p className="form-control-error">{errorImage}</p>
                </div>
                <div className="form-control form-create-control">
                    <label htmlFor="stars">Đánh giá</label>
                    <input
                        className="form-create-control-input"
                        value={book_depository_stars}
                        onChange={(e) => setStars(e.target.value)}
                        id="stars"
                        onBlur={(e) => handleStars(e.target)}
                        onKeyUp={(e) => clearError(e.target)}
                    />
                    <p className="form-control-error">{errorStars}</p>
                </div>
                <div className="form-control form-create-control">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                        className="form-create-control-input"
                        value={isbn}
                        onChange={(e) => setISBN(e.target.value)}
                        id="isbn"
                        onBlur={(e) => handleISBN(e.target)}
                        onKeyUp={(e) => clearError(e.target)}
                    />
                    <p className="form-control-error">{errorISBN}</p>
                </div>
                <div className="form-control form-create-control">
                    <label htmlFor="price">Giá tiền hiện tại</label>
                    <input
                        className="form-create-control-input"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        id="price"
                        onBlur={(e) => handlePrice(e.target)}
                        onKeyUp={(e) => clearError(e.target)}
                    />
                    <p className="form-control-error">{errorPrice}</p>
                </div>
                <div className="form-control form-create-control">
                    <label htmlFor="old_price">Giá tiền cũ</label>
                    <input
                        className="form-create-control-input"
                        value={old_price}
                        onChange={(e) => setOld_Price(e.target.value)}
                        id="old_price"
                        onBlur={(e) => handleOld_Price(e.target)}
                        onKeyUp={(e) => clearError(e.target)}
                    />
                    <p className="form-control-error">{errorOld_Price}</p>
                </div>
                <div className="form-create-control-btn">
                    <button
                        className="form-create-btn form-create-btn-cancel"
                        onClick={handleCancel}>Hủy
                    </button>
                    <button
                        className="form-create-btn form-create-btn-update"
                        onClick={handleSubmit}>Tạo mới
                    </button>
                </div>
            </form>
            <ToastNotify />
        </div>
    )
}

export default CreateItem;