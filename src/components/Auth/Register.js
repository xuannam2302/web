import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'

import { isRequired, isEmail, minLength, getErrorTag } from '../../util/Validator'

import {register} from '../../actions/auth'

const Register = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorUserName, setErrorUserName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleUserName = (target) => {
        const value = target.value;
        const getError = isRequired(value) || "";
        if(getError) {
            target.classList.add("form-control-input-invalid");
            setErrorUserName(getError);
        }
    }

    const handleEmail = (target) => {
        const value = target.value;
        const getError = isRequired(value) || isEmail(value) || "";
        if(getError) {
            target.classList.add("form-control-input-invalid");
            setErrorEmail(getError);
        }
    }

    const handlePassword = (target) => {
        const value = target.value;
        const getError = isRequired(value) || minLength(value, 6) || "";
        if(getError) {
            target.classList.add("form-control-input-invalid");
            setErrorPassword(getError);
        }
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

    const validationAll = () => {
        const nameElement = document.querySelector("input[name='name']");
        const emailElement = document.querySelector("input[name='email']");
        const passwordElement = document.querySelector("input[name='password']");
        handleUserName(nameElement);
        handleEmail(emailElement);
        handlePassword(passwordElement);

        // console.log(nameElement, emailElement, passwordElement);

    }
    const handleRegister = (e) => {
        e.preventDefault();
        // validationAll();
        // if(1) {
            dispatch(register(userName, email, password));
            history.push('/auth/login');
            console.log("Submit form");
        // }
        // else {

        // }
    }

    return (
        <div className="container">
            <div className="register-form">
                <form className="register-form-container" onSubmit={handleRegister}>
                    <h2 className="register-form-title">Đăng ký</h2>
                    <div className="form-control">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            type="text"
                            className="form-control-input"
                            onBlur={(e) => handleUserName(e)}
                            onKeyUp={(e) => clearError(e.target)}
                            name="name"
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
                            onBlur={(e) => handleEmail(e)}
                            onKeyUp={(e) => clearError(e.target)}
                            name="email"
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
                            onBlur={(e) => handlePassword(e)}
                            onKeyUp={(e) => clearError(e.target)}
                            name="password"
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
            </div>
        </div>
    )
}

export default Register
