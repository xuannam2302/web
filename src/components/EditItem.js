import React, { useEffect, useState } from 'react'
import { Grid, TextField, makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'

import { findLandingPage, updateItem } from '../actions/books'

import Loading from '../components/Loading'

const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(2)
        },
        '& .MuiFormLabel-root': {
            fontSize: '1.5rem'
        },
        '& .MuiInputBase-input': {
            fontSize: '1.5rem'
        }
    }
}))

const EditItem = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyle();
    const { _id } = useParams();
    console.log(_id);
    const item = useSelector(state => state.item);
    console.log(item);
    const [name, setName] = useState(item.name);
    const [author, setAuthor] = useState(item.author);
    const [image, setImage] = useState(item.image)
    const [stars, setStars] = useState(item.book_depository_stars);
    const [price, setPrice] = useState(item.price);
    const [old_price, setOld_Price] = useState(item.old_price);
    const [isbn, setISBN] = useState(item.isbn);

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }
    const handleUpdate = () => {
        const newItem = {
            name,
            author,
            image,
            stars,
            price,
            old_price,
            isbn
        }
        dispatch(updateItem(_id, newItem));
    }
    const handleCancel = () => {
        history.push(`/book/${_id}`);
    }
    useEffect(() => {
        dispatch(findLandingPage(_id));
    }, [_id, dispatch])
    if (!(Object.keys(item).length === 0 && item.constructor === Object)) {
        <Loading />
    }
    return (
        <form className={`${classes.root} edit-item`} onSubmit={handleOnSubmit}>
            <Grid container>
                <Grid item xs={10}>
                    <TextField
                        value={name}
                        variant="outlined"
                        label="Tên"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        value={author}
                        variant="outlined"
                        label="Tác giả"
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <TextField
                        value={image}
                        variant="outlined"
                        label="Hình ảnh"
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <TextField
                        value={stars}
                        variant="outlined"
                        label="Đánh giá"
                        onChange={(e) => setStars(e.target.value)}
                    />
                    <TextField
                        value={price}
                        variant="outlined"
                        label="Giá tiền hiện tại"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        value={old_price}
                        variant="outlined"
                        label="Giá tiền cũ"
                        onChange={(e) => setOld_Price(e.target.value)}
                    />
                    <TextField
                        value={isbn}
                        variant="outlined"
                        label="Số hiệu isbn"
                        onChange={(e) => setISBN(e.target.value)}
                    />
                </Grid>
            </Grid>
            <div className="edit-item-control-btn">
                <button className="edit-item-btn edit-item-btn-cancel" onClick={handleCancel}>Hủy</button>
                <button className="edit-item-btn edit-item-btn-update" onClick={handleUpdate}>Cập nhật</button>
            </div>
        </form>
    )
}

export default EditItem
