import React from "react";
import { Link } from "react-router-dom";
import AppConfig from "../../../AppConfig";
import PropTypes from "prop-types";

const EnglishBooksListItem = (props) => {
  const { book } = props;

  const previewImage = (url) => {
    if (!url) return <></>;

    return url.substring(0, 6) === "images" ? (
      <img
        className="card-img-top"
        alt={url}
        src={AppConfig.storageUrl + url}
      />
    ) : (
      <img className="card-img-top" src={url} alt={url} />
    );
  };

  return (
    <div class="card">
      <Link to={`/english-book/${book?.id}`}>{previewImage(book?.image)}</Link>
      <div class="card-inner">
        <h5 class="card-title">
          <Link to={`/english-book/${book?.id}`}>{book?.name}</Link>
        </h5>
        <p class="card-text">{book?.description}</p>
      </div>
    </div>
  );
};

EnglishBooksListItem.propTypes = {
  book: PropTypes.object,
};

export default EnglishBooksListItem;
