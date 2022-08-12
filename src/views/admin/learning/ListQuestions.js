import React from "react";
import PropTypes from "prop-types";

const ListQuestions = (props) => {
  const { isLoading, items, editQuestion, delQuestion } = props;

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
              <span className="tb-sub">{item?.order_number}</span>
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
                    if (editQuestion) editQuestion(item?.id);
                  }}
                />
                |
                <em
                  role="button"
                  className="icon ni ni-trash"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    if (delQuestion) delQuestion(item);
                  }}
                />
              </span>
            </div>
          </div>
        ))}
    </>
  );
};

ListQuestions.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  editQuestion: PropTypes.func,
  delQuestion: PropTypes.func,
};

export default ListQuestions;
