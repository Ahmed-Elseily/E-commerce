import React, { useContext, useEffect, useState } from 'react'
import Style from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { userContext } from '../../context/UserContext';

export default function Login() {
  let navigate = useNavigate()
  
  let {setUserLogin} = useContext(userContext)

  const [isLoading, setIsLoading] = useState(false)


  const [accountAlreadyExist, setAccountAlreadyExist] = useState("")
  async function handleLogin(formValues) {
    setIsLoading(true);
    console.log("register");
    console.log(formValues);
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      setIsLoading(false);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setUserLogin(data.token)
        navigate("/")

      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
      setAccountAlreadyExist(error.response.data.message)
      console.log(accountAlreadyExist);

    }
  }

  let yupValidation = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "password should contain capital letters,lowercase letters and numbers").required("password is required"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yupValidation,
    onSubmit: handleLogin
  });




  return (
    <>

      {accountAlreadyExist ? <div className="p-4 text-center w-1/2 mx-auto mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {accountAlreadyExist}
      </div> : null}
      <div className=" w-full py-6 max-w-xl mx-auto">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <h2 className='text-3xl font-bold mb-5 text-green-600'>Login</h2>
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div> : null}
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div> : null}

          <div className='flex items-center'>
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
            </button>
            <div>
            <p className='px-4'>don't have an account yet ? <span className='font-semibold text-green-500'><NavLink to="../register">Register Now</NavLink></span></p>
            <p className='px-4'>Forget Password ? <span className='font-semibold text-green-500 mt-2'><NavLink to="../forget">Reset Password</NavLink></span></p>
            </div>
            
          </div>

        </form>
      </div>
    </>
  )
}
