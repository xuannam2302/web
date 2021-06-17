const changeToLocalePrice = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export { changeToLocalePrice };