import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PacmanLoader } from 'react-spinners';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../WishListContext/WishListContext';

export default function Products() {
  const { addCartProducts, setCartCounter } = useContext(CartContext);
  const { addWishProduct, setWishCounter } = useContext(WishContext);

  const [loadingButton, setLoadingButton] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loadingWishButton, setLoadingWishButton] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 8000,
  });

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (storedWishlist) {
      setWishlist(storedWishlist);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  async function addProduct(productId) {
    setLoadingButton(true);
    setCurrentProduct(productId);
    let response = await addCartProducts(productId);

    if (response.data.status === 'success') {
      toast.success(response.data.message);
      setCartCounter(response.data.numOfCartItems);
    } else {
      toast.error(response.data.message);
    }
    setLoadingButton(false);
  }

  async function addWishListProduct(productId) {
    setLoadingWishButton(true);
    setCurrentProduct(productId);
    let response = await addWishProduct(productId);

    if (response.data.status === 'success') {
      toast.success(response.data.message);
      setWishCounter(response.data.data.length);
      if (!wishlist.includes(productId)) {
        setWishlist((prevWishlist) => [...prevWishlist, productId]);
      }
    } else {
      toast.error(response.data.message);
    }
    setLoadingWishButton(false);
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center text-green-600'>
        <PacmanLoader color='green' />
      </div>
    );
  }

  return (
    <section>
      <div className="row">
        {data?.data.data.map((product) => {
          const isInWishlist = wishlist.includes(product.id);
          return (
            <div key={product.id} className='w-1/6 p-5'>
              <div className='main-product product-hover p-3 h-full'>
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} alt={product.title} />
                  <span className='text-green-500'>{product.category.name}</span>
                  <p className='text-xl font-semibold pt-2'>
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <div className='flex justify-between items-center mt-4'>
                    <span>{product.price} EGP</span>
                    <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
                  </div>
                </Link>
                <button
                  onClick={() => addProduct(product.id)}
                  className='btn w-full mt-4 hover:bg-green-700 button-effect'
                  disabled={loadingButton && currentProduct === product.id}
                >
                  {loadingButton && currentProduct === product.id ? (
                    <i className='fas fa-spinner fa-spin'></i>
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-shopping text-white"></i>
                      <span className='ml-2'>Add to cart</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => addWishListProduct(product.id)}
                  className='btn-wish w-full mt-4 outline outline-offset-0 outline-red-600 button-effect'
                  disabled={loadingWishButton && currentProduct === product.id}
                >
                  {loadingWishButton && currentProduct === product.id ? (
                    <i className='fas fa-spinner fa-spin'></i>
                  ) : (
                    <>
                      <i className={`fa-solid fa-heart ${isInWishlist ? 'text-red-600' : 'text-black'}`}></i>
                      <span className='ml-2'>{isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
