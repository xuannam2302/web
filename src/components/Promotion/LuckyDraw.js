import React, { useState } from 'react'

import {convertVND} from '../../util/ChangeUnit'

const LuckyDraw = () => {

    // Function handler for button and lucky draw
    var timeOut;
    function render() {
        const boxContainerElement = document.querySelector('.box-container');
        const tearElement = document.querySelector('.tear-container');
        let arr = [];
        for (let i = 1; i < 1000; i++) {
            if (i > 10) {
                arr.push(`
                <li id="box" style="position: absolute ;top: -${(i - 10) * 40}px; animation: down-1 4s 0.1s linear 1;
                "
                >
                    <div>
                        ${Math.ceil(Math.random() * 10000)}
                    </div>
                </li>`);
            }
            else {
                arr.push(`
                <li id="box" style="animation: down-1 4s 0.1s linear 1;">
                    <div>
                        ${Math.ceil(Math.random() * 10000)}
                    </div>
                </li>
                `)
            }
        }
        tearElement.style.animation = "tear-move 0.5s linear 6, tear-slow 1s 3s 1, tear-stop 0.5s 4s linear infinite";
        boxContainerElement.innerHTML = arr.join("");

        timeOut = setTimeout(() => {
            stopSpin();
        }, 4000)

    }

    function stopSpin() {
        // clear TimeOut and reset disabled state
        clearTimeout(timeOut);
        setIsDisable(false);

        const boxContainerElement = document.querySelector('.box-container');
        const tearElement = document.querySelector('.tear-container');
        let result = [];
        for (let i = 1; i <= 10; i++) {
            result.push(`
            <li id="box">
                <div class=${i === 5 ? 'luckydraw-reward' : null}>
                    ${Math.ceil(Math.random() * 10000)}
                </div>
            </li>
        `)
        }
        boxContainerElement.innerHTML = result.join("");
        tearElement.style.animation = "";
        const finnal = boxContainerElement.querySelector('.luckydraw-reward');
        const newArray = thewinner.concat([finnal.textContent.trim()]);
        if (newArray.length > 6) {
            setTheWinner([finnal.textContent.trim()]);
        }
        else {
            setTheWinner(newArray);
        }
    }


    // State of component
    const [isDisable, setIsDisable] = useState(false);
    const [thewinner, setTheWinner] = useState([1,2,3,4,5,6]);

    // Render
    return (
        <div className="container">
            <div className="luckydraw-container">
                <ul className="box-container">
                    <li id="box">
                        <div>1</div>
                    </li>
                    <li id="box">
                        <div>2</div>
                    </li>
                    <li id="box">
                        <div>3</div>
                    </li>
                    <li id="box">
                        <div>4</div>
                    </li>
                    <li id="box">
                        <div>5</div>
                    </li>
                    <li id="box">
                        <div>6</div>
                    </li>
                    <li id="box">
                        <div>7</div>
                    </li>
                    <li id="box">
                        <div>8</div>
                    </li>
                    <li id="box">
                        <div>9</div>
                    </li>
                    <li id="box">
                        <div>10</div>
                    </li>
                </ul>
                <div className="tear-container">
                    <div className="tear-lucky">
                    </div>
                    <div className="tear-lucky-down">
                    </div>
                </div>
                <div className="btn-control">
                    <button
                        className="btn-start luckydraw-btn"
                        onClick={() => { setIsDisable(!isDisable); render() }}
                        disabled={isDisable}
                    >Spin
                    </button>
                </div>
                <div className="display">
                    <div className="display-winner">
                        <h3 className="display-title">Danh sách trúng thưởng</h3>
                        <h3 className="first-prize">
                        <span className="number">
                                1 giải nhất: 
                            </span>
                            <div className="list">
                                <span>{thewinner[0]}</span>
                            </div>
                        </h3>
                        <h3 className="second-prize">
                            <span className="number">
                                2 giải nhì: 
                            </span>
                            <div className="list">
                                <span>{thewinner[1]}</span>
                                <span>{thewinner[2]}</span>
                            </div>
                        </h3>
                        <h3 className="third-prize">
                        <span className="number">
                                3 giải ba: 
                            </span>
                            <div className="list">
                                <span>{thewinner[3]}</span>
                                <span>{thewinner[4]}</span>
                                <span>{thewinner[5]}</span>
                            </div>
                        </h3>
                    </div>
                    <div className="display-config">
                        <h3 className="display-config-title">Cơ cấu giải thưởng</h3>
                        <div className="display-config-prize">
                            <div className="config-prize-control">
                                <span className="config-text">
                                    1 giải nhất:
                                </span>
                                <span className="config-amount">{convertVND(1000000)}</span>
                            </div>
                            <div className="config-prize-control">
                                <span className="config-text">
                                    2 giải nhì:
                                </span>
                                <span className="config-amount">{convertVND(500000)}</span>
                            </div>
                            <div className="config-prize-control">
                                <span className="config-text">
                                    3 giải ba:
                                </span>
                                <span className="config-amount">{convertVND(300000)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LuckyDraw
