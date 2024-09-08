import React, { useEffect, useState } from 'react'
import Style from "./Footer.module.css"
import payments from "../../assets/images/payments.png"
import onlineApp from "../../assets/images/onlineApp.png"


export default function Footer() {

  return (
    <>
      <section className='footer-bg py-3'>
        <div className=''>
          <div className='ms-5 '>
            <h2 className=' text-green-600 font-bold text-2xl'>Get the FreshCart app</h2>
            <p className='font-semibold ms-5'>We will send you a link, open it on your phone to download the app</p>
          </div>
          <br></br>
          <div className='flex justify-between align-center mx-5  border-b-2 pb-4'>
            <div className='w-1/2'>
              <input type="email" id="helper-text" aria-describedby="helper-text-explanation" className=" focus:border-green-500 focus:ring-green-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Email" />
            </div>
            <button className='bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700'>Share App Link</button>
          </div>
          <br></br>
          <div className='flex justify-between items-center mx-5'>
            <div className='flex items-center'>
              <h2 className='text-2xl font-bold text-green-600 me-5'>Payment Partners</h2>
              <img width={350} src={payments} alt="" />
            </div>
            <div className='flex items-center'>
              <h2 className='text-2xl font-bold text-green-600 me-5'>Get deliveries with FreshCart</h2>
              <img width={150} src={onlineApp} alt="" />
            </div>

          </div>
        </div>

      </section>

    </>
  )
}
