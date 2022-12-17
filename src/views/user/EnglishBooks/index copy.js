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
    <Fragment>
      <div className="archives post post1">
        <BreadCrumb title="English Books" />
        <span className="space-30" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xs-12">
              <div className="shadow6">
                <div className="padding20 white_bg">
                  <div className="row ">
                    <div className="col-12 align-self-center">
                      <div className="categories_title">
                        <h1>
                          <span className="p-3">
                            <img src={english_book} alt="thumb" width={70} />
                          </span>
                          Books
                        </h1>
                      </div>

                      <div className="space-20" />
                      <div className="entertrainment_carousel">
                        <div className="entertrainment_item">
                          <div className="row">
                            <EnglishBooksList books={books} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rơw">
                    <div className="col-xs-12">
                      <div className="padding20 menu_right">
                        {books && books?.length > 0 && (
                          <div className="row">
                            <div className="col-12">
                              <div className="cpagination">
                                <nav aria-label="Page navigation example">
                                  <ul className="pagination">
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
                                          setNextPage(
                                            currentPage === 1
                                              ? 1
                                              : currentPage - 1
                                          );
                                        }}
                                      >
                                        <span aria-hidden="true">
                                          <FontAwesome name="caret-left" />
                                        </span>
                                      </Link>
                                    </li>
                                    {showPages()}
                                    <li
                                      className={`page-item ${
                                        currentPage === totalPage
                                          ? "disabled"
                                          : ""
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
                                        <span aria-hidden="true">
                                          <FontAwesome name="caret-right" />
                                        </span>
                                      </Link>
                                    </li>
                                  </ul>
                                </nav>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </Fragment>
  );
}

export default EnglishBooks;
