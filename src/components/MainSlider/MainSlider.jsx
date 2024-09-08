import React, { useEffect, useState } from 'react'
import Style from "./MainSlider.module.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSliders1 from "../../assets/images/grocery-banner-2.jpeg"
import MainSliders2 from "../../assets/images/grocery-banner.png"
import MainSliders3 from "../../assets/images/slider-2.jpeg"
import SideImages1 from "../../assets/images/slider-image-2.jpeg"
import SideImages2 from "../../assets/images/slider-image-3.jpeg"


export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,

  };

  return (
    <>
      <div className="row">

        <div className='w-3/4 rounded-lg overflow-hidden'>
          <Slider {...settings}>
            <img className='w-full h-[400px]' src={MainSliders1} alt="" />
            <img className='w-full h-[400px]' src={MainSliders2} alt="" />
            <img className='w-full h-[400px]' src={MainSliders3} alt="" />



          </Slider>
        </div>
        <div className='w-1/4 rounded-lg overflow-hidden'>
        <img className='w-full h-[200px]' src={SideImages1} alt="" />
        <img className='w-full h-[200px]' src={SideImages2} alt="" />
        </div>

      </div>

    </>
  )
}
