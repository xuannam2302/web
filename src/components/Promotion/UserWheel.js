import React, { useState } from 'react'

import FireWork from './FireWork'

const UserWheel = () => {

    function getColor(index) {
        console.log(index);
        switch (index) {
            case 1:
                return 'red';
            case 2:
                return 'yellow';
            case 3:
                return 'blue';
            case 4:
                return 'green';
            case 5:
                return 'tomato'
            case 6:
                return 'purple';
            case 7:
                return 'deeppink'
            case 8:
                return 'chartreuse';
            case 9:
                return 'darkSeaGreen';
            case 10:
                return 'IndianRed';
            case 11:
                return 'lime';
            case 12:
                return 'NavajoWhite'
            default:
                return 'white';
        }
    }

    const [nameSpin, setNameSpin] = useState('promotion-wheel-container');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [isSpin, setIsSpin] = useState(true);
    const [result, setResult] = useState([]);
    const [isDisplay, setIsDisplay] = useState(false);
    const fireworkConfig = {
        dots: 15,
        isDisplay: isDisplay
    }

    const handleonMouseClickSpin = () => {
        const newName = 'promotion-wheel-container promotion-wheel-container-spin-start';
        setNameSpin(newName);
        setIsSpin(false);
        const arrowElement = document.querySelector('.promotion-wheel-arrow');
        arrowElement.classList.add('promotion-wheel-arrow-start');
        setIsDisplay(false);

        const time = (end <= start ? (1000 - start + end) : (end - start));
        const duration = Math.ceil(time / 100) * 1000 + Math.floor(Math.random() * 1000) + 1;

        setTimeout(() => {

            const newState = 'promotion-wheel-container promotion-wheel-container-spin-start promotion-wheel-container-spin-stop'
            setNameSpin(newState);
            setIsSpin(true);

            const liElement = document.querySelectorAll('.promotion-wheel-item');
            let m = 10000;
            let indexLast = -1;
            liElement.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                if (rect.y < m) {
                    m = rect.y;
                    indexLast = index;
                }
            })
            const color = getColor(indexLast + 1);
            const timeStamp = new Date();
            let dateTime = timeStamp.toLocaleDateString().split('/');
            [dateTime[0], dateTime[1]] = [dateTime[1], dateTime[0]];
            const dateTimeStamp = dateTime.join('/');
            const atTime = timeStamp.toLocaleTimeString();
            const newResult = {
                time: atTime,
                result: indexLast + 1,
                date: dateTimeStamp,
                background: color
            }
            const newArray = result.concat([newResult]);
            if (result.length > 10) {
                setResult([newResult]);
            }
            else {
                setResult(newArray);
            }
            console.log(result);
            arrowElement.classList.remove('promotion-wheel-arrow-start');
            setIsDisplay(true);
        }, duration)
    }

    const getStart = () => {
        const e = new Date();
        setStart(e.getUTCMilliseconds());
    }
    const getEnd = () => {
        const e = new Date();
        setEnd(e.getUTCMilliseconds());
    }

    return (
        <div className="container">
            <FireWork
                config={fireworkConfig}
            />
            <div className="promotion-wheel">
                <div className="promotion-wheel-main">
                    <div className="promotion-wheel-arrow"></div>
                    <ul className={nameSpin}>
                        <li className="promotion-wheel-item">
                            <div>1</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>2</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>3</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>4</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>5</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>6</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>7</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>8</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>9</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>10</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>11</div>
                        </li>
                        <li className="promotion-wheel-item">
                            <div>12</div>
                        </li>
                    </ul>
                    <button
                        className="promotion-wheel-spin"
                        onClick={handleonMouseClickSpin}
                        onMouseDown={getStart}
                        onMouseUp={getEnd}
                        disabled={!isSpin}
                    >
                        Spin
                    </button>
                </div>
                <div className="promotion-wheel-prize-board">
                    <h3 className="promotion-wheel-prize-title">
                        Phần thưởng đã trúng
                    </h3>
                    <div className="promotion-wheel-prize-list">
                        {result.map((item, key) => {
                            return (
                                <div className="promotion-wheel-prize-item" key={key}>
                                    Chúc mừng bạn nhận được <span style={{color: item.background, fontWeight: 'bold'}}>{item.result}</span> vào lúc <strong>
                                        {item.time}
                                    </strong> ngày <strong>{item.date}</strong>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="promotion-wheel-banner">
                    <img src="https://images.unsplash.com/photo-1558452919-08ae4aea8e29?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="Img" />
                </div>
            </div>
            <FireWork
                config={fireworkConfig}
            />
        </div>
    )
}

export default UserWheel
