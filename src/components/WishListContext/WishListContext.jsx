import React, { createContext, useEffect, useState } from 'react'
import Style from "./WishListContext.module.css"
import axios from 'axios';

export const WishContext = createContext()




export default function WishListContextProvider(props) {

  const [wishCounter, setWishCounter] = useState(null)

  function addWishProduct(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId },
      {
        headers: {
          token: localStorage.getItem("userToken")
      },

      }).then((response) => response)
      .catch((error) => error)
  }

  function showUserList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: {
        token: localStorage.getItem("userToken")
    },
    }).then((response) => response)
      .catch((error) => error)
  }

  function deleteWish(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: localStorage.getItem("userToken")
      }
      })
  }

  async function wishCount() {
    let response = await showUserList();
    console.log(response.data);
    setWishCounter(response.data.count)

  }
  useEffect(() => {
    wishCount();
  }, [])
  




  return (
    <>
      <WishContext.Provider value={{ wishCounter,wishCount , setWishCounter, addWishProduct, showUserList, deleteWish }}>
        {props.children}
      </WishContext.Provider>
    </>
  )
}
