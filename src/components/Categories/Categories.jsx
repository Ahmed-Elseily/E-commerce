import React, { useEffect, useState } from 'react'
import Style from "./Categories.module.css"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PacmanLoader } from 'react-spinners'




export default function Categories() {

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading){
    return(
      <>
      <div className='flex justify-center items-center text-green-600'>
          <PacmanLoader color='green' />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="container mx-auto pt-5">
        <div className="row gap-5">

          {data?.data.data.map((Categories) =>
            <div className="brands product-hover cursor-pointer">
              <div className="inner-brand p-5">
                <img className='category-img' src={Categories.image} alt={Categories.name} />
                <h3 className='text-center  text-slate-500 font-semibold pt-7'>{Categories.name}</h3>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
