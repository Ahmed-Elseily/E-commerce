import React, { useContext, useEffect, useState } from 'react'
import Style from "./ResetCode.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { userContext } from '../../context/UserContext';

export default function resetCode() {
  let navigate = useNavigate()
  

  const [isLoading, setIsLoading] = useState(false)


  const [accountAlreadyExist, setAccountAlreadyExist] = useState("")
  async function handleResetCode(formValues) {
    setIsLoading(true);
    console.log("register");
    console.log(formValues);
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValues)
      if (data.status === "Success") {
        setIsLoading(false);

        navigate("/newpassword")

      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
      setAccountAlreadyExist(error.response.data.message)
      console.log(accountAlreadyExist);

    }
  }



  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleResetCode
  });




  return (
    <>

      {accountAlreadyExist ? <div className="p-4 text-center w-1/2 mx-auto mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {accountAlreadyExist}
      </div> : null}
      <div className=" w-full py-6 max-w-xl mx-auto">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <h2 className='text-3xl font-bold mb-5 text-green-600'>Verification Code</h2>
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Verification Code</label>
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
