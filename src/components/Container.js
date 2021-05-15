import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { searchFunction } from '../actions/books'

import Pagination from '@material-ui/lab/Pagination';
import Item from './Item'
import Loading from './Loading'

const Container = () => {
    // Global Variables
    const dispatch = useDispatch();
    const data = useSelector(state => state.books);
    const { search, sort, lower_price, upper_price, books } = data;
    console.log(data);
    // -- Content -- //
    const [page, setPage] = useState(1);
    const handleChangePage = (e) => {
        setPage(parseInt(e.target.innerText))
    }
    const [m_sort, setM_Sort] = useState(sort);
    const [m_lower_price, setM_LowPrice] = useState('');
    const [m_upper_price, setM_UpperPrice] = useState('');
    const handleSelect = (e) => {
        const elements = document.querySelectorAll('.container-option-select');
        elements.forEach(item => {
            item.classList.remove('container-option-select-active');
        })
        e.target.classList.add('container-option-select-active');
        setM_Sort(e.target.getAttribute('value'));
        setPage(1);
    }
    const handlePrice = () => {
        console.log(search, m_sort, m_lower_price, m_upper_price);
        dispatch(searchFunction(search, m_sort, m_lower_price, m_upper_price));
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])
    useEffect(() => {
        console.log(search, m_sort, lower_price, upper_price);
        dispatch(searchFunction(search, m_sort, lower_price, upper_price));
    }, [dispatch, search, m_sort, lower_price, upper_price])
    if (!books.length) {
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
                            <Item data={item} key={index} index={index} page={page} />
                        )
                    })}
                </div>
                <div className="container-paganation">
                    <Pagination count={Math.floor(books.length / 20)} hidePrevButton hideNextButton page={page} onChange={handleChangePage} />
                </div>
            </div>
        </div>

    )
}

export default Container
