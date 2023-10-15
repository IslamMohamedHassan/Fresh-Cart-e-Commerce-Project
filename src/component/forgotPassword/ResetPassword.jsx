import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function ResetPassword() {
    const navigate = useNavigate();

    let newData = {
        email: "",
        newPassword: "", // Initialize with an empty string (change)
    }

    let formik = useFormik({
        initialValues: newData  ,

        validate: function (values) {
            const errors = {};

            if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                errors.email = "Invalid Email";
            }
            if (!values.email) {
                errors.email = "required";
            }
            
            // Add validation for newPassword (change)
            if (values.newPassword.length <= 3 || values.newPassword.length > 10) {
                errors.newPassword = "Password Must Be Between 3 : 10 Characters Or Numbers";
            }

            if (!values.newPassword) {
                errors.newPassword = "required";
            }

            return errors;
        },
        onSubmit: function (values) {
            axios.put("https://route-ecommerce.onrender.com/api/v1/auth/resetPassword", values)
                .then((res) => {
                    console.log(res);
                    if (res?.status === 200) {
                        toast.success("Password Changed Successfully");
                        navigate("/login");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if ((err?.response?.data?.statusMsg === 'fail')) {
                        return toast.error(err?.response?.data?.message);
                    } else {
                        return toast.error("Something Wrong");
                    }
                });
        }
    })

    return <>
      <Helmet>
          <title>Reset Password</title>
      </Helmet>
        <div className="container">
            <h2 className='text-main fw-bold my-3'>Reset New Password :</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email" className='my-3 fw-bold'>Email :</label>
                <input placeholder='Enter Your Email' className='form-control' id='email' type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                {(formik?.errors?.email && formik?.touched?.email) ? <div className='alert-danger alert mt-3'>{formik?.errors?.email}</div> : ""}
                <label htmlFor="newPassword" className='mt-3'>New Password :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} id='newPassword' className='form-control' placeholder='New Password' type="password" />
                {(formik.errors.newPassword && formik.touched.newPassword) ? <div className='alert-danger alert my-2'>{formik.errors.newPassword}</div> : ""}
                <button type='submit' className='btn btn-outline-success my-3 fw-bold'>Confirm</button>
            </form>
        </div>
        </>
}