import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { sort, filterPrice } from '../actions/books'

import Pagination from '@material-ui/lab/Pagination';
import Item from './Item'
import Loading from './Loading'
// import Error from './Error'

const Container = () => {
    // Global Variables
    const data = useSelector(state => state.books);
    const { books, url } = data;
    const dispatch = useDispatch();
    // -- Content -- //
    const [page, setPage] = useState(1);
    const handleChangePage = (e) => {
        setPage(parseInt(e.target.innerText))
    }

    // -- Filter -- //
    const [value, setValue] = useState('name');
    const handleSelect = (e) => {
        const elements = document.querySelectorAll('.container-option-select');
        elements.forEach(item => {
            item.classList.remove('container-option-select-active');
        })
        e.target.classList.add('container-option-select-active');
        setValue(e.target.getAttribute('value'));
        setPage(1);
    }

    // -- // Filter Price // -- //
    const [low_price, setLowPrice] = useState('');
    const [upper_price, setUpperPrice] = useState('');
    const handleFilterPrice = () => {
        dispatch(filterPrice(low_price, upper_price, data));
        setPage(1);
    }

    // -- Use Effect -- //
    useEffect(() => {
        dispatch(sort(value));
    }, [value, dispatch])
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])
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
                    <ul name="filter" id="filter" className="container-select">
                        <li className="container-option">
                            <p className="container-option-title">Đề mục</p>
                            <div className="container-option-group">
                                <div className="container-option-select container-option-select-active" value="name" onClick={handleSelect}>Tên sách</div>
                                <div className="container-option-select" value="author" onClick={handleSelect}>Tên tác giả</div>
                            </div>
                        </li>
                        <li className="container-option">
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
                                            value={low_price}
                                            onChange={(e) => setLowPrice(e.target.value)}
                                        />
                                        <p>--</p>
                                        <input
                                            type="text"
                                            className="container-option-input"
                                            value={upper_price}
                                            onChange={(e) => setUpperPrice(e.target.value)}
                                        />
                                    </div>
                                    <button className="container-option-select-input-submit" onClick={handleFilterPrice}>Tìm kiếm</button>
                                </div>
                            </div>
                        </li>
                    </ul>
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
