/** @format */

import React, { useContext} from "react";
import { Link } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg"
import { projectContext } from "../../context/Context";

export default function Nav({isLogin}) {

  // hooks
   const {logOut,numOfCart}= useContext(projectContext);

  // invoke logOut func to clear token and change state
   function handleLogout() {
    logOut();
   }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light py-3">
        <div className="container-fluid">
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
                <li className="nav-item position-relative">
                <Link
                  className="nav-link active"
                  to="/cart"
                  aria-current="page"><i className="fas fa-shopping-cart fa-2xl"/>
                  <span className="badge bg-danger position-absolute top-0 end-0">{numOfCart}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/register"
                  aria-current="page">
                  Profile <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/allorders"
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
    </>
  );
}
