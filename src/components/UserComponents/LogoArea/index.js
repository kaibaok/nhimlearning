import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo/logo.png";
import tp_banner from "../../../assets/images/bg/banner1.png";

const LogoArea = ({ className, dark }) => {
  return (
    <div className={`logo_area ${className ? className : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 align-self-center">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="col-lg-8 align-self-center">
            <div className="banner1">
              <Link to="#">
                <img src={tp_banner} alt="banner" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoArea;
