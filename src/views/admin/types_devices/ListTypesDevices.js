import React from "react";
import PropTypes from "prop-types";

const ListTypesDevices = (props) => {
  const { isLoading, items, editTypesDevice, delTypesDevice } = props;

  return (
    <>
      {!isLoading &&
        items &&
        items.map((item, index) => (
          <div className="nk-tb-item" key={index}>
            <div className="nk-tb-col tb-col-sm">
              <div className="tb-sub">
                <span className="tb-sub">{item?.id}</span>
              </div>
            </div>
            <div className="nk-tb-col tb-col-sm">
              <span className="tb-product">
                <span className="title">{item?.name}</span>
              </span>
            </div>

            <div className="nk-tb-col nk-tb-col-tools">
              <span className="tb-sub">
                <em
                  role="button"
                  className="icon ni ni-edit"
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    if (editTypesDevice) editTypesDevice(item?.id);
                  }}
                />
                |
                <em
                  role="button"
                  className="icon ni ni-trash"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    if (delTypesDevice) delTypesDevice(item);
                  }}
                />
              </span>
            </div>
          </div>
        ))}
    </>
  );
};

ListTypesDevices.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  editTypesDevice: PropTypes.func,
  delTypesDevice: PropTypes.func,
};

export default ListTypesDevices;
