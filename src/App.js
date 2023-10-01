import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './component/Home/Home'
import Layout from './component/Layout/Layout'
import Login from './component/Login/Login'
import Register from './component/register/Register'
import errorImg from '../src/images/error.svg'
import Brands from './component/Brands/brands'
import ProductDetails from './component/ProductDetails/ProductDetails'
import Context from './context/Context'
import Cart from './component/Cart/Cart'
import { Toaster } from 'react-hot-toast'
import Checkout from './component/Checkout/Checkout'
import Orders from './component/Orders/Orders'
import Categories from './component/Categories/Categories'
import SpecificBrandProducts from './component/Brands/specificBrandProducts'



export default function App() {


  function ProtectedRoute({children}) {
    
    if (localStorage.getItem("tkn")) {
      return <>
      {children}
      </>
    }else{
      return <>
      <Navigate to={"/login"}/>
      </>
    }
  }

  let router = createBrowserRouter([
    {path:"",element:<Context><Layout/></Context>,children:[
      {path:"",element:<Home/>},
      {path:"home",element:<Home/>},
      {path:"login",element:<Login/>},
      {path:"register",element:<Register/>},
      {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"brands",element:<Brands/>},
      {path:"specificBrands/:id",element:<SpecificBrandProducts/>},
      {path:"categories",element:<Categories/>},
      {path:"payment",element:<Checkout/>},
      {path:"allorders",element:<Orders/>},
      {path:"details/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"*",element: <div className='text-center py-5'><img  src={errorImg} alt="Error"/></div>}
    ]}
  ])

  return (
    <>
      <Toaster/>
      <RouterProvider router={router}/>
    </>
 
  )
}
