import React, { useContext, useEffect, useState } from 'react';
import { projectContext } from '../../context/Context';
import LoadingScreen from '../LoadingScreen/loadingScreen';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const { getWishlistItems, addToCart, setNumOfCart, removeFromWishlist } = useContext(
      projectContext
    );
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      handleGetWishlistItems();
      // eslint-disable-next-line
    }, []);
  
    // handle get wishlist items
    async function handleGetWishlistItems() {
      const { data } = await getWishlistItems();
      if (data?.status === 'success') {
        setWishlistItems(data.data);
      }
      setLoading(false); // Set loading to false once the data is fetched.
    }

    // handle add to cart 
    async function handleAddToCart(id) {
        const {data} = await addToCart(id);
        if (data?.status === "success") {
          setNumOfCart(data.numOfCartItems)
          toast.success("The product has been added successfully")
        }else {
          toast.error("Error : The product has not been added")
        }
      }

          // remove from wishlist item 
    async function handleRemoveFromWishlist(id) {
        let {data} = await removeFromWishlist(id);
        if (data?.status === "success") {
            handleGetWishlistItems();
            toast.success("The product has been successfully removed")
        }else {
          toast.error("Error : The product has not been removed")
        }
    }

        if (loading) {
            return (
              <>
                <Helmet>
                  <title>Wishlist</title>
                </Helmet>
                <LoadingScreen />
              </>
            );
          } else if (wishlistItems.length === 0) {
            return (
              <>
                <Helmet>
                  <title>Wishlist</title>
                </Helmet>
                <div className="container py-3">
                  <h2 className="text-center py-3 fw-bolder text-main">Wishlist</h2>
                  <div className="row align-items-center justify-content-center">
                    <div className="alert alert-light fw-bold">Wishlist Is Empty</div>
                  </div>
                </div>
              </>
            );
          } else {
            return (
              <>
                <Helmet>
                  <title>Wishlist</title>
                </Helmet>
                <div className="container py-3">
                  <h2 className="text-center py-3 fw-bolder text-main">Wishlist</h2>
                  <div className="row">
                    {wishlistItems.map((item, index) => {
                      return (
                        <div key={index} className="col-lg-3">
                          <div className="card mb-3 shadow px-3 position-relative">
                            <img src={item.imageCover} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                              <h5 className="card-title">{item.title.split(' ').splice(0, 2).join(' ')}</h5>
                              <h5 className="card-title">Price: {item.price}</h5>
                              <button onClick={() => handleAddToCart(item.id)} className="btn bg-main text-white w-100">
                                Add To Cart
                              </button>
                              <button onClick={() => handleRemoveFromWishlist(item.id)} className="btn btn-danger my-2 w-100">
                                Remove From Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          }
        }
    