import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="container">
            <div className="register-form">
                <form className="register-form-container">
                    <h2 className="register-form-title">Đăng ký</h2>
                    <div className="form-control">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control-input"
                        />
                        <p className="form-control-error"></p>
                    </div>
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
                    <div className="register-form-btn">
                        <button>
                            Đăng ký
                        </button>
                    </div>
                    <div className="form-another-link">
                        <p className="form-another-link-text">
                            Đã có tài khoản?
                            <Link to="/login">
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
