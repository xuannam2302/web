import React, { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, TextField, makeStyles } from '@material-ui/core'
import { createItem } from '../actions/books'
import { History } from '@material-ui/icons';

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
    const data = useSelector(state => state.books);
    const { item, msg } = data;
    console.log(item);
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
    const handleCreate = async () => {
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
    }
    const handleCancel = () => {
        // history.push(`/`);
    }
    useEffect(() => {
        if (item !== undefined) {
            if (item[0]._id) {
                history.push('/admin');
            }
            // switch (msg) {
            //     case 'successful created':
            //         setNotify("Thành công");
            //         break;
            //     case 'exist':
            //         setNotify("Đã tồn tại");
            //         break;
            //     case 'error':
            //         setNotify("Đã có lỗi xảy ra");
            //         break;
            //     default:
            //         setNotify("");
            // }
        }
    }, [item, history])
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
                    <button className="edit-item-btn edit-item-btn-update" onClick={handleCreate}>Tạo mới</button>
                </div>
            </form>
        </>
    )
}

export default CreateItem