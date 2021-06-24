const changeToLocalePrice = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const convertVND = (value) => {
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

export { changeToLocalePrice, convertVND };