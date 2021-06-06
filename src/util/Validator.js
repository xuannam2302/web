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

const isNumber = (value) => {
    return isNaN(value) ? "Trường này phải là số" : undefined;
}

const isHigher = (value, higher, currency = "") => {
    return parseFloat(value) > parseFloat(higher) ? `Trường này có giá trị tối đa là ${higher} ${currency}` : undefined;
}

const isLower = (value, lower, currency = "") => {
    return parseFloat(value) < parseFloat(lower) ? `Trường này có giá trị tối thiểu là ${lower} ${currency}` : undefined;
}

export { isRequired, isEmail, minLength, getErrorTag, isNumber, isLower, isHigher }