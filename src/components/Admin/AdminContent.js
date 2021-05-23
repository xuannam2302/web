import React, { useEffect, useState } from 'react'

import styled from 'styled-components';

import { searchFunction, deleteItem } from '../../actions/books'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Rating from '@material-ui/lab/Rating';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    DataGrid,
    GridToolbar
} from '@material-ui/data-grid';

import Loading from '../../components/Loading'

import Toast from '../../components/Toast'

const useStyles = makeStyles({
    root: {
        '& .super-app-theme--header': {
            fontSize: '1.2rem'
        },
        '& .super-app-theme--header-small': {
            width: '10rem'
        },
        '& .super-app-theme--cell': {
            fontSize: '1.2rem',
            align: 'left'
        },
        '& .MuiTablePagination-caption': {
            fontSize: '1.2rem'
        },
        '& .MuiButton-label': {
            fontSize: '1.2rem'
        },
        '& .MuiDataGrid-gridMenuList': {
            fontSize: '1.2rem'
        },
        '& .MuiDataGrid-selectedRowCount': {
            fontSize: '1.2rem'
        }
    },
});

const StyledContainer = styled(ToastContainer).attrs({
    className: 'toast-container',
    toastClassName: 'toast',
    bodyClassName: 'body',
    progressClassName: 'progress',
})`
    .Toastify__toast--success {
        background: #3ebe61
    }
    .Toastify__toast--error {
        background: #ee8068
    }
    .Toastify__toast--warning {
        background: #ef9400
    }
`;


function renderRating(params) {
    return <Rating readOnly value={params.value} />;
}


const AdminContent = () => {

    const [editable, setEditable] = useState(false);

    const deleteBook = () => toast.success(<Toast state="Successfully" desc="Xóa thành công" />);

    const edit = () => toast.warn(<Toast state="Warning" desc="Đã tồn tại" />)


    const dispatch = useDispatch();
    const classes = useStyles();
    const data = useSelector(state => state.books);
    const item = useSelector(state => state.item);
    console.log(item);
    const { books } = data;
    useEffect(() => {
        dispatch(searchFunction(''));
    }, [dispatch, item])
    const handleEdit = (e) => {
        let el = e.target;
        while (el) {
            if (el.getAttribute('keyid'))
                break;
            el = el.parentNode;
        }
        console.log({ el });
    }
    const handleDelete = (id) => {
        dispatch(deleteItem(id));
        deleteBook();
    }
    if (books) {
        books.forEach((book, index) => {
            book.id = index + 1;
        })
        const columns = [
            {
                field: 'id',
                headerName: 'ID',
                width: 75,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell',
                alignHeader: 'center'
            },
            {
                field: 'name',
                headerName: 'Name',
                width: 200,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell',
            },
            {
                field: 'author',
                headerName: 'Author',
                width: 150,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell'
            },
            {
                field: 'category',
                headerName: 'Category',
                width: 200,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell'
            },
            {
                field: 'format',
                headerName: 'Format',
                width: 150,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell'
            },
            {
                field: 'image',
                headerName: 'Link image',
                width: 200,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell'
            },
            {
                field: 'book_depository_stars',
                headerName: 'Rating',
                width: 150,
                renderCell: renderRating,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell'
            },
            {
                field: 'price',
                headerName: 'New Price',
                width: 150,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell'
            },
            {
                field: 'old_price',
                headerName: 'Old Price',
                width: 150,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell'
            },
            {
                field: 'isbn',
                headerName: 'ISBN',
                width: 150,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell'
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 150,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell',
                renderCell: (params) => {
                    return (
                        <strong>
                            <Button
                                keyid={params.id}
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<EditIcon />}
                                onClick={(e) => console.log(e)}
                            >
                                Edit
                            </Button>
                        </strong>
                    )
                }
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 150,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell',
                renderCell: (params) => {
                    return (
                        <strong>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDelete(params.row._id)}
                            >
                                Delete
                            </Button>
                        </strong>
                    )
                }
            }
        ];
        return (
            <div className={`admin-content ${classes.root}`} style={{ height: 800, width: '100%' }}>
                <DataGrid
                    checkboxSelection
                    disableSelectionOnClick
                    rows={books}
                    columns={columns}
                    pageSize={12}
                    getRowClassName="super-app-theme--cell"
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
                <StyledContainer
                    autoClose={1800}
                    hideProgressBar
                >
                </StyledContainer>
            </div>
        )
    }
    return (
        <Loading />
    )
}

export default AdminContent
