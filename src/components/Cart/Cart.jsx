import React, { useContext, useEffect, useState } from 'react';
import Style from "./Cart.module.css";
import { CartContext } from '../../context/CartContext';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast'


export default function Cart() {

  const { getLoggedUserCart, updateCartCount, deleteCartItem, deleteCart , showCartCounter , setCartId } = useContext(CartContext);
  const [showCartProducts, setShowCartProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState("");
  

  // Fetches cart items
  async function getCartItems() {
    const { data } = await getLoggedUserCart();
    console.log(data.data._id);
    setCartId(data.data._id)
    
    setShowCartProducts(data.data.products);
    setTotalPrice(data.data.totalCartPrice);
    setTotalItems(data.numOfCartItems);
  }

  // Updates cart item count
  async function updateCart(productId, count) {
    const { data } = await updateCartCount(productId, count);
    setShowCartProducts(data.data.products);
    setTotalPrice(data.data.totalCartPrice);
    setTotalItems(data.numOfCartItems);
  }

  // Deletes a single item from the cart
  async function deleteItem(productId) {
    const {data} = await deleteCartItem(productId);
    console.log(data.status);
    if (data.status === "success") {
      toast.success("Item Removed Successfully");
      console.log(data);
      showCartCounter()
    } else {
      toast.error("Item Not Removed Successfully");
    }

    getCartItems();
    
    // setShowCartProducts(data.data.products);
    // setTotalPrice(data.data.totalCartPrice);
    // setTotalItems(data.numOfCartItems);
  }

  // Clears all items from the cart
  async function deleteAllCart() {
    await deleteCart();
    setShowCartProducts(null);  
    setTotalPrice(0);  
    setTotalItems(0);
  }

  useEffect(() => {
    getCartItems();
  }, []);

  if (!showCartProducts || showCartProducts.length === 0) {
    return (
      <div className='container mx-auto pt-20 text-center flex flex-col items-center'>
        <div className='noCart-icon mb-8 bg-gray-300 flex justify-center items-center'>
          <i className='fa-solid fa-cart-shopping text-5xl text-green-600'></i>
        </div>
        <h3 className='text-4xl font-semibold mb-3'>Your cart is empty!</h3>
        <h3 className='text-3xl font-semibold mb-7'>Browse our products and discover our best deals!</h3>
        <Link to="/products">
          <button className='btn hover:bg-green-700'>START SHOPPING</button>
        </Link>
      </div>
    );
  }


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between items-center px-5 mb-10">
        <h2 className="text-3xl font-semibold text-green-600">Shopping Cart</h2>
        <span className="text-xl font-semibold">Total Cart Price: {totalPrice} EGP</span>
      </div>
      <div className='flex justify-between items-center px-5 pt-5 mb-10'>
        <div>
          <span className='text-xl me-3 font-semibold'> Total Items: {totalItems}</span>
          <button onClick={() => deleteAllCart()} className='btn-remove hover:bg-red-700'>Remove all items?</button>
        </div>
        <div>
          <NavLink to="/cashpay"><button className='btn hover:bg-green-700'>Proceed to Checkout</button></NavLink>
        </div>
      </div>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 align-middle">
              <span className="sr-only"></span>
            </th>
            <th scope="col" className="px-6 py-3 align-middle">Product</th>
            <th scope="col" className="px-6 py-3 align-middle">Qty</th>
            <th scope="col" className="px-6 py-3 align-middle">Price</th>
            <th scope="col" className="px-6 py-3 align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {showCartProducts.map((product) => (
            <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4 align-middle text-center">
                <img src={product.product.imageCover} width={200} className="ps-10" alt="Product" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white align-middle text-center">
                {product.product.title}
              </td>
              <td className="px-6 py-4 align-middle text-center">
                <div className="flex items-center justify-center">
                  <button onClick={() => updateCart(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700" type="button">
                    <span className="sr-only"></span>
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <span>{product.count}</span>
                  <button onClick={() => updateCart(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700" type="button">
                    <span className="sr-only"></span>
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white align-middle text-center">
                {product.price} EGP
              </td>
              <td className="px-6 py-4 align-middle text-center">
                <a onClick={() => deleteItem(product.product.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
