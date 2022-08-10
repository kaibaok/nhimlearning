import React from "react";
import { Link } from "react-router-dom";
import AppConfig from "src/AppConfig";
import PropTypes from "prop-types";

const LessonsListItem = (props) => {
  const { lesson, englishBook } = props;

  const previewImage = (url) => {
    if (!url) return <></>;

    return url.substring(0, 6) === "images" ? (
      <img
        className="thumb border rounded p-2"
        src={AppConfig.storageUrl + url}
        alt={url}
      />
    ) : (
      <img className="thumb border rounded p-2" src={url} alt={url} />
    );
  };

  return (
    <div className="single_post post_type3 mb30">
      <div className="post_img">
        <div className="img_wrap">
          <Link to={`/lesson/${lesson?.id}/${englishBook?.id}`}>
            {previewImage(lesson?.image)}
          </Link>
        </div>
      </div>
      <div className="single_post_text">
        <div className="meta3">
          <Link to="/english-lessons">English lessons</Link>
        </div>
        <h4>
          <Link to={`/english-lesson/${lesson?.id}`}>{lesson?.name}</Link>
        </h4>
        <div className="space-10" />
        <p className="post-p">{lesson?.description}</p>
      </div>
    </div>
  );
};

LessonsListItem.propTypes = {
  lesson: PropTypes.object,
};

export default LessonsListItem;
