import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { createContext } from "react";

export const projectContext = createContext(null)


export default function Context(props) {

  ////////////////// Hooks /////////////////////

  // login & logout state 
  const [tknInfo,setTknInfo] = useState(null);
  const [isLogin,setIsLogin] = useState(false);

  // Cart state

  const [cartId , setCartId ] = useState()
  const [numOfCart , setNumOfCart ] = useState()

  ////////////////////////////////////////////////////////

  ////////////////////// login & logout ///////////////////////

  // decode token after login
  useEffect(()=>{
    if(tknInfo == null && localStorage.getItem("tkn")){
      setTknInfo(jwtDecode(localStorage.getItem("tkn")));
      setIsLogin(true);
    }
  },[tknInfo])

  // logout function 
    function logOut() {
      localStorage.removeItem("tkn");
      setIsLogin(false);
      setTknInfo(null);
    }

////////////////////////// End login & logout ////////////////////

/////////////////////////////// Cart /////////////////////////////

    useEffect(()=>{
      if (cartId || numOfCart) { 
        getCart()
      }
    })
    // fun to get cartINFO AND SHARE IT

    async function getCart() {
      let res = await getCartItems();
      if (res?.data?.status === "success"){
        setCartId(res.data.data._id)
        setNumOfCart(res.data.numOfCartItems)
      }else{
        setNumOfCart(null)
      }
    }

    // Function To Get Cart Items
    function getCartItems() {
      return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
      {headers:{ token :localStorage.getItem("tkn")}})
      .then((res)=> res)
      .catch((err)=> err)
  }


  // Add To Cart Func
  function addToCart(id) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,{"productId": id},{headers : {"token" : localStorage.getItem("tkn")}})
    .then((res)=>res)
    .catch((err)=>err)
  }

  // update Cart Quantity
  function updateQuantity(id , count) {
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
    {"count":count},
    {headers : {"token" : localStorage.getItem("tkn")}})
    .then((res)=>res)
    .catch((err)=>err)
  }
  

  // Remove From Cart 
  function removeFromCart(id){
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
    {headers : {"token" : localStorage.getItem("tkn")}})
    .then((res)=>res)
    .catch((err)=>err)
  }


  ///////////////////////////////End Cart///////////////////////////////////////

  // ////////////////////////////wishlist//////////////////////////////////////

   // Function To Get wishlist Items
   function getWishlistItems() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`,
    {headers:{ token :localStorage.getItem("tkn")}})
    .then((res)=> res)
    .catch((err)=> err)
}


// Add To wishlist Func
function addToWishlist(id) {
  return axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{"productId": id},{headers : {"token" : localStorage.getItem("tkn")}})
  .then((res)=>res)
  .catch((err)=>err)
}

// Remove From Cart 
function removeFromWishlist(id){
  return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,
  {headers : {"token" : localStorage.getItem("tkn")}})
  .then((res)=>res)
  .catch((err)=>err)
}

  // ////////////////////////// Categories & brand //////////////////////

  // get all categories
  function getAllCategories() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`,
    {headers:{ token :localStorage.getItem("tkn")}})
    .then((res)=> res)
    .catch((err)=> err)
}

  // get all brands
  function getAllBrands() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`,
    {headers:{ token :localStorage.getItem("tkn")}})
    .then((res)=> res)
    .catch((err)=> err)
}





  const contextValues = {
    // login & logOut
    tknInfo,
    logOut,
    isLogin,
    setIsLogin,

    // Cart
    updateQuantity,
    removeFromCart,
    addToCart,
    getCartItems,
    cartId,
    numOfCart,
    setNumOfCart,
    getCart,

    // wishlist
    getWishlistItems,
    addToWishlist,
    removeFromWishlist,
    

    // Categories
    getAllCategories,
    getAllBrands
  }


  return (
    
    <projectContext.Provider value={contextValues}>
      {props.children}
    </projectContext.Provider>
  )
}
