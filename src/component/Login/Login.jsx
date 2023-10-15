import axios from 'axios';
import { useFormik } from 'formik'
import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { projectContext } from '../../context/Context';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Login () {

  // hooks
  const navigate = useNavigate();
  const [loginMsg,setLoginMsg] = useState();
  const [spinner, setSpinner] = useState(false);
  const {setIsLogin,getCart} = useContext(projectContext);

  
  // sign in data 
  let userData = {
    email:"",
    password:"",
  }

  // library to handle form
  const formik = useFormik({
    initialValues : userData,

    onSubmit : function (values) {
      setSpinner(true)
      axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin",values).then((res) => {
        let {data} = res;
        localStorage.setItem("tkn",data.token)
        if (data.message === "success") {
          getCart()
          setIsLogin(true)
          navigate("/home")
          setSpinner(false)
          toast.success("logged in successfully")
        }
      })
      .catch(function (error) {
        let {data} = error.response;
        setSpinner(false)
        if (data.statusMsg === "fail") {
          setLoginMsg(data.message);
          setTimeout(()=>{
            setLoginMsg(null);
          },4000)
        }
      })
    }
  });





  return (
    <>
      <Helmet>
          <title>Login</title>
      </Helmet>
      <div className='container'>

        <h2 className='text-main fw-bold my-3'>Login</h2>

        {(loginMsg)? <div className='alert alert-danger'>{loginMsg}</div>:""}

        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="email" className='mt-3'>Email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' className='form-control' placeholder='email' type="email" />
          {(formik.errors.email && formik.touched.email) ? <div className='alert-danger alert my-2'>{formik.errors.email}</div> : "" }

          <label htmlFor="password" className='mt-3'>password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' className='form-control' placeholder='password' type="password" />
          {(formik.errors.password && formik.touched.password) ? <div className='alert-danger alert my-2'>{formik.errors.password}</div> : "" }

          <button type='submit' className='btn d-block btn-outline-success p-2 my-3 fw-bold'>{spinner? <i className='fa-solid fa-spinner fa-spin'/>:"Login"}</button>
          <Link to = "/forget-password" className='text-main mb-3 d-inline-block fw-bold'>Forgotten password?</Link>
        </form>

      </div>
    </>

  )
}
