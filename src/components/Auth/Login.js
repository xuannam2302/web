import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { isRequired, getErrorTag } from '../../util/Validator'

import { login } from "../../actions/auth";

import Toast from "../Toast";
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

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


const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const data = useSelector(state => state.auth);
    const msg = useSelector(state => state.message);
    // const { msg } = data;
    console.log(data);
    console.log(msg);

    const loginSuccessful = () => toast.success(<Toast state="Successfully" desc="Đăng nhập thành công" />);
    const error = () => toast.error(<Toast state="Error" desc="Tên đăng nhập hoặc mật khẩu không chính xác" />);
    const warningVerified = () => toast.warn(<Toast state="Warning" desc="Tài khoản chưa được xác thực" />);

    // Component State
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const message = useSelector(state => state.message);
    console.log(message);
    // Error Messages
    const [errorUserName, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");


    // Handle Error
    const handleUserName = (target) => {
        const value = target.value;
        const getError = isRequired(value) || "";
        if (getError) {
            target.classList.add("form-control-input-invalid");
            setErrorUserName(getError);
            return 1;
        }
        return 0;
    }

    const handlePassword = (target) => {
        const value = target.value;
        const getError = isRequired(value) || "";
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
            case "password":
                setErrorPassword("");
                break;
            default:

        }
    }

    // Function handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const formElement = document.getElementById("form-login");
        const nameElement = formElement.querySelector("#name");
        const passwordElement = formElement.querySelector("#password");

        let check = handleUserName(nameElement) || handlePassword(passwordElement);
        if (!check) {
            dispatch(login(username, password));
        }
        else {
            console.log("Error");
        }
    }
    // useEffect(() => {
    //     if (msg === 'Successfully logged in') {
    //         loginSuccessful();
    //         // setTimeout(() => {
    //         //     history.push('/');
    //         // }, 2000)
    //     }
    //     else if (msg === 'Incorrect Username' || msg === 'Incorrect Password') {
    //         error();
    //     }
    //     else if (msg === 'This account is not verified') {
    //         warningVerified();
    //     }
    // }, [msg])

    return (
        <div className="containr">
            <div className="login-form">
                <form id="form-login" className="login-form-container" onSubmit={handleSubmit}>
                    <h2 className="login-form-title">Đăng nhập</h2>
                    <div className="form-control">
                        <label htmlFor="name">Tên đăng nhập</label>
                        <input
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            type="text"
                            className="form-control-input"
                            onBlur={e => handleUserName(e.target)}
                            onKeyUp={(e) => clearError(e.target)}
                            id="name"
                            name="name"
                        />
                        <p className="form-control-error">{errorUserName}</p>
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
                            id="password"
                            name="password"
                        />
                        <p className="form-control-error">{errorPassword}</p>
                    </div>
                    <div className="login-form-btn" onClick={handleSubmit}>
                        <button>
                            Đăng nhập
                        </button>
                    </div>
                    <div className="form-another-link">
                        <p className="form-another-link-text">
                            Chưa có tài khoản?
                            <Link to="/auth/register">
                                <strong>Đăng ký</strong>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <StyledContainer
                autoClose={1800}
                hideProgressBar
            >
            </StyledContainer>
        </div>
    );
}

export default Login;