const showErrorMessage = (error) => {
    const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();

    return message;
}

export default showErrorMessage;