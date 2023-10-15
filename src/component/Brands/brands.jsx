import React, { useContext, useEffect, useState } from 'react'
import { projectContext } from '../../context/Context'
import LoadingScreen from '../LoadingScreen/loadingScreen';
import { Link } from 'react-router-dom';
import { Helmet} from 'react-helmet-async';

export default function Brands() {

  // Hooks
  const [brandsInfo, setBrandsInfo] = useState()
  const {getAllBrands} = useContext(projectContext)

  useEffect(() => {
    if (!brandsInfo) {
      handleGetBrands()
    }
    // eslint-disable-next-line
  }, [])
  
// Handle The GetAllBrand func Came From Context
  async function handleGetBrands() {
    const res = await getAllBrands();
    if (res?.status === 200) {
      setBrandsInfo(res.data.data)
    }else{
      setBrandsInfo("Error")
    }
  }

  // condition to render different Content if Error occurs 
  if (brandsInfo === "Error") {
    return<>
    <Helmet>
    <title>Brands</title>
  </Helmet>
  <div className="align-items-center justify-content-center d-flex my-5">
    <p className='alert text-white fw-bolder bg-main'>Something Wrong</p>
  </div>
    </>
  }else{
  return <>
  <Helmet>
    <title>Brands</title>
  </Helmet>
  {brandsInfo? 
  <div className='container'>
    <h2 className='text-center mt-3 fw-bolder'>Brands</h2>
    <div className='row justify-content-center '>
    {
      brandsInfo.map((brand,index)=>{
        return <div className='col-lg-3 col-md-4 col-sm-6 my-3' key={index}>
          <Link to = {`/specificBrands/${brand?._id}`}>
          <img src={brand?.image} alt="brand.name"/>
          </Link>
          </div>
      })
    }
    </div>
  </div>
  :<LoadingScreen/> }
  </>
  }
}
