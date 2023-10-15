import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {

    const navigate = useNavigate();

    let userData = {
        email:"",
      }

    let formik = useFormik({
        initialValues: userData,

        validate:function (values) {
            const errors = {};

            if(! values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                errors.email = "Invalid Email"
              }
            if(!values.email){
                errors.email = "required"
            }

            return errors;
        },
        onSubmit:function (values) {
            axios.post("https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords",values).then((res) => {
            let {data} = res;
            if (data.statusMsg === 'success') {
                toast.success("Reset code sent to your email");
                navigate("/reset-code")
            }
        }).catch((err)=>{
            if ((err?.response?.data?.statusMsg === 'fail')) {
                return toast.error(err?.response?.data?.message)
            }else{
                return toast.error("Something Wrong")
            }
        }

        )
        }
    })
  return <>
    <Helmet>
        <title>Forget Password</title>
    </Helmet>
    <div className="container">

        <h2 className='text-main fw-bold my-3'>Forget Password :</h2>

        <form onSubmit={formik.handleSubmit}>

            <label htmlFor="email" className='my-3 fw-bold'>Email :</label>
            <input placeholder='Enter Your Email' className='form-control' id='email' type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
            {(formik?.errors?.email && formik?.touched?.email) ? <div className='alert-danger alert mt-3'>{formik?.errors?.email}</div> : "" }
            <button type='submit' className='btn btn-outline-success my-3 fw-bold'>Send Code</button>

        </form>

    </div>

    </>
  
}
