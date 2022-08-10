import PropTypes from "prop-types";

function DeviceFuncs(props) {
  const {
    items,
    onOpenEditDeviceFuncDialog,
    onDeletDeviceFuncDialog,
    isLoading,
  } = props;

  return (
    <div className="nk-content-inner">
      <div className="nk-content-body ">
        <div className="nk-block">
          <div className="card card-bordered">
            <div className="card-inner-group">
              <div className="card-inner p-0">
                <div className="nk-tb-list">
                  <div className="nk-tb-item nk-tb-head">
                    <div className="nk-tb-col tb-col-sm">#</div>
                    <div className="nk-tb-col tb-col-sm">Name</div>
                    <div className="nk-tb-col tb-col-sm">Function</div>
                    <div className="nk-tb-col tb-col-sm">Action</div>
                  </div>
                  {isLoading && (
                    <div className="text-center p-2">
                      <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  {!isLoading &&
                    items &&
                    items.map((item, index) => (
                      <div className="nk-tb-item" key={index}>
                        <div className="nk-tb-col tb-col-sm">
                          <div className="tb-sub">
                            <span className="tb-sub">{index + 1}</span>
                          </div>
                        </div>
                        <div className="nk-tb-col tb-col-md">
                          <span className="tb-product">
                            <span className="title">{item?.name}</span>
                          </span>
                        </div>
                        <div className="nk-tb-col tb-col-md">
                          <span className="tb-sub">
                            <span className="title">{item?.action}</span>
                          </span>
                        </div>
                        <div className="nk-tb-col nk-tb-col-tools">
                          <em
                            role="button"
                            className="icon ni ni-edit"
                            style={{ marginRight: 10 }}
                            onClick={() => {
                              onOpenEditDeviceFuncDialog(item);
                            }}
                          />
                          |
                          <em
                            role="button"
                            className="icon ni ni-trash"
                            style={{ marginLeft: 10 }}
                            onClick={() => {
                              onDeletDeviceFuncDialog(item);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DeviceFuncs.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  onOpenEditDeviceFuncDialog: PropTypes.func,
  onDeletDeviceFuncDialog: PropTypes.func,
};

export default DeviceFuncs;
