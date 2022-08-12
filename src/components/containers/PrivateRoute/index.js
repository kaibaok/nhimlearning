import React, { Fragment } from "react";
import TopBar from "src/components/UserComponents/TopBar";
import LogoArea from "src/components/UserComponents/LogoArea";
import MainMenu from "src/components/UserComponents/MainMenu";
import FooterArea from "src/components/UserComponents/FooterArea";
import { ToastContainer } from "react-toastify";
import ScrollTopButton from "src/components/UserComponents/ScrollTopButton";

const PrivateRoute = (props) => {
  const { component: Component } = props;
  return (
    <Fragment>
      <div className={props.parentClass}>
        <Fragment>
          <TopBar className="white_bg" />
          <div className="border_black" />
          <LogoArea className="white_bg" />
          <MainMenu />
        </Fragment>
        <Component {...props} />
        <FooterArea className="primay_bg" />
        <ToastContainer position="top-center" />
        <ScrollTopButton />
      </div>
    </Fragment>
  );
};
export default PrivateRoute;
