/** @format */

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/loadingScreen";
import { Link } from "react-router-dom";
import { projectContext } from "../../context/Context";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import HomeSlider from "../Slider/HomeSlider";
import CategorySlider from "../Slider/CategorySlider";

export default function Home() {
  // hooks
  const [products, setProduct] = useState([]);
  const {addToCart,setNumOfCart} = useContext(projectContext);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  useEffect(() => {
      getAllProduct();

  },[]);

  // get all product
  function getAllProduct() {
    axios
      .get("https://route-ecommerce.onrender.com/api/v1/products")
      .then((res) => {
        const { data } = res.data;
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //add to cart func

  async function handleAddToCart(id) {
    const {data} = await addToCart(id);
    if (data?.status === "success") {
      setNumOfCart(data.numOfCartItems)
      toast.success("The product has been added successfully")
    }else {
      toast.error("Error : The product has not been added")
    }
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="container my-3">
          <HomeSlider />
          <div className="p-3 text-center fw-bolder">Categories</div>
          <CategorySlider/>
          {/* <h1>{name}</h1> */}
          <div className="row">
          <div className="mt-5 mb-2 fs-1 text-center mt-3 "><h2 className="fw-bolder ">Products</h2></div>

            {currentItems.map((product, index) => {
              return (
                <div
                  key={index}
                  className="col-sm-4 col-md-3 col-lg-3">
                  <div className="px-2 py-4 product">
                    <Link to={`/details/${product._id}`}>
                      <img
                        className="w-100"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <div className="d-flex flex-column justify-content-between">
                        <h5>{product.category.name}</h5>
                        <h6>
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h6>
                        <div className="d-flex align-items-center justify-content-between py-2">
                          <span className="text-muted fw-bolder">
                            {product.price} EGP
                          </span>
                          <div>
                            <i className="fas fa-star rating-color"></i>
                            <span>{product.ratingsAverage}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <button onClick={()=>handleAddToCart(product.id)} className="btn bg-main text-white w-100 ">Add</button>
                  </div>
                </div>
              );
            })}
          </div>
          <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          breakClassName={"break-me"}
          marginPagesDisplayed={2}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
