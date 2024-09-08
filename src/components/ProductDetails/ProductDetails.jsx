import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../../context/CartContext';
import { WishContext } from '../WishListContext/WishListContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let { id, category } = useParams();
  console.log(id);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loadingWishButton, setLoadingWishButton] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const { addCartProducts, setCartCounter } = useContext(CartContext);
  const { addWishProduct, setWishCounter } = useContext(WishContext);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (storedWishlist) {
      setWishlist(storedWishlist);
    }
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log(data.data);
        setProductDetails(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        console.log(allProducts);
        let filteredProducts = allProducts.filter((product) => product.category.name === category);
        setRelatedProducts(filteredProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function addProduct(productId) {
    setLoadingButton(true);
    setCurrentProduct(productId);
    let response = await addCartProducts(productId);

    if (response.data.status === "success") {
      toast.success(response.data.message);
      setCartCounter(response.data);
    } else {
      toast.error(response.data.message);
    }
    setLoadingButton(false);
  }

  async function addWishListProduct(productId) {
    setLoadingWishButton(true);
    setCurrentProduct(productId);
    let response = await addWishProduct(productId);

    if (response.data.status === "success") {
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

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, category]);

  const isInWishlist = wishlist.includes(productDetails?.id);

  return (
    <>
      <section>
        <div className="row mb-10">
          <div className='w-1/4'>
            <div className='container'>
              <Slider {...settings}>
                {productDetails?.images?.map((img, index) => <img key={index} src={img} alt="Product" />)}
              </Slider>
            </div>
          </div>
          <div className='w-3/4 p-10'>
            <h2 className='text-3xl mb-8 font-semibold'>{productDetails?.title}</h2>
            <p className='text-2xl text-gray-500 mb-5'>{productDetails?.description}</p>
            <h3 className='text-green-500 my-3'>{productDetails?.category.name}</h3>
            <div className='flex justify-between items-center mt-5 '>
              <span>{productDetails?.price} EGP</span>
              <span>{productDetails?.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
            </div>
            <button
              onClick={() => addProduct(productDetails?.id)}
              className='btn w-full mt-10 hover:bg-green-700'
            >
              <i className="fa-solid mx-2 fa-cart-shopping text-white"></i>
              Add to cart
            </button>
            <button
              onClick={() => addWishListProduct(productDetails?.id)}
              className='btn-wish w-full mt-5 outline outline-offset-0 outline-red-600'
              disabled={loadingWishButton && currentProduct === productDetails?.id}
            >
              {loadingWishButton && currentProduct === productDetails?.id ? (
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
      </section>

      <section>
        <div className="row related-section">
          {relatedProducts.map((product) => {
            const isInRelatedWishlist = wishlist.includes(product.id);
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
                        <i className={`fa-solid fa-heart ${isInRelatedWishlist ? 'text-red-600' : 'text-black'}`}></i>
                        <span className='ml-2'>{isInRelatedWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
