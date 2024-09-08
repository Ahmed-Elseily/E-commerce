import React, { useEffect, useState } from 'react'
import Style from "./Brands.module.css"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PacmanLoader } from 'react-spinners'




export default function Brands() {

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let { isLoading, error, data } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
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
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-10">

          {data?.data.data.map((brands) =>
            <div className="brands product-hover cursor-pointer">
              <div className="inner-brand p-5">
                <img src={brands.image} alt={brands.name} />
                <h3 className='text-center border-t-2 text-slate-500 font-semibold pt-3'>{brands.name}</h3>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
