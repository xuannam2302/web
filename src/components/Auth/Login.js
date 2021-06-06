import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { isRequired, getErrorTag } from '../../util/Validator'

import { login } from "../../actions/auth";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

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
            history.push('/');
        }
        else {
            console.log("Error");
        }
    }
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
        </div>
    );
}

export default Login;