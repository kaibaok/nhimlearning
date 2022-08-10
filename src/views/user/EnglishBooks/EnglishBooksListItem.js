import React from "react";
import { Link } from "react-router-dom";
import AppConfig from "src/AppConfig";
import PropTypes from "prop-types";

const EnglishBooksListItem = (props) => {
  const { book } = props;

  const previewImage = (url) => {
    if (!url) return <></>;

    return url.substring(0, 6) === "images" ? (
      <img
        className="thumb border rounded p-2"
        alt={url}
        src={AppConfig.storageUrl + url}
      />
    ) : (
      <img className="thumb border rounded p-2" src={url} alt={url} />
    );
  };

  return (
    <div className="single_post post_type3 mb30">
      <div className="post_img">
        <div className="img_wrap">
          <Link to={`/english-book/${book?.id}`}>
            {previewImage(book?.image)}
          </Link>
        </div>
      </div>
      <div className="single_post_text">
        <div className="meta3">
          <Link to="/english-books">English Books</Link>
        </div>
        <h4>
          <Link to={`/english-book/${book?.id}`}>{book?.name}</Link>
        </h4>
        <div className="space-10" />
        <p className="post-p">{book?.description}</p>
      </div>
    </div>
  );
};

EnglishBooksListItem.propTypes = {
  book: PropTypes.object,
};

export default EnglishBooksListItem;
