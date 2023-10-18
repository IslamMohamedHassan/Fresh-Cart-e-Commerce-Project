import React, { useContext, useEffect, useState } from "react";
import { projectContext } from "../../context/Context";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/loadingScreen";
import { Helmet } from 'react-helmet-async';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { tknInfo } = useContext(projectContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tknInfo) {
      getUserOrders(tknInfo?.id);
    }
  }, [tknInfo]);

  function getUserOrders(id) {
    return axios
      .get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data);
        }
      })
      .catch((err) => err)
      .finally(() => {
        setLoading(false); // Set loading to false regardless of the result.
      });
  }

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Orders</title>
        </Helmet>
        <LoadingScreen />
      </>
    );
  } else if (orders === "Empty") {
    return (
      <>
        <Helmet>
          <title>Orders</title>
        </Helmet>
        <div className="align-items-center justify-content-center d-flex my-5">
          <p className='alert text-white fw-bolder bg-main'>There Are No Orders For This Account</p>
        </div>
      </>
    );
  } else if (orders?.length === 0 || orders === null) {
    return (
      <>
        <Helmet>
          <title>Orders</title>
        </Helmet>
        <div className="align-items-center justify-content-center d-flex my-5">
          <p className='alert text-white fw-bolder bg-main'>There Are No Orders For This Account</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Orders</title>
        </Helmet>
        <div className="container">
          <h2 className="my-3">All Orders</h2>
          {orders.map((order, index) => {
            return (
              <div className="row align-items-center justify-content-between bg-light my-4 p-3" key={index}>
                 <div className="col-md-3 text-center text-md-start">
                      <img
                        style={{width:"200px"}}
                        src={order?.cartItems[0]?.product?.imageCover}
                        alt={order?.cartItems[0]?.product?.title}
                      />
                    </div>
                    <div className="col-md-9 my-3 fw-bold">
                      <p ><span className="text-start d-inline-block w-50 ">Product Name : </span><span className="text-end d-inline-block w-50">{order?.cartItems[0]?.product?.title}</span></p>
                      <p> <span className="text-start d-inline-block w-50">price : </span><span className="text-end d-inline-block w-50">{order?.cartItems[0]?.price} EGP</span></p>
                      <p> <span className="text-start d-inline-block w-50">Quantity : </span><span className="text-end d-inline-block w-50">{order?.cartItems[0].count}</span></p>
                      <p className="pb-3 border-bottom"> <span className="text-start d-inline-block w-50">payment method: : </span><span className="text-end d-inline-block w-50">{order?.paymentMethodType}</span></p>
                      <p> <span className="text-start d-inline-block w-50">total price : </span><span className="text-end d-inline-block w-50">{order?.totalOrderPrice} EGP</span></p>
                    </div>
                </div>
            );
          })}
        </div>
      </>
    );
  }
}





