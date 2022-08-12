import React from "react";
import PropTypes from "prop-types";

const ListQuestionTypes = (props) => {
  const { isLoading, items, editQuestionType, delQuestionType } = props;
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
              <span className="tb-sub">
                {item?.description && item?.description.length > 30
                  ? item?.description.substring(0, 30) + "..."
                  : item?.description}
              </span>
            </div>
            <div className="nk-tb-col nk-tb-col-tools">
              <span className="tb-sub">
                <em
                  role="button"
                  className="icon ni ni-edit"
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    if (editQuestionType) editQuestionType(item?.id);
                  }}
                />
                |
                <em
                  role="button"
                  className="icon ni ni-trash"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    if (delQuestionType) delQuestionType(item);
                  }}
                />
              </span>
            </div>
          </div>
        ))}
    </>
  );
};

ListQuestionTypes.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  editQuestionType: PropTypes.func,
  delQuestionType: PropTypes.func,
};

export default ListQuestionTypes;
