import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { isRequired, getErrorTag } from '../../util/Validator';

import { clearMessage } from '../../actions/message';

import { login } from "../../actions/auth";

import { toast } from 'react-toastify';
import ToastNotify from '../../util/ToastNotify';
import Toast from '../../util/Toast';

import ResendVerify from './ResendVerify';


const Login = () => {
    // Global variables
    const stopPage = localStorage.getItem('token-verify') !== null;
    const dispatch = useDispatch();
    const history = useHistory();
    const msg = useSelector(state => state.message);
    // console.log(msg);

    const isResendVerify = msg && msg.msg === 'This account is not verified';

    // Toast message
    const loginSuccessful = () => toast.success(<Toast state="Successfully" desc="Đăng nhập thành công" />);
    const error = () => toast.error(<Toast state="Error" desc="Tên đăng nhập hoặc mật khẩu không chính xác" />, {
        autoClose: 5000
    });
    const warningVerified = () => toast.warn(<Toast state="Warning" desc="Tài khoản chưa được xác thực" />);
    const successVerify = () => toast.success(
        <Toast state="Successfully" desc="Đã gửi xác nhận vui lòng kiểm tra email" />, {
        autoClose: 5000
    });

    // Component State
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
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
    useEffect(() => {
        if (msg !== undefined) {
            if (msg.msg === 'Successfully logged in') {
                loginSuccessful();
                dispatch(clearMessage());
                setTimeout(() => {
                    history.push('/');
                }, 2000)
            }
            else if (msg.msg === 'Incorrect Username or Password') {
                error();
                // dispatch(clearMessage());
            }
            else if (msg.msg === 'This account is not verified') {
                warningVerified();
                // dispatch(clearMessage());
            }
            else if(msg.msg === 'This account is verified') {
                successVerify();
                dispatch(clearMessage());
            }
        }

    }, [msg, history, dispatch]);

    useEffect(() => {
        if (stopPage) {
            history.push("/");
        }
    }, [stopPage, history]);


    return (
        <div className="container">
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
                    {isResendVerify && <ResendVerify username={username} />}
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
            <ToastNotify />
        </div>
    );
}

export default Login;