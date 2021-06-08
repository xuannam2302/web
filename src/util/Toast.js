import React from 'react';

const Toast = ({ state, desc }) => {
    return (
        <div className="toast-container">
            <h3 className="toast-state">{state}</h3>
            <p className="toast-desc">{desc}</p>
        </div>
    )
}

export default Toast;
