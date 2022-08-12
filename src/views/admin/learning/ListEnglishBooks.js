import React from "react";
import PropTypes from "prop-types";
// COMPONENTS
import AppConfig from "../../../AppConfig";

const ListEnglishBooks = (props) => {
  const { isLoading, items, editEnglishBook, delEnglishBook } = props;

  const imagePreview = (image) => {
    if (!image) return <></>;

    return image.substring(0, 6) === "images" ? (
      <img
        width={100}
        className="thumb border rounded"
        src={AppConfig.storageUrl + image}
        alt={image}
      />
    ) : (
      <img
        width={100}
        className="thumb border rounded"
        src={image}
        alt={image}
      />
    );
  };

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
                {imagePreview(item?.image)}
                <span className="title">{item?.name}</span>
              </span>
            </div>
            <div className="nk-tb-col">
              <span className="tb-sub">{item?.order_number}</span>
            </div>
            <div className="nk-tb-col">
              <span className="tb-lead">
                {" "}
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
                    if (editEnglishBook) editEnglishBook(item?.id);
                  }}
                />
                |
                <em
                  role="button"
                  className="icon ni ni-trash"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    if (delEnglishBook) delEnglishBook(item);
                  }}
                />
              </span>
            </div>
          </div>
        ))}
    </>
  );
};

ListEnglishBooks.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  editEnglishBook: PropTypes.func,
  delEnglishBook: PropTypes.func,
};

export default ListEnglishBooks;
