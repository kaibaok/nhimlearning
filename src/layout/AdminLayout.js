import HeaderAdmin from "src/components/AdminComponents/header/HeaderAdmin";

function AdminLayout(props) {
  const { component: Component } = props;
  return (
    <div
      className="nk-body bg-lighter no-touch nk-nio-theme modal-open"
      style={{ overflow: "hidden", paddingRight: 17 }}
    >
      <div className="nk-app-root">
        <div className="nk-wrap ">
          <HeaderAdmin />
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
