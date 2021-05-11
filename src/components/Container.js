import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { filterBy } from '../actions/books'

import Pagination from '@material-ui/lab/Pagination';
import Item from './Item'
import Loading from './Loading'

const Container = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => (state.books));
    const handleSubmit = (e) => {
        const elements = document.querySelectorAll('.container-option');
        elements.forEach(item => {
            item.classList.remove('container-option-active');
        })
        e.target.classList.add('container-option-active');
        const value = e.target.getAttribute('value');
        dispatch(filterBy(value));
        setPage(1);
    }
    const [page, setPage] = useState(1);
    const handleChangePage = (e) => {
        setPage(parseInt(e.target.innerText))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])

    if (!data.length) {
        return (
            <Loading />
        )
    }
    return (
        <div className="container">
            <div className="container-main">
                <div className="container-filter">
                    <label htmlFor="filter" className="container-label">Sắp xếp theo</label>
                    <ul name="filter" id="filter" className="container-select">
                        <li value="name" className="container-option container-option-active" onClick={handleSubmit}>Tên</li>
                        <li value="price" className="container-option" onClick={handleSubmit}>Giá</li>
                        <li value="author" className="container-option" onClick={handleSubmit}>Tác giả</li>
                    </ul>
                </div>
                <div className="container-list">
                    {data.map((item, index) => {
                        return (
                            <Item data={item} key={index} index={index} page={page} />
                        )
                    })}
                </div>
                <div className="container-paganation">
                    <Pagination count={10} hidePrevButton hideNextButton page={page} onChange={handleChangePage} />
                </div>
            </div>
        </div>
    )
}

export default Container
