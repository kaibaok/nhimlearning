import { useState } from "react";
import HeaderAdmin from "../components/AdminComponents/header/HeaderAdmin";

function AdminLayout(props) {
  const { component: Component } = props;

  const [displayNavMobile, setDisplayNavMobile] = useState(false);

  return (
    <div className="nk-body bg-lighter no-touch nk-nio-theme modal-open">
      <div className="nk-app-root">
        <div className="nk-wrap ">
          <HeaderAdmin
            setDisplayNavMobile={setDisplayNavMobile}
            displayNavMobile={displayNavMobile}
          />
          <div className="nk-content ">
            <div className="container-fluid">
              <div className="nk-content-inner">
                <div className="nk-content-body">
                  {Component && <Component {...props} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
