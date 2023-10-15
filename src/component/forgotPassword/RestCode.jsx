import React from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function RestCode() {

    const navigate = useNavigate();

    let userData = {
        resetCode:"",
      }

    let formik = useFormik({

        initialValues: userData,

        validate:function (values) {
            const errors = {};

            if (!/^[0-9]+$/.test(values.resetCode)) {
                errors.resetCode = "Enter Only Numbers";
              }

            if(!values.resetCode){
                errors.resetCode = "required"
            }

            return errors;
        },
        onSubmit:function (values) {
            axios.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode",values).then((res) => {
            // let {data} = res;
            console.log(res);
            if (res?.data?.status === 'Success') {
                toast.success("Success Enter Your Email and New Password");
                navigate("/reset-password")
            }
        }).catch((err)=>{
            console.log(err.response.data.statusMsg);
            if ((err?.response?.data?.statusMsg === 'fail')) {
                return toast.error(err?.response.data.message)
            }else{
                return toast.error("Something Wrong")
            }
        }

        )
        }
    })
  return <>
     <Helmet>
        <title>Rest Code</title>
      </Helmet>
    <div className="container">

        <h2 className='text-main fw-bold my-3'>Verify Code :</h2>

        <form onSubmit={formik.handleSubmit}>

            <label htmlFor="resetCode" className='my-3 fw-bold'>Enter Reset Code :</label>
            <input placeholder='Enter Reset Code' className='form-control' id='resetCode' type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode}/>
            {(formik?.errors?.resetCode && formik?.touched?.resetCode) ? <div className='alert-danger alert mt-3'>{formik?.errors?.resetCode}</div> : "" }
            <button type='submit' className='btn btn-outline-success my-3 fw-bold'>Verify Code</button>

        </form>

    </div>

    </>
  
}
