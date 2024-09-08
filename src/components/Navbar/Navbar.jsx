import React, { useContext, useEffect, useState } from 'react'
import Style from "./Navbar.module.css"
import logo from "../../assets/images/freshcart-logo.svg"
import { NavLink, useNavigate } from 'react-router-dom'
import UserContextProvider, { userContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import { WishContext } from '../WishListContext/WishListContext'



export default function Navbar() {

  let { cartCounter } = useContext(CartContext)
  let { wishCounter } = useContext(WishContext)


  let { userLogin, setUserLogin } = useContext(userContext)
  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem("userToken")
    setUserLogin(null)
    navigate("/login")
  }

  return (
    <>
      <nav className='bg-gray-100 w-full lg:fixed top-0 left-0 right-0 py-2 z-50'>
        <div className="py-2 flex flex-col lg:flex-row justify-between mx-5 items-center text-center">

          <div className="left-side flex flex-col lg:flex-row items-center w-full lg:w-auto">
            <NavLink to="" ><img src={logo} alt="fresh cart logo" /></NavLink>
            <ul className='flex flex-col lg:flex-row items-center'>
              {userLogin !== null ? <>
                <li className=' py-2 text-slate-500 text-lg'><NavLink className="mx-2" to="">Home</NavLink></li>
                <li className=' py-2 text-slate-500 text-lg'><NavLink className="mx-2" to="products">Products</NavLink></li>
                <li className=' py-2 text-slate-500 text-lg'><NavLink className="mx-2" to="brands">Brands</NavLink></li>
                <li className=' py-2 text-slate-500 text-lg'><NavLink className="mx-2" to="categories">Categories</NavLink></li>
                <li className=' py-2 text-slate-500 text-lg'><NavLink className="mx-2" to="cart">Cart</NavLink></li>
                <li className=' py-2 text-slate-500 text-lg'><NavLink className="mx-2" to="wishlist">Wishlist</NavLink></li>
                <li className=' py-2 text-slate-500 text-lg'><NavLink className="mx-2" to="allorders">Allorders</NavLink></li>

              </> : null}

            </ul>
          </div>

          <div className="right-side flex flex-col lg:flex-row items-center w-full lg:w-auto mt-2 lg:mt-0">
            <ul className='flex flex-col lg:flex-row lg:items-baseline w-full'>
              { userLogin !== null ? <>
                <li className='flex justify-center lg:justify-end w-full mt-2 me-8 relative'>
                <NavLink to="cart">
                  <div className='relative me-5'>
                    <i className='fa-solid fa-cart-shopping text-xl text-green-600 mx-2'></i>
                    <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{cartCounter}</span>
                  </div>
                </NavLink>
                <NavLink to="wishlist">
                  <div className='relative'>
                    <i className='fa-solid fa-heart text-xl text-red-600 mx-2'></i>
                    <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{wishCounter}</span>
                  </div>
                </NavLink>
              </li>
              </> : null}
              

              <li className='flex justify-center lg:justify-end w-full mt-2 me-5'>
                <i className='fab fa-facebook mx-2'></i>
                <i className='fab fa-twitter mx-2'></i>
                <i className='fab fa-instagram mx-2'></i>
                <i className='fab fa-youtube mx-2'></i>
                <i className='fab fa-tiktok mx-2'></i>
              </li>


              {userLogin === null ? <>
                <li className=' py-2 text-lg text-slate-500'><NavLink className="mx-2" to="login">Login</NavLink></li>
                <li className=' py-2 text-lg text-slate-500'><NavLink className="mx-2" to="register">Register</NavLink></li>

              </> : <li className=' py-2 text-lg text-slate-500 cursor-pointer'><span onClick={logOut} className="mx-2" >Logout</span></li>}


            </ul>
          </div>

        </div>
      </nav>
    </>
  )
}
