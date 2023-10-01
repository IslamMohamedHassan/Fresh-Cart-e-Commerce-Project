/** @format */

export default function Footer() {
  return (
    <>
      <footer className="bg-light bottom-0">
        <div className="container p-4 my-2 ">
          <div className="row  justify-content-between align-items-center ">
            <div className="col-md-12">
              <h3>Get The FreshCart App</h3>
              <p>
                We Will Send You A Link, Open It On Your Phone To Download The
                App
              </p>
            </div>
            <div className="col-md-9">
              <input
                className=" form-control  "
                placeholder="Enter Your Email..."
              />
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-success btn-lg my-2">
                Share App Link
              </button>
            </div>
          </div>
        </div>
        <div className="container border-bottom border-top border-2 border-dark py-2 d-flex align-items-center justify-content-between">
          <div className="row">
            <div className="leftPart d-flex align-items-center justify-content-center">
              <div className="col-md-6 d-flex align-items-center justify-content-center d-none d-md-block">
                <h6 className="pe-4 d-sm-inline-block">Payment Partners</h6>
                <img
                  src={require("../../images/amazonpay.png")}
                  style={{ width: "15%" }}
                  className="pt-4 d-none d-sm-inline-block"
                  alt="amazon"
                />
                <img
                  src={require("../../images/mastercard.png")}
                  style={{ width: "10%" }}
                  className="d-none d-sm-inline-block"
                  alt={"mastercard"}
                />
                <img
                  src={require("../../images/paypal.png")}
                  style={{ width: "15%" }}
                  className="d-none d-sm-inline-block"
                  alt={"paypal"}
                />
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <h6 className="text-muted">Get deliveries with FreshCart</h6>
                <img
                  src={require("../../images/googleplay.png")}
                  className="w-25  d-sm-block"
                  alt="google play"
                />
                <img
                  src={require("../../images/appstore.png")}
                  className="w-25 d-none d-sm-block"
                  alt="app store"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right">
          <p className="m-0 text-center py-4 ">All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
