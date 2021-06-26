const changeToLocalePrice = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const convertVND = (value) => {
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

const changeTimeStamp = (value) => {
    let date = new Date(value);
    const time = date.toISOString().substring(0, 10).split('-').reverse().join('/');
    return time;
}

const changeFullTimeStamp = (value) => {
    const time = new Date(value).toLocaleTimeString();
    return time;
}

const getAvatarFromUserName = (value) => {
    const arraySpilt = value.split(" ");
    let result = [];
    arraySpilt.forEach(string => {
        result.push(string[0].toUpperCase());
    })
    return result.join("");
}

export { 
        changeToLocalePrice, 
        convertVND, 
        changeTimeStamp, 
        changeFullTimeStamp,
        getAvatarFromUserName,
    };