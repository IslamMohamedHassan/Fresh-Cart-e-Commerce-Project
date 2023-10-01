import axios from 'axios';
import { useFormik } from 'formik'
import React, {  useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { projectContext } from '../../context/Context';

export default function Login () {

  // hooks
  const navigate = useNavigate();
  const [loginMsg,setLoginMsg] = useState();
  const [spinner, setSpinner] = useState(false);
  const {setIsLogin} = useContext(projectContext);

  
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
        console.log(data);
        if (data.message === "success") {
          setIsLogin(true)
          navigate("/home")
          setSpinner(false)
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
      <div className='container'>

        <h2 className='mt-3'>Login</h2>

        {(loginMsg)? <div className='alert alert-danger'>{loginMsg}</div>:""}

        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="email" className='mt-3'>Email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' className='form-control' placeholder='email' type="email" />
          {(formik.errors.email && formik.touched.email) ? <div className='alert-danger alert my-2'>{formik.errors.email}</div> : "" }

          <label htmlFor="password" className='mt-3'>password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' className='form-control' placeholder='password' type="password" />
          {(formik.errors.password && formik.touched.password) ? <div className='alert-danger alert my-2'>{formik.errors.password}</div> : "" }

          <button type='submit' className='btn btn-outline-success p-2 mt-3'>{spinner? <i className='fa-solid fa-spinner fa-spin'/>:"Login"}</button>

        </form>

      </div>
    </>

  )
}
