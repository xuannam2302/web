import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { displayAll } from '../../actions/books';
import { deleteItem, updateItem } from '../../actions/books';

import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { toast } from 'react-toastify';
import ToastNotify from '../../util/ToastNotify';
import Toast from '../../util/Toast';

import Loading from '../../components/Loading';
import RatingStar from '../../util/RatingStar';

import {
    DataGrid,
    GridToolbar
} from '@material-ui/data-grid';


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


function renderRating(params) {
    return <RatingStar value={params.value} />;
}

const AdminContent = () => {

    const deleteBook = () => toast.success(<Toast state="Successfully" desc="Xóa thành công" />);

    // const exist = () => toast.warn(<Toast state="Warning" desc="Đã tồn tại" />)

    // const create = () => toast.success(<Toast state="Successfully" desc="Tạo thành công"/>)

    const dispatch = useDispatch();
    const classes = useStyles();
    const data = useSelector(state => state.data);
    // const item = useSelector(state => state.item);

    const { books } = data;

    console.log("Books admin", books);

    useEffect(() => {
        dispatch(displayAll());
    }, [dispatch]);

    const handleEdit = (el) => {
        console.log(el);
        dispatch(updateItem(el._id, el));
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
                editable: true
            },
            {
                field: 'author',
                headerName: 'Author',
                width: 150,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell',
                editable: true
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
                cellClassName: 'super-app-theme--cell',
                editabel: true
            },
            {
                field: 'last_modified',
                headerName: 'Last Modified',
                width: 250,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell',
                type: 'dateTime',
                editable: true
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
                                onClick={() => { handleEdit(params.row) }}
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
        console.log(books);
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
                <ToastNotify />
            </div>
        )
    }
    return (
        <Loading />
    )
}

export default AdminContent;
