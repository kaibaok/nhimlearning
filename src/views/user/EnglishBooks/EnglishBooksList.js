import React, { Fragment } from "react";
import PropTypes from "prop-types";
import EnglishBooksListItem from "./EnglishBooksListItem";

const EnglishBooksList = (props) => {
  const { books } = props;

  return (
    <Fragment>
      {books &&
        books.map((item, i) => (
          <div key={i} className="col-lg-3 col-md-4 col-xs-12">
            <EnglishBooksListItem book={item} />
          </div>
        ))}
    </Fragment>
  );
};

EnglishBooksList.propTypes = {
  books: PropTypes.array,
};

export default EnglishBooksList;
