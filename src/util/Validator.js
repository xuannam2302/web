
const isRequired = (value) => {
    return value.trim().length === 0 ? "Vui lòng nhập trường này" : undefined;
}

const isEmail = (value) => {
    let check = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
    return check ? undefined : 'Vui lòng điền email hợp lệ';
}

const minLength = (value, min) => {
    return value.trim().length < min ? `Tối thiểu ${min} kí tự` : undefined;
}

const getErrorTag = (e) => {
    const errorElement = e.parentElement.querySelector('.form-control-error');
    return errorElement;
}

export { isRequired, isEmail, minLength, getErrorTag }