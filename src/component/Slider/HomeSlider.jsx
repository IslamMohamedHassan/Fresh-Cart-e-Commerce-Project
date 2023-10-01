import React from 'react'
import Slider from 'react-slick'
import styles from "./HomeSlider.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
    // slider Controller
    const settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        autoplay: true,
        autoplaySpeed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        // responsive: [
        //   {
        //     breakpoint: 1200,
        //     settings: {
        //       slidesToShow: 1,
        //     },
        //   },
        //   {
        //     breakpoint: 992,
        //     settings: {
        //       slidesToShow: 3,
        //     },
        //   },
        //   {
        //     breakpoint: 768,
        //     settings: {
        //       slidesToShow: 2,
        //     },
        //   },
        //   {
        //     breakpoint: 576,
        //     settings: {
        //       slidesToShow: 1,
        //     },
        //   },
        // ],
        pauseOnHover: true,
      };
    
  return (
    <Slider className='w-100' {...settings}>
      <div>
        <img className={styles.slider} src={require('../../images/slider-image-1.jpeg')} alt="sliderImg" />
      </div>
      <div>
        <img className={styles.slider} src={require('../../images/slider-image-2.jpeg')} alt="sliderImg" />
      </div>
      <div>
        <img className={styles.slider} src={require('../../images/slider-image-3.jpeg')} alt="sliderImg" />
      </div>
      <div>
        <img className={styles.slider} src={require('../../images/slider-image-4.png')} alt="sliderImg" />
      </div>
      <div>
        <img className={styles.slider} src={require('../../images/slider-image-5.jpeg')} alt="sliderImg" />
      </div>
    </Slider>
  )
}
