import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { isRequired, isEmail, minLength, getErrorTag } from '../../util/Validator';

import { register } from '../../actions/auth';

import { clearMessage } from '../../actions/message';

// import Loading from '../Loading';
import Toast from "../Toast";
import { toast } from 'react-toastify';
import ToastNotify from "../../util/ToastNotify";


const Register = () => {
    // Global variables
    const stopPage = localStorage.getItem('user') !== null;
    const dispatch = useDispatch();
    const history = useHistory();

    const msg = useSelector(state => state.message);
    console.log(msg);

    const warningUserName = () => toast.warn(<Toast state="Warning" desc="Tên đăng nhập đã tồn tại" />);
    const warningEmail = () => toast.warn(<Toast state="Warning" desc="Địa chỉ email đã được sử dụng" />);
    const successfullyRegister = () => toast.success(
        <Toast state="Success" desc="Đăng ký thành công, vui lòng xác nhận email" />,
        {
            autoClose: 3000,
        }
    );

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorUserName, setErrorUserName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleUserName = (target) => {
        const value = target.value;
        const getError = isRequired(value) || minLength(value, 6) || "";
        if (getError) {
            target.classList.add("form-control-input-invalid");
            setErrorUserName(getError);
            return 1;
        }
        return 0;
    }

    const handleEmail = (target) => {
        const value = target.value;
        const getError = isRequired(value) || isEmail(value) || "";
        if (getError) {
            target.classList.add("form-control-input-invalid");
            setErrorEmail(getError);
            return 1;
        }
        return 0;
    }

    const handlePassword = (target) => {
        const value = target.value;
        const getError = isRequired(value) || minLength(value, 7) || "";
        if (getError) {
            target.classList.add("form-control-input-invalid");
            setErrorPassword(getError);
            return 1;
        }
        return 0;
    }

    const clearError = (e) => {
        const errorElement = getErrorTag(e);
        errorElement.parentElement.querySelector('input').classList.remove("form-control-input-invalid");
        const clearState = errorElement.parentElement.querySelector('label').getAttribute('for');
        switch (clearState) {
            case "name":
                setErrorUserName("");
                break;
            case "email":
                setErrorEmail("");
                break;
            case "password":
                setErrorPassword("");
                break;
            default:

        }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const formElement = document.getElementById("form-register");
        const emailElement = formElement.querySelector("#email");
        const nameElement = formElement.querySelector("#name");
        const passwordElement = formElement.querySelector("#password");

        let check = handleUserName(nameElement) || handleEmail(emailElement) || handlePassword(passwordElement);
        if (!check) {
            dispatch(register(userName, email, password));
        }
        else {
            console.log("Error");
        }
    }

    useEffect(() => {
        if (msg !== undefined) {
            if (msg.msg === 'Username is already in use') {
                warningUserName();
                // dispatch(clearMessage());
            }
            else if (msg.msg === 'Email is already in use') {
                warningEmail();
                // dispatch(clearMessage());
            }
            else if (msg.msg === 'User was registered successfully') {
                successfullyRegister();
                setTimeout(() => {
                    history.push('/auth/login');
                }, 3000)
                dispatch(clearMessage());
                console.log("Submit form");
            }
        }

    }, [msg, history, dispatch])

    useEffect(() => {
        if(stopPage) {
           history.push("/");
        }
    }, [stopPage, history])

    return (
        <div className="container">
            <div className="register-form">
                <form id="form-register" className="register-form-container" onSubmit={handleRegister}>
                    <h2 className="register-form-title">Đăng ký</h2>
                    <div className="form-control">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            type="text"
                            className="form-control-input"
                            onBlur={(e) => handleUserName(e.target)}
                            onKeyUp={(e) => clearError(e.target)}
                            name="name"
                            id="name"
                        />
                        <p className="form-control-error">{errorUserName}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control-input"
                            onBlur={(e) => handleEmail(e.target)}
                            onKeyUp={(e) => clearError(e.target)}
                            name="email"
                            id="email"
                        />
                        <p className="form-control-error">{errorEmail}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control-input"
                            onBlur={(e) => handlePassword(e.target)}
                            onKeyUp={(e) => clearError(e.target)}
                            name="password"
                            id="password"
                        />
                        <p className="form-control-error">{errorPassword}</p>
                    </div>
                    <div className="register-form-btn" onClick={handleRegister}>
                        <button>
                            Đăng ký
                        </button>
                    </div>
                    <div className="form-another-link">
                        <p className="form-another-link-text">
                            Đã có tài khoản?
                            <Link to="/auth/login">
                                <strong>Đăng nhập</strong>
                            </Link>
                        </p>
                    </div>
                </form>
                <ToastNotify />
            </div>
        </div>
    )
}

export default Register;
