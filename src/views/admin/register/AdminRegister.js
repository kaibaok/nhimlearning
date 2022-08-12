import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// COMPONENTS
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { TextInput } from "../../../components/AdminComponents/commons/TextInput";
import { ToastContainer, toast } from "react-toastify";
// IMAGES
import logo from "../../../assets/images/logo/logo.png";
import demoImage from "../../../assets/images/admin/slides/promo-a.png";
// CSS
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
// FETCH
import LoginFetch from "../../../fetch/LoginFetch";
// import AppAuth from "../../../AppAuth";
import { Button } from "../../../components/AdminComponents/commons";

function AdminRegister(props) {
  const [name, setName] = useState("nguyen van a");
  const [password, setPassword] = useState("Abcd1234");
  const [passwordConfirmation, setPasswordConfirmation] = useState("Abcd1234");
  const [email, setEmail] = useState("test@yopmail.com");
  // const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    // If user logged in on miEdge (has session already)
    const findUserInfo = () => {
      LoginFetch.findUserInfo()
        .then((json) => {
          console.log("User logged in already...");
          navigate("/admin");
        })
        .catch((ex) => {
          console.log("User not logged in already...");
          navigate("/admin/login");
        });
    };
    findUserInfo();
  }, [navigate]);

  const register = async () => {
    // setIsLoading(true);
    await LoginFetch.register({
      name: name,
      password: password,
      password_confirmation: passwordConfirmation,
      email: email,
    })
      .then((json) => {
        showToast("Register Success", false);

        setTimeout(() => {
          window.location = "/admin";
        }, 1500);
      })
      .catch((ex) => {
        console.log(ex);
        showToast("Register Error", true);
      });
    // setIsLoading(false);
  };

  const showToast = (title, error) => {
    error ? toast.error(title) : toast.success(title);
  };

  return (
    <div className="nk-body bg-white npc-general pg-auth">
      <ToastContainer />
      <div className="nk-app-root">
        <div className="nk-main ">
          <div className="nk-wrap nk-wrap-nosidebar">
            <div className="nk-content ">
              <div className="nk-split nk-split-page nk-split-lg">
                <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                  <div className="absolute-top-right d-lg-none p-3 p-sm-5">
                    <Link
                      to="#"
                      className="toggle btn-white btn btn-icon btn-light"
                      data-target="athPromo"
                    >
                      <em className="icon ni ni-info"></em>
                    </Link>
                  </div>
                  <div className="nk-block nk-block-middle nk-auth-body">
                    <div className="brand-logo pb-5">
                      <Link to="/admin" className="logo-link">
                        <img className="logo-dark" src={logo} alt="logo" />
                      </Link>
                    </div>
                    <div className="nk-block-head">
                      <div className="nk-block-head-content">
                        <h5 className="nk-block-title">Register</h5>
                      </div>
                    </div>
                    <form action="#" className="form-validate is-alter">
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label">Username</label>
                        </div>
                        <div className="form-control-wrap">
                          <TextInput
                            id="email"
                            placeholder={"Enter your username"}
                            className="form-control form-control-lg"
                            required={true}
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label">Email</label>
                        </div>
                        <div className="form-control-wrap">
                          <TextInput
                            id="email"
                            placeholder={"Enter your email address"}
                            className="form-control form-control-lg"
                            required={true}
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label">Password</label>
                        </div>
                        <div className="form-control-wrap">
                          <TextInput
                            id="password"
                            type="password"
                            placeholder={"Enter your password"}
                            className="form-control form-control-lg"
                            required={true}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label">Password Confirm</label>
                        </div>
                        <div className="form-control-wrap">
                          <TextInput
                            id="password"
                            type="password"
                            placeholder={"Repeat password"}
                            className="form-control form-control-lg"
                            required={true}
                            onChange={(e) => {
                              setPasswordConfirmation(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <Button
                          label="Sign in"
                          className="btn btn-lg btn-primary btn-block"
                          onClick={() => register()}
                        />
                      </div>
                    </form>
                    <div className="form-note-s2 pt-4">
                      <Link to="/admin/login">
                        <strong>Back to sign in</strong>
                      </Link>
                    </div>
                  </div>
                  <div className="nk-block nk-auth-footer">
                    <div className="mt-3 center">
                      <p>&copy; 2022 Dashlite. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
                <div className="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right">
                  <div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
                    <Swiper
                      slidesPerView={1}
                      pagination={true}
                      modules={[Pagination]}
                    >
                      <SwiperSlide>
                        <div className="slider-item">
                          <div className="nk-feature nk-feature-center">
                            <div className="nk-feature-img">
                              <img className="round" src={demoImage} alt="" />
                            </div>
                            <div className="nk-feature-content py-4 p-sm-5">
                              <h4>Dashlite</h4>
                              <p>
                                You can start to create your products easily
                                with its user-friendly design & most completed
                                responsive layout.
                              </p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="slider-item">
                          <div className="nk-feature nk-feature-center">
                            <div className="nk-feature-img">
                              <img className="round" src={demoImage} alt="" />
                            </div>
                            <div className="nk-feature-content py-4 p-sm-5">
                              <h4>Dashlite</h4>
                              <p>
                                You can start to create your products easily
                                with its user-friendly design & most completed
                                responsive layout.
                              </p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
