import React, { useContext, useEffect, useState } from 'react'
import Style from "./ForgetPassword.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { userContext } from '../../context/UserContext';

export default function forgetPassword() {
  let navigate = useNavigate()
  

  const [isLoading, setIsLoading] = useState(false)


  const [accountAlreadyExist, setAccountAlreadyExist] = useState("")
  async function handleForgetPassword(formValues) {
    setIsLoading(true);
    console.log("register");
    console.log(formValues);
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, formValues)
      if (data.statusMsg === "success") {
        setIsLoading(false);

        navigate("/resetcode")

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
  })

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yupValidation,
    onSubmit: handleForgetPassword
  });




  return (
    <>

      {accountAlreadyExist ? <div className="p-4 text-center w-1/2 mx-auto mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {accountAlreadyExist}
      </div> : null}
      <div className=" w-full py-6 max-w-xl mx-auto">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <h2 className='text-3xl font-bold mb-5 text-green-600'>Forget Password</h2>
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div> : null}

          <div className='flex items-center'>
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </>
  )
}
