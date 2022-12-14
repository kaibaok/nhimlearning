import logo from "../../../assets/images/logo/logo.png";
import { Link } from "react-router-dom";

const menus = [
  { name: "Dashboards", link: "/admin" },
  { name: "Media", link: "/admin/media" },
  { name: "Chat", link: "/admin/chat" },
  {
    name: "Devices",
    link: "/admin/devices",
    childs: [
      { name: "All Devices", link: "/admin/devices" },
      { name: "Types Device", link: "/admin/types-device" },
      { name: "Areas", link: "/admin/areas" },
    ],
  },
  {
    name: "English",
    link: "/admin/english-books",
    childs: [
      { name: "Books", link: "/admin/english-books" },
      { name: "Lessons", link: "/admin/lessons" },
      { name: "Questions", link: "/admin/questions" },
      { name: "Question Types", link: "/admin/question-types" },
    ],
  },
];

function HeaderAdmin(props) {
  const { setDisplayNavMobile, displayNavMobile } = props;
  return (
    <div className="nk-header is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger me-sm-2 d-lg-none">
            <Link
              to="#"
              className="nk-nav-toggle nk-quick-nav-icon"
              onClick={() => {
                if (setDisplayNavMobile) setDisplayNavMobile(!displayNavMobile);
              }}
            >
              <em className="icon ni ni-menu"></em>
            </Link>
          </div>
          <div className="nk-header-brand">
            <Link to="/admin" className="logo-link">
              <img className="logo-dark logo-img" src={logo} alt="logo-dark" />
            </Link>
          </div>
          <div
            className={`nk-header-menu ms-auto ${
              displayNavMobile ? "mobile-menu nk-header-active" : ""
            }`}
            data-content="headerNav"
          >
            <div className="nk-header-mobile">
              <div className="nk-header-brand">
                <Link to="/admin" className="logo-link">
                  <img
                    className="logo-dark logo-img"
                    src={logo}
                    alt="logo-dark"
                  />
                </Link>
              </div>
              <div className="nk-menu-trigger me-n2">
                <Link
                  to="#"
                  className="nk-nav-toggle nk-quick-nav-icon"
                  onClick={() => {
                    if (setDisplayNavMobile) setDisplayNavMobile(false);
                  }}
                >
                  <em className="icon ni ni-arrow-left"></em>
                </Link>
              </div>
            </div>
            <ul className="nk-menu nk-menu-main ui-s2">
              {menus.map((item, key) => (
                <li
                  key={`nav ${key}`}
                  className={`nk-menu-item ${item?.childs ? "has-sub" : ""}`}
                >
                  <Link
                    to={item?.link}
                    className={`nk-menu-link ${
                      item?.childs ? "nk-menu-toggle" : ""
                    }`}
                  >
                    <span className="nk-menu-text">{item?.name}</span>
                  </Link>
                  {item?.childs && (
                    <ul className="nk-menu-sub " style={{ display: "block" }}>
                      {item.childs.map((child, subKey) => (
                        <li key={`sub-nav ${subKey}`} className="nk-menu-item">
                          <Link
                            to={child?.link}
                            className="nk-menu-link"
                            onClick={() => {
                              if (setDisplayNavMobile)
                                setDisplayNavMobile(false);
                            }}
                          >
                            <span className="nk-menu-text">{child?.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {displayNavMobile && (
            <div className="nk-header-overlay" data-target="headerNav"></div>
          )}

          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="dropdown user-dropdown">
                <Link
                  to="#"
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <div className="user-toggle">
                    <div className="user-avatar sm">
                      <em className="icon ni ni-user-alt"></em>
                    </div>
                  </div>
                </Link>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1 is-light">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      <div className="user-avatar">
                        <span>AB</span>
                      </div>
                      <div className="user-info">
                        <span className="lead-text">Abu Bin Ishtiyak</span>
                        <span className="sub-text">info@softnio.com</span>
                      </div>
                      <div className="user-action">
                        <Link
                          className="btn btn-icon me-n2"
                          to="html/user-profile-setting.html"
                        >
                          <em className="icon ni ni-setting"></em>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-inner user-account-info">
                    <h6 className="overline-title-alt">Account Balance</h6>
                    <div className="user-balance">
                      1,494.23{" "}
                      <small className="currency currency-usd">USD</small>
                    </div>
                    <div className="user-balance-sub">
                      Locked{" "}
                      <span>
                        15,495.39{" "}
                        <span className="currency currency-usd">USD</span>
                      </span>
                    </div>
                    <Link to="#" className="link">
                      <span>Withdraw Balance</span>{" "}
                      <em className="icon ni ni-wallet-out"></em>
                    </Link>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <Link to="html/user-profile-regular.html">
                          <em className="icon ni ni-user-alt"></em>
                          <span>View Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="html/user-profile-setting.html">
                          <em className="icon ni ni-setting-alt"></em>
                          <span>Account Setting</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="html/user-profile-activity.html">
                          <em className="icon ni ni-activity-alt"></em>
                          <span>Login Activity</span>
                        </Link>
                      </li>
                      <li>
                        <Link className="dark-mode-switch" to="#">
                          <em className="icon ni ni-moon"></em>
                          <span>Dark Mode</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <Link to="#">
                          <em className="icon ni ni-signout"></em>
                          <span>Sign out</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
