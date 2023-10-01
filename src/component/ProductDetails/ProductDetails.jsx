/** @format */

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/loadingScreen";
import { projectContext } from "../../context/Context";
import toast from "react-hot-toast";


export default function ProductDetails() {
    
  // hooks
  const [product,setProduct] = useState();
  const { id } = useParams();
  const {addToCart,setNumOfCart} = useContext(projectContext);

  
  useEffect(()=>{
    if(!product){
        getSpecificProduct();
    }
  })



// function to Specific Product
function getSpecificProduct() {
    axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`).then(res =>{
    const {data} = res.data;
    setProduct(data)
    console.log(data);
    }).then(err=>{
    console.log(err);
    })
}

  //add to cart func
  async function handleAddToCart(id) {
    const {data} = await addToCart(id);
    if (data.status === "success") {
      console.log(data);
      setNumOfCart(data.numOfCartItems)
      toast.success("The product has been added successfully")
    }else {
      toast.error("Error : The product has not been added")
    }
  }

  return (
    <>

    {(product)?   
    <div className="container my-3">
      <div className="row align-items-center justify-content-between">
        <div className="col-md-4 px-3 py-4">
          <img
            className="w-100"
            src={product.imageCover}
            alt="productImage"
          />
        </div>
        <div className="col-md-8">
          <h3 className="fw-bolder h2">{product.title}</h3>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-main fw-bolder h6">{product.category.name}.</h4>
          <div className="d-flex align-items-center justify-content-between py-4">
            <span>{product.price} EGP.</span>
            <div>
              <i className="fas fa-star rating-color"></i>
              <span>{product.ratingsAverage}</span>
            </div>
          </div>
          <button onClick={()=>handleAddToCart(product.id)} className="btn text-white bg-main w-100 fw-bolder fs-5">
            + Add To Cart
          </button>
        </div>
        </div>  
      </div>:<LoadingScreen/>}
    </>
  )
}
