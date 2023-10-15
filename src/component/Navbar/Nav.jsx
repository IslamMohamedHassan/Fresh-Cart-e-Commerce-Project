/** @format */

import React, { useContext} from "react";
import { Link } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg"
import { projectContext } from "../../context/Context";
import toast from "react-hot-toast";

export default function Nav({isLogin}) {

  // hooks
   const {logOut,numOfCart}= useContext(projectContext);

  // invoke logOut func to clear token and change state
   function handleLogout() {
    logOut();
    toast.success("Logged Out successfully")
   }
  return (
    <>
      <nav className="navbar fw-bold navbar-expand-sm navbar-light z-3 bg-white py-3 position-fixed top-0 start-0 end-0">
        <div className="container">
          <Link
            className="navbar-brand"
            to="/home">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/home"
                  aria-current="page">
                  Home <span className="visually-hidden">(current)</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/brands"
                  aria-current="page">
                  Brands
                </Link>
              </li>
            </ul>

            {isLogin?
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active border-end ms-2"
                  to="/wishlist"
                  aria-current="page">
                    <i className="text-danger fa-beat  fas fa-heart fa-lg"/> <span className="visually-hidden">(current)</span>
                </Link>
              </li>
                <li className="nav-item position-relative">
                <Link
                  className="nav-link active"
                  to="/cart"
                  aria-current="page"><i className="fas fa-shopping-cart fa-xl"/>
                  <span className="badge bg-danger position-absolute top-0 end-0">{numOfCart}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active border-end border-start ms-2"
                  to="/allOrders"
                  aria-current="page">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/login"
                  onClick={handleLogout}
                  aria-current="page">
                  Logout 
                </Link>
              </li>
            </ul>:
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item">
                            <Link
                              className="nav-link active"
                              to="/register"
                              aria-current="page">
                              Register <span className="visually-hidden">(current)</span>
                            </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/login"
                  aria-current="page">
                  Login <span className="visually-hidden">(current)</span>
                </Link>
              </li>
            </ul>
            }
          </div>
        </div>
      </nav>
      <div className="mb-5 pb-4"></div>
    </>
  );
}
