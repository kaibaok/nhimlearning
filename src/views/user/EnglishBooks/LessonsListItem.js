import React from "react";
import { Link } from "react-router-dom";
import AppConfig from "../../../AppConfig";
import PropTypes from "prop-types";

const LessonsListItem = (props) => {
  const { lesson, englishBook } = props;

  const previewImage = (url) => {
    if (!url) return <></>;

    return url.substring(0, 6) === "images" ? (
      <img
        className="card-img-top"
        src={AppConfig.storageUrl + url}
        alt={url}
      />
    ) : (
      <img className="card-img-top" src={url} alt={url} />
    );
  };

  return (
    <div class="card">
      <Link to={`/lesson/${lesson?.id}/${englishBook?.id}`}>
        {previewImage(lesson?.image)}
      </Link>
      <div class="card-inner">
        <h5 class="card-title">
          <Link to={`/lesson/${lesson?.id}/${englishBook?.id}`}>
            {lesson?.name}
          </Link>
        </h5>
        <p class="card-text">{lesson?.description}</p>
      </div>
    </div>
  );
};

LessonsListItem.propTypes = {
  lesson: PropTypes.object,
};

export default LessonsListItem;
