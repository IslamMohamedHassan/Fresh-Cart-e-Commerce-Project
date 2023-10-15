import { useFormik } from 'formik'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';


// function to avoid redundancy & make all of fields required
function validateFields (values,errors) {

  const requiredFields = ["name","phone","email","password","rePassword"]
  requiredFields.forEach(elem =>{
    if(! values[elem]){
      errors[elem] = "required"
    }
  })

}

export default function Register() {

  // hooks
  const navigate = useNavigate();
  const [registerMsg,setRegisterMsg] = useState();
  const [spinner, setSpinner] = useState(false);


  // register Data
  let user = {
    name:"",
    phone:"",
    email:"",
    password:"",
    rePassword:""
  }

  // library to handle forms
  const formik = useFormik({
    initialValues : user,


    validate : function(values){

      const errors = {};

    
      if(values.name.length <= 3 || values.name.length > 10 ){
        errors.name = "Name Must Be Between 3 : 10 Characters "
      }

      if(! values.phone.match(/^(02)?01[0125][0-9]{8}$/)){
        errors.phone = "You Must Enter Egyptian Numbers Only"
      }

      if(! values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        errors.email = "Invalid Email"
      }

      if(values.password.length <= 3 || values.password.length > 10 ){
        errors.password = "Password Must Be Between 3 : 10 Characters Or Numbers"
      }

      if(values.rePassword !== values.password ){
        errors.rePassword = "Re-Password Must Match Password"
      }

      // func to make all fields required
      validateFields(values,errors)

      return errors;

    },

    onSubmit:function(values){
      setSpinner(true);
        axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup",values).then(res =>{
        let {data} = res;
        if (data.message === "success") {
          setSpinner(false);
          setRegisterMsg(data.message)
          navigate("/login")
          toast.success("Registered Successfully")
        }

      }).catch(function (error) {
        let {data} = error.response
        if (data.statusMsg === "fail") {
          setSpinner(false);
          setRegisterMsg(data.message);
          setTimeout(()=>{
            setRegisterMsg(null);
          },4000)
        }
      })

    }
    
  })

  return (
    <>
    <Helmet>
        <title>Register</title>
    </Helmet>
    <div className='container'>

        <h2 className='text-main fw-bold my-3'>Registration Form</h2>

        {(registerMsg)? <div className='alert alert-danger'>{registerMsg}</div>:""}

        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="name" className='mt-3'>Name</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id='name' className='form-control' placeholder='name' type="text" />
          {(formik.errors.name && formik.touched.name) ? <div className='alert-danger alert my-2'>{formik.errors.name}</div> : "" }
          
          <label htmlFor="email" className='mt-3'>Email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' className='form-control' placeholder='email' type="email" />
          {(formik.errors.email && formik.touched.email) ? <div className='alert-danger alert my-2'>{formik.errors.email}</div> : "" }

          <label htmlFor="phone" className='mt-3'>phone</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id='phone' className='form-control' placeholder='phone' type="text" />
          {(formik.errors.phone && formik.touched.phone) ? <div className='alert-danger alert my-2'>{formik.errors.phone}</div> : "" }


          <label htmlFor="password" className='mt-3'>password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' className='form-control' placeholder='password' type="password" />
          {(formik.errors.password && formik.touched.password) ? <div className='alert-danger alert my-2'>{formik.errors.password}</div> : "" }

          <label htmlFor="rePassword" className='mt-3'>Re-Password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id='rePassword' className='form-control' placeholder='Re-Password' type="password" />
          {(formik.errors.rePassword && formik.touched.rePassword) ? <div className='alert-danger alert my-2'>{formik.errors.rePassword}</div> : "" }
          
          <button type='submit' className='btn btn-outline-success p-2 mt-3'>{spinner? <i className='fa-solid fa-spinner fa-spin'/>:"Login"}</button>

        </form>

    </div>
    </>
  )
}
