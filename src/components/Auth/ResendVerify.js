import React from 'react';
import { useDispatch } from 'react-redux';

import { resendVerify } from '../../actions/auth';
import { setMessage } from '../../actions/message'


const ResendVerify = ({ username }) => {
    const dispatch = useDispatch();

    const handleVerify = () => {
        dispatch(resendVerify(username));
        dispatch(setMessage("This account is verified"));
    }

    return (
        <div className="resend-verify">
            <p>Bấm vào nút gửi để xác thực lại</p>
            <button onClick={handleVerify}>Gửi</button>
        </div>
    )
}

export default ResendVerify;
