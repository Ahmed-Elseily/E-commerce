import React, { useEffect, useState } from 'react'
import Style from "./Home.module.css"
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorSlider from '../CategorSlider/CategorSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  
  const [counter, setCounter] = useState(0)
  useEffect(()=>{},[])
    return (
    <>

    <MainSlider/>
    <CategorSlider/>
    <RecentProducts/>
    </>
  )
}
