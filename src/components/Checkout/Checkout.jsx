import React, { useContext, useEffect, useState } from 'react'
import Style from "./Checkout.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { userContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';




export default function CashCehckOut() {
  let { cartId, setCartCounter , deleteCart } = useContext(CartContext)


  let navigate = useNavigate()

  let headers = {
    token: localStorage.getItem("userToken")
  }

  const [isLoading, setIsLoading] = useState(false)

  const [onlinePyament, setOnlinePyament] = useState(false)


  async function handleCash(values) {
    setIsLoading(true)
    console.log(values);
    const backEndBody = {
      shippingAddress: values,
    };

    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        backEndBody,
        { headers: headers }
      );
      console.log('Response:', response.data); // Log the response data
      if (response.data.status === "success") {
        setIsLoading(false)
        toast.success("Your order has been placed succssfully")
        setCartCounter(0)
        navigate("/cart")
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error:', error.response?.data || error.message); // Log error response data or message
    }
  }
  async function handleOnline(values) {
    setIsLoading(true)
    console.log(values);
    const backEndBody = {
      shippingAddress: values,
    };

    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, backEndBody, {
        headers: headers,
        params: {
          url: "http://localhost:5173"
        }
      },
      );
      console.log('Response:', response.data); // Log the response data
      if (response.data.status === "success") {
        setIsLoading(false)
        toast.success("Your order has been placed succssfully")
        console.log(response.data.session);

        
        window.location.href = response.data.session.url;
        deleteCart()
        setCartCounter(0)
        navigate("/cart")
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error:', error.response?.data || error.message); // Log error response data or message
    }
  }
  function detectPaymentMethod(values) {
    if (onlinePyament) {
      console.log("online");
      
      handleOnline(values);
    }else{
      console.log("cash");
      
      handleCash(values);
    }
  }



  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: detectPaymentMethod
  });




  return (
    <>


      <div className=" w-full py-6 max-w-xl mx-auto">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <h2 className='text-3xl font-bold mb-5 text-green-600'>CheckOut</h2>
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details</label>
          </div>
          <div className="relative z-0 w-full mb-5 group ">
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city</label>
          </div>


          <div className='flex items-center'>
            <button onClick={()=>setOnlinePyament(false)} type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Pay Cash"}
            </button>
            <button onClick={()=>setOnlinePyament(true)} type="submit" className="ms-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Pay Online"}
            </button>
          </div>

        </form>
      </div>
    </>
  )
}

