import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { projectContext } from '../../context/Context';


export default function Checkout() {

     const {cartId}= useContext(projectContext)

    let checkoutInfo = {
        "details": "",
        "phone": "",
        "city": ""
    }
  
    let formik = useFormik({
    initialValues:checkoutInfo,
    onSubmit:function (values) {
        console.log(values);
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=https://fresh-cart-e-commerce-project.vercel.app/`,
        {shippingAddress:values},
        {headers:{token : localStorage.getItem("tkn") }},
        ).then((res)=>{
            window.open(res.data.session.url)
        })
        .catch(err=>{
            if (err.response.data.statusMsg === "error") {
                toast.error("error")
            }
        })
    }
    })

  return <>

            <form onSubmit={formik.handleSubmit} className="my-5 container">

            <label htmlFor="details">Details</label>
            <input type="text" onChange={formik.handleChange} id="details" value={formik.values.details}  className="form-control mb-3"/>

            <label htmlFor="city">City</label>
            <input type="text" onChange={formik.handleChange} id="city" value={formik.values.city}  className="form-control mb-3"/>

            <label htmlFor="phone">phone</label>
            <input type="tel"  onChange={formik.handleChange} id="phone" value={formik.values.phone}  className="form-control mb-3"/>

            <button className="btn bg-main text-white mb-3" type="submit">Pay</button>

            </form>
        </>
  
}
