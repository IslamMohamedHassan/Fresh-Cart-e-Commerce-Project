import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/loadingScreen';

export default function SpecificBrandProducts() {

    // Hooks
    const [brandItems, setBrandItems] = useState()

    // To get id From url 
    const {id} = useParams();

    useEffect(() => {
      if (!brandItems) {
        getAllCategories(id)
      }
    }, [])
    

    // get specific brand
    function getAllCategories(id) {
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${id}`)
        .then((res)=> {
            if (res?.status === 200) {
                setBrandItems(res.data.data);
            }
        })
        .catch((err)=> err)
    }
    console.log(brandItems);
    return <>
    {brandItems?
    <div className='container'>
        <div className="row my-3 justify-content-between align-items-center">
            <div className='col-md-4'><img style={{height:400,width:"100%"}} src={brandItems.image} alt={brandItems.name} /></div>
            <div className='col-md-7 offset-1'>
                <p>Name : {brandItems.name}</p>
                <p>Created at: {brandItems.createdAt}</p>
                <p>Updated at: {brandItems.updatedAt}</p>
            </div>
        </div>
    </div>:<LoadingScreen/>}
    </>
  
}
