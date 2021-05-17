import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, TextField, makeStyles } from '@material-ui/core'
import { createItem } from '../actions/books'

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

const CreateItem = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const item = useSelector(state => state.item);
    const classes = useStyle();
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('')
    const [stars, setStars] = useState('');
    const [price, setPrice] = useState('');
    const [old_price, setOld_Price] = useState('');
    const [isbn, setISBN] = useState('');
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
        dispatch(createItem(newItem));
        history.push(`/book/${item._id}`);
    }
    const handleCancel = () => {
        history.push(`/`);
    }
    return (
        <>
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
                    <button className="edit-item-btn edit-item-btn-update" onClick={handleUpdate}>Tạo mới</button>
                </div>
            </form>

        </>
    )
}

export default CreateItem