import React, { useContext, useEffect, useState } from 'react'
import { projectContext } from '../../context/Context'
import Slider from 'react-slick'
import LoadingScreen from '../LoadingScreen/loadingScreen'

export default function CategorySlider() {

  // Hooks
  const [categoriesInfo, setCategoriesInfo] = useState()
  const {getAllCategories} = useContext(projectContext)

  useEffect(() => {
    if (!categoriesInfo) {
      handleGetAllCategories()
    }
  })
  

  async function handleGetAllCategories() {
    const res = await getAllCategories();
    if (res?.status === 200) {
      setCategoriesInfo(res.data.data)
    }else{

    }
  }
  // slider controller
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    pauseOnHover: true,
  };

  return <>
  {categoriesInfo? 
  <Slider {...settings}>
    {categoriesInfo.map((category , index)=>{
      return <div className='' key={index}>
          <img style={{height:'250px',width:'100%'}} src={category.image} alt={category.name} />
      </div>
    })}
  </Slider>
  :<LoadingScreen/>}
    
  </>
  
}
