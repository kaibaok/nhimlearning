import React from "react";
import PropTypes from "prop-types";

const ListAreas = (props) => {
  const { isLoading, items, editArea, delArea } = props;

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
            <div className="nk-tb-col">
              <span className="tb-sub">{item?.full_name}</span>
            </div>

            <div className="nk-tb-col nk-tb-col-tools">
              <span className="tb-sub">
                <em
                  role="button"
                  className="icon ni ni-edit"
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    if (editArea) editArea(item?.id);
                  }}
                />
                |
                <em
                  role="button"
                  className="icon ni ni-trash"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    if (delArea) delArea(item);
                  }}
                />
              </span>
            </div>
          </div>
        ))}
    </>
  );
};

ListAreas.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  editArea: PropTypes.func,
  delArea: PropTypes.func,
};

export default ListAreas;
