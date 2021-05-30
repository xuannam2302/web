import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { searchFunction } from '../actions/books'
import Item from './Item'
import Loading from './Loading'
import Pagination from '@material-ui/lab/Pagination';
import Error from './Error'

const Container = () => {
    // Global Variables
    const dispatch = useDispatch();
    const elements = document.querySelectorAll('.container-option-select');
    const data = useSelector(state => state.books);
    const { search, sort, lower_price, upper_price, books, msg, _page, limit } = data;
    console.log(_page, limit);
    console.log(data);
    // -- Content -- //
    const [m_sort, setM_Sort] = useState(sort);
    const [m_lower_price, setM_LowPrice] = useState('');
    const [m_upper_price, setM_UpperPrice] = useState('');
    const [page, setPage] = useState(1);
    const handleSelect = (e) => {
        setM_Sort(e.target.getAttribute('value'));
        setPage(1);
    }
    const handlePrice = () => {
        dispatch(searchFunction(search, m_sort, m_lower_price, m_upper_price, page));
    }
    const handleChangePage = (e) => {
        console.log(limit);
        setPage(parseInt(e.target.innerText))
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])
    useEffect(() => {
        if (m_sort) {
            elements.forEach(item => {
                item.classList.remove('container-option-select-active');
                if (item.getAttribute('value') === m_sort) {
                    item.classList.add('container-option-select-active');
                }
            })
        }
    }, [elements, m_sort])
    useEffect(() => {
        dispatch(searchFunction(search, m_sort, lower_price, upper_price, page));
    }, [dispatch, search, m_sort, lower_price, upper_price, page])
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
            <div className="container-main">
                <div className="container-filter">
                    <p className="container-label">Sắp xếp theo</p>
                    <div name="filter" id="filter" className="container-select">
                        <div className="container-option">
                            <p className="container-option-title">Đề mục</p>
                            <div className="container-option-group">
                                <div className="container-option-select container-option-select-active" value="name" onClick={handleSelect}>Tên sách</div>
                                <div className="container-option-select" value="author" onClick={handleSelect}>Tên tác giả</div>
                            </div>
                        </div>
                        <div className="container-option">
                            <p className="container-option-title">Giá</p>
                            <div className="container-option-group">
                                <div className="container-option-select" value="price" onClick={handleSelect}>Từ thấp đến cao</div>
                                <div className="container-option-select" value="price" onClick={handleSelect}>Từ cao đến thấp</div>
                                <div className="container-option-select-input">
                                    <p>Từ</p>
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
                                    <button className="container-option-select-input-submit" onClick={handlePrice}>Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-list">
                    {books.map((item, index) => {
                        return (
                            <Item data={item} key={index} index={index} />
                        )
                    })}
                </div>
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

export default Container
