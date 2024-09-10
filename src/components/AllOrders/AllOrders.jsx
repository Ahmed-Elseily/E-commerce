import React, { useContext, useEffect, useState } from 'react'
import Style from "./AllOrders.module.css"
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { WishContext } from '../WishListContext/WishListContext';


export default function AllOrders() {

  let {wishCount} = useContext(WishContext)


  const [userOrders, setUserOrders] = useState([])
  async function getUserOrders(clientId) {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${clientId}`)
      console.log(response.data);
      setUserOrders(response.data)



    } catch (error) {
      console.log("asd", error);

    }
  }





  useEffect(() => {
    const user = jwtDecode(localStorage.getItem("userToken"))
    getUserOrders(user.id)
    wishCount()


  }, [])
  return (
    <div className="relative overflow-x-auto ">
      <div className=" px-5 mb-10 shadow-md sm:rounded-lg pb-5">
        <h2 className="text-3xl font-semibold text-green-600">Orders History</h2>
      </div>
      <div className='h-screen'>
        <h1>ahmed kamal</h1>

      </div>

    </div>
  );
}
