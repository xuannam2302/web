import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import $ from 'jquery';

import data from './data.js'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        borderRadius: theme.spacing(1),
        outline: 'none',
    },
    'modal-container': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    'modal-content': {
        fontSize: '1.4rem',
        marginTop: '1.2rem',
    },
    'modal-content-label': {
        fontWeight: 'bold',
        marginLeft: '-1.6rem',
    },
    'modal-control': {
        fontSize: '1.2rem',
        marginLeft: '1rem',
    },
    'modal-label': {
        display: 'inline-block',
        minWidth: '12rem',
    },
    'modal-item': {
        padding: '6px',
        margin: '6px 0',

        display: 'inline-block',
        minWidth: '20rem',
    },
    'modal-button': {
        float: 'right',

        padding: '5px 8px',
        margin: '0.6rem',
        marginBottom: '1rem',
        marginTop: '2rem',

        borderRadius: '5px',
        background: 'rgba(12,135,238, 0.6)',
    }
}));

const ModalAddress = () => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [subDistrict, setSubDistrict] = useState([]);
    const [errorAddress, setErrorAddress] = useState('');
    const handleChooseProvince = () => {
        const provinceChoose = ($("#province").val());
        const temp = province.find(item => item.name === provinceChoose).level2s;
        setDistrict(temp);
        setErrorAddress('');
    }
    const handleChooseDistrict = () => {
        const districtChoose = ($("#district").val());
        const temp = district.find(item => item.name === districtChoose).level3s;
        setSubDistrict(temp);
        setErrorAddress('');
    }
    const handleSubDistrictChange = () => {
        setErrorAddress('');
    }
    const handleSubmit = () => {
        const province = $('#province').val();
        const district = $('#district').val();
        const subDistrict = $('#sub-district').val();

        if(province === '') {
            setErrorAddress('Vui l??ng ch???n t???nh/th??nh ph???');
        }
        else if(district === '') {
            setErrorAddress('Vui l??ng ch???n qu???n/huy???n');
        }
        else if(subDistrict === '') {
            setErrorAddress('Vui l??ng ch???n ph?????ng/x??');
        }
        else {
            console.log(province, district, subDistrict);
        }
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 style={{
                fontSize: '1.6rem',
                margin: '1.2rem 0 3rem',
                textAlign: 'center',
                fontWeight: 'bold'
            }}
            >
                Th??ng tin giao h??ng</h3>
            <div className={classes['modal-container']}>
                <div className={classes['modal-content']}>
                    <span className={classes['modal-content-label']}>
                        <span style={{ color: 'red' }}>* </span>Th??ng tin li??n h???:
                    </span>
                    <div className={classes['modal-control']}>
                        <label
                            className={classes['modal-label']}
                            htmlFor="username">H??? v?? t??n:
                        </label>
                        <input
                            type="text"
                            value="L?? H???u ?????c Minh"
                            className={classes['modal-item']}
                            style={{ padding: '0' }}
                            readOnly
                        />
                    </div>
                    <div className={classes['modal-control']}>
                        <label
                            className={classes['modal-label']}
                            htmlFor="phone-number">S??? ??i???n tho???i:
                        </label>
                        <input
                            type="text"
                            value="0965xxxxxx"
                            className={classes['modal-item']}
                            style={{ padding: '0' }}
                            readOnly
                        />
                    </div>
                </div>
                <div className={classes['modal-content']}>
                    <span className={classes['modal-content-label']}>
                        <span style={{ color: 'red' }}>* </span>?????a ch???:
                    </span>
                    <div className={classes['modal-control']}>
                        <label
                            className={classes['modal-label']}
                            htmlFor="province">T???nh/th??nh ph???:</label>
                        <select
                            className={classes['modal-item']}
                            name="province" id="province"
                            onChange={handleChooseProvince}
                        >
                            <option value="">-- Ch???n t???nh/th??nh ph??? --</option>
                            {province.map((item, index) => {
                                return (
                                    <option value={item.name} key={index}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={classes['modal-control']}>
                        <label
                            className={classes['modal-label']}
                            htmlFor="district">Qu???n/huy???n:</label>
                        <select
                            className={classes['modal-item']}
                            name="district"
                            id="district"
                            onChange={handleChooseDistrict}
                        >
                            <option value="">-- Ch???n qu???n/huy???n --</option>
                            {district.length > 0 && district.map((item, index) => {
                                return (
                                    <option value={item.name} key={index}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={classes['modal-control']}>
                        <label
                            className={classes['modal-label']}
                            htmlFor="sub-district">Ph?????ng/X??:</label>
                        <select
                            className={classes['modal-item']}
                            name="sub-district"
                            id="sub-district"
                            onChange={handleSubDistrictChange}
                        >
                            <option value="">-- Ch???n x??/ph?????ng --</option>
                            {subDistrict.length > 0 && subDistrict.map((item, index) => {
                                return (
                                    <option value={item.name} key={index}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <p style={{color: 'red', fontSize: '1.2rem', marginTop: '1.2rem'}}>{errorAddress}</p>
                </div>

            </div>
            <button className={classes['modal-button']} onClick={handleSubmit}>Submit</button>
        </div>
    );

    useEffect(() => {
        let arr = []
        data.forEach((item) => {
            arr.push(item);
        })
        setProvince(arr);
    }, [])

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Thay ?????i
            </button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                {body}
            </Modal>
        </div>
    );
}

export default ModalAddress;