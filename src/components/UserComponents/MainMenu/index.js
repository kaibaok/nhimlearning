import React, { Fragment, useState } from "react";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import SearchModal from "../SearchModal";
import SidebarMenu from "../SidebarMenu";
import WeatherWidget from "../WeatherWidget";

const menus = [
  {
    id: 1,
    link: "/",
    linkText: "Home",
  },
  {
    id: 2,
    linkText: "Books",
    child: true,
    icon: "angle-down",
    submenu: [
      {
        id: 21,
        link: "/english-books",
        linkText: "English Books",
      },
      {
        id: 22,
        link: "/books",
        linkText: "Books",
      },
    ],
  },
];

const MainMenu = ({ className }) => {
  const [searchShow, setSearchShow] = useState(false);
  const [sideShow, setSideShow] = useState(false);

  return (
    <Fragment>
      <div className={`main-menu ${className ? className : ""}`} id="header">
        <Link to="#top" className="up_btn up_btn1">
          <FontAwesome name="chevron-double-up" />
        </Link>
        <div className="main-nav clearfix is-ts-sticky">
          <div className="container" style={{ Zindex: 100 }}>
            <div className="row justify-content-between">
              <div className="col-lg-8">
                <nav className="navbar navbar-expand-lg col-lg-8 align-self-center">
                  <div className="site-nav-inner">
                    <button
                      className="navbar-toggler"
                      onClick={() => setSideShow(true)}
                    >
                      <em className="icon ni ni-menu-squared font30"></em>
                    </button>
                    <div className="collapse navbar-collapse navbar-responsive-collapse">
                      <ul className="nav navbar-nav" id="scroll">
                        {menus.length > 0
                          ? menus.map((item, i) => (
                              <li
                                key={i}
                                className={`
                                                ${item.child ? "dropdown" : ""}
                                                nav-item`}
                              >
                                {item.child ? (
                                  <Link
                                    onClick={(e) => e.preventDefault()}
                                    to="/"
                                    className="menu-dropdown"
                                    data-toggle="dropdown"
                                  >
                                    {item.linkText}
                                    <FontAwesome name={item.icon} />
                                  </Link>
                                ) : (
                                  <Link
                                    to={item.link}
                                    className="menu-dropdown"
                                    data-toggle="dropdown"
                                  >
                                    {item.linkText}{" "}
                                    <FontAwesome name={item.icon} />
                                  </Link>
                                )}

                                {item.child ? (
                                  <ul className="dropdown-menu" role="menu">
                                    {item.submenu.map((sub_item, i) => (
                                      <li
                                        key={i}
                                        className={`${
                                          sub_item.child
                                            ? "dropdown-submenu"
                                            : null
                                        }
                                                        `}
                                      >
                                        {sub_item.child ? (
                                          <Link
                                            onClick={(e) => e.preventDefault()}
                                            to="/"
                                          >
                                            {sub_item.linkText}
                                          </Link>
                                        ) : (
                                          <Link to={sub_item.link}>
                                            {sub_item.linkText}
                                          </Link>
                                        )}
                                        {sub_item.third_menu ? (
                                          <ul className="dropdown-menu">
                                            {sub_item.third_menu.map(
                                              (third_item, i) => (
                                                <li key={i}>
                                                  <Link to={third_item.link}>
                                                    {third_item.linkText}
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        ) : null}
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  </div>
                </nav>
                <SidebarMenu
                  sideShow={sideShow}
                  setSideShow={setSideShow}
                  menus={menus}
                />
              </div>
              <div className="col-lg-4 align-self-center">
                <div className="menu_right">
                  <div className="users_area">
                    <ul className="inline">
                      <li
                        className="search_btn"
                        onClick={() => setSearchShow(!searchShow)}
                      >
                        <FontAwesome name="search" />
                      </li>
                      <li>
                        <FontAwesome name="user-circle" />
                      </li>
                    </ul>
                  </div>
                  <div className="lang d-none d-xl-block">
                    <ul>
                      <li>
                        <Link to="/">
                          English <FontAwesome name="angle-down" />
                        </Link>
                        <ul>
                          <li>
                            <Link to="/">Vietnamese</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <WeatherWidget />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {searchShow ? (
        <SearchModal setSearchShow={setSearchShow} searchShow={searchShow} />
      ) : null}
    </Fragment>
  );
};

export default MainMenu;
