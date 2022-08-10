import React, { Fragment } from "react";
import LessonsListItem from "./LessonsListItem";
function LessonsList(props) {
  const { lessons, englishBook } = props;
  return (
    <Fragment>
      {lessons &&
        lessons.map((item, i) => (
          <div key={i} className="col-lg-3 col-md-6 col-xs-12">
            <LessonsListItem lesson={item} englishBook={englishBook} />
          </div>
        ))}
    </Fragment>
  );
}

export default LessonsList;
