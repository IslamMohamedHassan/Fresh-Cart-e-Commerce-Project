import React, { useContext, useEffect, useState } from 'react'
import { projectContext } from '../../context/Context'
import LoadingScreen from '../LoadingScreen/loadingScreen';
import { Link } from 'react-router-dom';

export default function Brands() {

  const [brandsInfo, setBrandsInfo] = useState()
  const {getAllBrands} = useContext(projectContext)

  useEffect(() => {
    if (!brandsInfo) {
      handleGetBrands()
    }
  }, [])
  

  async function handleGetBrands() {
    const res = await getAllBrands();
    if (res?.status === 200) {

      console.log(res.status);
      setBrandsInfo(res.data.data)
    
    }else{

    }
  }

  return <>
  {brandsInfo? 
  <div className='container'>
    <h2 className='text-center mt-3 fw-bolder'>Brands</h2>
    <div className='row justify-content-center '>
    {
      brandsInfo.map((brand,index)=>{
        return <div className='col-md-3 my-3' key={index}>
          <Link to = {`/specificBrands/${brand._id}`}>
          <img src={brand.image} alt="brand.name"/>
          </Link>
          </div>
      })
    }
    </div>
  </div>
  :<LoadingScreen/> }
  </>
}
