import React from 'react'
import SliderSlick from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = () => {
    let settings = {
        infinite: true,
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay: true,
        arrows: false,

    };
    const data = [
        "https://salt.tikicdn.com/cache/w824/ts/banner/f6/0f/76/2679586268b3ecfaa4cf898e6574e2e7.png.jpg",
        "https://salt.tikicdn.com/cache/w824/ts/banner/e7/c3/ad/b1a47683d2a078d388b2d827c83419e4.png.jpg",
        "https://salt.tikicdn.com/cache/w824/ts/banner/a3/81/3a/7acca2e886414ea8c417598c6fc76231.jpg",
        "https://salt.tikicdn.com/cache/w824/ts/banner/29/29/48/6e257e4fdf0bb7a9300c70e52c1b8419.png.jpg",
        "https://salt.tikicdn.com/cache/w824/ts/banner/60/df/2f/f03409fc07cb5f73e93bb771ce0bbfd6.png.jpg",
    ]

    return (
        <div className="slider-container">
            <div className="slider-content">
                <div>
                    <SliderSlick {...settings}>
                        {data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img 
                                        src={item} 
                                        alt={`img-${item}`} 
                                        className="slider-img"
                                    />
                                </div>
                            )
                        })}
                    </SliderSlick>
                </div>
            </div>
            <div className="slider-extra">
            </div>
        </div>
    )
}

export default Slider
