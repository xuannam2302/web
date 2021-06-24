import React from 'react'

const FireWork = ({config}) => {
    const {dots, isDisplay} = config;
    let data = [];
    for(let i = 1; i <= dots; i++) {
        data.push(i);
    }
    return (
        <div className={`firework-container ${isDisplay ? "" : 'firework-container-hidden'}`}>
            {data.map((item, index) => {
                return (
                    <div className={`firework-${item}`} key={index}>
                    </div>
                )
            })}
        </div>
    )
}

export default FireWork
