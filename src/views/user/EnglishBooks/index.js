import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../components/UserComponents/BreadCrumb";
import FontAwesome from "../../../components/UserComponents/uiStyle/FontAwesome";
// import WidgetTab from "../../../components/UserComponents/WidgetTab";

// images
import EnglishBooksList from "./EnglishBooksList";
import EnglishBookFetch from "../../../fetch/EnglishBookFetch";
import english_book from "../../../assets/images/common/english_book.jpg";

function EnglishBooks(props) {
  const [books, setBooks] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const showPages = () => {
    let listPage = [];
    const end = currentPage + 5 > totalPage ? totalPage : currentPage + 5;
    const first = end - 5 > 0 ? end - 5 : 1;
    for (let index = first; index <= end; index++) {
      let active = index === currentPage;
      listPage.push(
        <li key={index} className={`page-item ${active ? "active" : ""}`}>
          <Link
            className="page-link"
            to="#"
            onClick={() => {
              if (!active) setNextPage(index);
            }}
          >
            {index}
          </Link>
        </li>
      );
    }
    return listPage;
  };

  useEffect(() => {
    const loadEnglishBooks = async (page = 1, limit = 20) => {
      await EnglishBookFetch.getAll({ page: page, limit: limit })
        .then((json) => {
          setBooks(json?.data);
          setTotalPage(json?.last_page);
          setCurrentPage(json?.current_page);
        })
        .catch((ex) => {
          console.log(ex);
        });
    };

    if (nextPage === 1) loadEnglishBooks();
    else loadEnglishBooks(nextPage);
  }, [nextPage]);

  return (
    <div className="container-fluid ">
      <div className="nk-content-inner">
        <div className="nk-content-body ">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
              <div className="nk-block-head-content">
                <h3 className="nk-block-title page-title">English Books</h3>
              </div>
            </div>
          </div>
          <div className="nk-block">
            <div className="row">
              <EnglishBooksList books={books} />
            </div>
            {books && books?.length > 0 && (
              <div>
                <ul class="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      to="#"
                      aria-label="Previous"
                      onClick={() => {
                        setNextPage(currentPage === 1 ? 1 : currentPage - 1);
                      }}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>

                  {showPages()}

                  <li
                    className={`page-item ${
                      currentPage === totalPage ? "disabled" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      to="#"
                      aria-label="Next"
                      onClick={() => {
                        setNextPage(currentPage + 1);
                      }}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnglishBooks;
