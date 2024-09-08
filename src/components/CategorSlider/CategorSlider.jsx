import React, { useEffect, useState } from 'react'
import Style from "./CategorSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function CategorSlider() {

  const [categories, setCategories] = useState([])

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        // console.log(data.data);
        setCategories(data.data)
      })
      .catch((error) => {

      })
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,


  };



  useEffect(() => {
    getCategories()
  }, [])
  return (
    <>
      <div className='p-5'>
        <h2 className='pb-3 font-semibold text-lg text-gray-600'>Shop Popular Categories</h2>
        <Slider {...settings}>

          {categories.map((category) => <div key={category._id} className=' mb-10'>
            <div className='container'>
              <img className='w-full mb-3 slider-hight' src={category.image} alt={category.name} />
              <h3 className=' text-lg text-gray-500'>{category.name}</h3>
            </div>
          </div>

          )}
        </Slider>
        </div>
      </>
      )
}
