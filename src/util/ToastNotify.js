import { ToastContainer } from 'react-toastify';
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

const ToastNotify = ({ autoCloseAfter = 2000 }) => {
    return (
        <StyledContainer
            autoClose={autoCloseAfter}
            hideProgressBar
        >
        </StyledContainer>
    )
}

export default ToastNotify;