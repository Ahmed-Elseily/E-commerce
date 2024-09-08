import React, { useEffect, useState } from 'react'
import Style from "./LayOut.module.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function LayOut() {

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 py-20">
        <Outlet />
      </div>

      <Footer />
    </>
  )
}
