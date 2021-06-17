const showErrorMessage = (error) => {
    const message =
        (error.response &&
            error.response.data &&
            (error.response.data.message || error.response.data.msg)) ||
        error.message ||
        error.toString();

    return message;
}

export default showErrorMessage;