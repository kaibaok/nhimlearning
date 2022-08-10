import React from "react";
import PropTypes from "prop-types";
import ListDeviceItem from "./ListDeviceItem";

const ListDevice = (props) => {
  const { isLoading, items, editDevice, delDevice, onDefaultFuncAction } =
    props;

  return (
    <>
      {!isLoading &&
        items &&
        items.map((item, index) => (
          <ListDeviceItem
            key={index}
            device={item}
            editDevice={editDevice}
            delDevice={delDevice}
            onDefaultFuncAction={onDefaultFuncAction}
          />
        ))}
    </>
  );
};

ListDevice.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  editDevice: PropTypes.func,
  delDevice: PropTypes.func,
};

export default ListDevice;
