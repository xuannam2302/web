import React, { useState } from "react";
import { Link } from 'react-router-dom'

const Login = () => {

    // Component State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function handler
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div className="containr">
            <div className="login-form" onSubmit={handleSubmit}>
                <form className="login-form-container">
                    <h2 className="login-form-title">Đăng nhập</h2>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control-input"
                        />
                        <p className="form-control-error"></p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control-input"
                        />
                        <p className="form-control-error"></p>
                    </div>
                    <div className="login-form-btn">
                        <button>
                            Đăng nhập
                        </button>
                    </div>
                    <div className="form-another-link">
                        <p className="form-another-link-text">
                            Chưa có tài khoản?
                            <Link to="/register">
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