import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { searchFunction } from '../actions/books'

import Item from './Item'
import Loading from './Loading'
import Error from './Error'
// import Slider from './Sliders/Slider'

import Pagination from '@material-ui/lab/Pagination';

const Container = () => {
    // Global Variables
    const history = useHistory();
    const dispatch = useDispatch();
    const data = useSelector(state => state.books);
    const isLoading = useSelector(state => state.books.isLoading);

    const { search,
        sort,
        books,
        msg,
        limit
    } = data;

    // -- Content -- //
    const [m_sort, setM_Sort] = useState(sort);
    const [m_lower_price, setM_LowPrice] = useState('');
    const [m_upper_price, setM_UpperPrice] = useState('');
    const [page, setPage] = useState(1);
    const handleSelect = (e) => {
        const value = e.target.getAttribute('value');
        setM_Sort(value);
        setPage(1);
        dispatch(searchFunction(search, value, m_lower_price, m_upper_price, 1));
        history.push(`/search?search=${search}&sort=${value}&lower_price=${m_lower_price}&upper_price=${m_upper_price}&page=1`);
    }
    const handlePrice = () => {
        setPage(1);
        dispatch(searchFunction(search, m_sort, m_lower_price, m_upper_price, 1));
        history.push(`/search?search=${search}&sort=${m_sort}&lower_price=${m_lower_price}&upper_price=${m_upper_price}&page=1`);
    }
    const handleChangePage = (e) => {
        const value = parseInt(e.target.innerText);
        setPage(parseInt(e.target.innerText));
        dispatch(searchFunction(search, m_sort, m_lower_price, m_upper_price, value));
        history.push(`/search?search=${search}&sort=${m_sort}&lower_price=${m_lower_price}&upper_price=${m_upper_price}&page=${value}`);
    }
    const handleOnKeyUp = (e) => {
        const keyCode = e.keyCode;
        if (keyCode === 13) {
            handlePrice();
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])

    useEffect(() => {
        const elements = document.querySelectorAll('.container-option-select');
        elements.forEach(item => {
            item.classList.remove('container-option-select-active');
            if (item.getAttribute('value') === m_sort) {
                item.classList.add('container-option-select-active');
            }
        })
    }, [m_sort])

    useEffect(() => {
        dispatch(searchFunction());
    }, [dispatch])

    if (!books.length) {
        if (msg === 'No book required!') {
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
            {/* <Slider /> */}
            <div className="container-main">
                <div className="container-filter">
                    <p className="container-label">S???p x???p theo</p>
                    <div name="filter" id="filter" className="container-select">
                        <div className="container-option">
                            <p className="container-option-title">????? m???c</p>
                            <div className="container-option-group">
                                <div
                                    className="container-option-select container-option-select-active"
                                    value="" onClick={handleSelect}>M???i nh???t
                                </div>
                                <div
                                    className="container-option-select"
                                    value="name" onClick={handleSelect}>T??n s??ch
                                </div>
                                <div
                                    className="container-option-select"
                                    value="author"
                                    onClick={handleSelect}>T??n t??c gi???
                                </div>
                            </div>
                        </div>
                        <div className="container-option">
                            <p className="container-option-title">Gi??</p>
                            <div className="container-option-group">
                                <div
                                    className="container-option-select"
                                    value="price"
                                    onClick={handleSelect}>T??? th???p ?????n cao
                                </div>
                                <div
                                    className="container-option-select"
                                    value="price"
                                    onClick={handleSelect}>T??? cao ?????n th???p
                                </div>
                                <div className="container-option-select-input" onKeyUp={e => handleOnKeyUp(e)}>
                                    <p>T???</p>
                                    <div className="container-option-select-input-content">
                                        <input
                                            type="text"
                                            className="container-option-input"
                                            value={m_lower_price}
                                            onChange={(e) => setM_LowPrice(e.target.value)}
                                        />
                                        <p>--</p>
                                        <input
                                            type="text"
                                            className="container-option-input"
                                            value={m_upper_price}
                                            onChange={(e) => setM_UpperPrice(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className="container-option-select-input-submit"
                                        onClick={handlePrice}>T??m ki???m
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading ? <Loading /> :
                    <div className="container-list">
                        {books.map((item, index) => {
                            return (
                                <Item data={item} key={index} index={index} />
                            )
                        })}
                    </div>
                }
                <div className="container-pagination">
                    <Pagination
                        count={Math.floor(limit / 20)}
                        hidePrevButton
                        hideNextButton
                        page={page}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Container;
