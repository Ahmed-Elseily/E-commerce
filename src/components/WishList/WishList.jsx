import React, { useContext, useEffect, useState } from 'react';
import { WishContext } from '../WishListContext/WishListContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'
import { CartContext } from '../../context/CartContext';


export default function WishList() {
  const { showUserList, deleteWish , setWishCounter } = useContext(WishContext);

  const {addCartProducts} = useContext(CartContext)

  const [showListProducts, setShowListProducts] = useState([]);
  const [showTotalProducts, setShowTotalProducts] = useState("");

  async function getUserList() {
    const { data } = await showUserList();
    setShowListProducts(data.data);
    setShowTotalProducts(data);
  }

  async function deleteWishItem(productId) {
    const { data } = await deleteWish(productId);
    console.log(data);
    if (data.status === "success") {
      toast.success(data.message);
      setWishCounter(data.data.length)
    } else {
      toast.error(data.message);
    }
    getUserList();
  }

  async function addProduct(productId) {
    let response = await addCartProducts(productId);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    console.log(response);
    deleteWishItem(productId)
  }

  useEffect(() => {
    getUserList();
  }, []);

  if (!showListProducts || showListProducts.length === 0) {
    return (
      <div className='container mx-auto pt-20 text-center flex flex-col items-center'>
        <div className='noCart-icon mb-8 bg-gray-300 flex justify-center items-center'>
          <i className='fa-solid fa-heart text-5xl text-red-600'></i>
        </div>
        <h3 className='text-4xl font-semibold mb-3'>Your Wishlist is empty!</h3>
        <h3 className='text-3xl font-semibold mb-7'>Browse our products and discover our best deals!</h3>
        <Link to="/products">
          <button className='btn-wish hover:bg-red-700'>START SHOPPING</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
      <div className="flex justify-between items-center px-5 mb-10">
        <h2 className="text-3xl font-semibold text-red-600">My Wishlist</h2>
      </div>
      <div className='flex justify-between items-center px-5 pt-5 mb-10'>
        <div>
          <span className='text-xl me-3 font-semibold'> Total Items: {showTotalProducts.count}</span>
        </div>
      </div>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center align-middle"></th>
            <th scope="col" className="px-6 py-3 text-center align-middle">Product</th>
            <th scope="col" className="px-6 py-3 text-center align-middle">Price</th>
            <th scope="col" className="px-6 py-3 text-center align-middle">Action</th>
            <th scope="col" className="px-6 py-3 text-center align-middle whitespace-nowrap">
              Add&nbsp;to&nbsp;Cart
            </th>
          </tr>
        </thead>
        <tbody>
          {showListProducts.map((product) => (
            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4 align-middle text-center">
                <img src={product.imageCover} width={200} className="mx-auto" alt="Product" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white align-middle text-center">
                {product.title}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white align-middle text-center">
                {product.price} EGP
              </td>
              <td className="px-6 py-4 align-middle text-center">
                <button 
                  onClick={() => deleteWishItem(product.id)} 
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </button>
              </td>
              <td className="px-6 py-4 align-middle text-center">
                <a onClick={()=>addProduct(product.id)} href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline">Add to cart</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
