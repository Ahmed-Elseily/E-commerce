import React, { useEffect, useState } from 'react'
import Style from "./NotFound.module.css"
import errorImg from "../../assets/images/error.svg"

export default function NotFound() {
  
    return (
    <>
    
    <div className="container">
      <div className="flex justify-center items-center">
        <img src={errorImg} alt="" />
      </div>
    </div>
    </>
  )
}
