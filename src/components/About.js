import React from 'react'

import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'

const About = () => {
    return (
        <div className="about">
            <h2 className="about-title">
                Về chúng tôi
            </h2>
            <ul className="about-list">
                <li className="about-item">
                    <img 
                        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/bd/bdad6f1b60abb6554f68702e29c1bd8c34308b21_full.jpg" 
                        alt="Wibu" 
                        className="about-img" 
                    />
                    <h4 className="about-name">John Smith</h4>
                    <p className="about-position">Back-end Developer</p>
                </li>
                <li className="about-item">
                    <img 
                        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcBcof7%2FbtqQhKTpC3J%2FzB07HqPNKdyEi85tlqENZ0%2Fimg.jpg" 
                        alt="Wibu" 
                        className="about-img" 
                    />
                    <h4 className="about-name">Tom Cruise</h4>
                    <p className="about-position">Front-end Developer</p>
                </li>
                <li className="about-item">
                    <img 
                        src={pic1}
                        alt="Wibu" 
                        className="about-img" 
                    />
                    <h4 className="about-name">Tom Hand</h4>
                    <p className="about-position">Graphic Designer</p>
                </li>
                <li className="about-item">
                    <img 
                        src={pic2}
                        alt="Wibu" 
                        className="about-img" 
                    />
                    <h4 className="about-name">Toni Kroos</h4>
                    <p className="about-position">UI/UX Designer</p>
                </li>
            </ul>
        </div>
    )
}

export default About
