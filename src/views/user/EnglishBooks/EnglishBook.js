import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "src/components/UserComponents/BreadCrumb";
import FontAwesome from "src/components/UserComponents/uiStyle/FontAwesome";
import { Link, useParams } from "react-router-dom";
import EnglishBookFetch from "src/fetch/EnglishBookFetch";
import EnglishBookDetailsFetch from "src/fetch/EnglishBookDetailsFetch";
import AppConfig from "src/AppConfig";
import LessonsList from "./LessonsList";
import english_book from "src/assets/images/common/english_book.jpg";

const EnglishBook = (props) => {
  const { barLoading } = props;
  let { id } = useParams();
  const [englishBook, setEnglishBook] = useState();
  const [lessons, setLessons] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const imagePreview = (image) => {
    if (!image) return <></>;
    return image.substring(0, 6) === "images" ? (
      <img
        className="thumb border rounded"
        src={AppConfig.storageUrl + image}
        alt="thumb"
        width="30%"
      />
    ) : (
      <img
        className="thumb border rounded"
        src={image}
        alt="thumb"
        width="30%"
      />
    );
  };

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
    const loadEnglishBook = async () => {
      barLoading.current.continuousStart();
      await EnglishBookFetch.getEnglishBook(id)
        .then(async (json) => {
          const book = json?.data;
          setEnglishBook(book);
          if (book?.id) {
            await loadLessons({ english_book_id: book?.id });
          }
        })
        .catch((ex) => console.log(ex));
      barLoading.current.complete();
    };

    const loadLessons = async ({ page = 1, limit = 20, english_book_id }) => {
      barLoading.current.continuousStart();
      await EnglishBookDetailsFetch.getAll({
        english_book_id: english_book_id,
        page: page,
        limit: limit,
      })
        .then((json) => {
          let englishBookDetails = json?.data;
          setTotalPage(json?.last_page);
          setCurrentPage(json?.current_page);
          let details = [];
          if (englishBookDetails) {
            details = englishBookDetails.map((item) => {
              return item.lesson;
            });
          }
          setLessons(details);
        })
        .catch((ex) => console.log(ex));
      barLoading.current.complete();
    };

    if (nextPage === 1) loadEnglishBook();
    else loadLessons({ page: nextPage, english_book_id: id });
  }, [barLoading, id, nextPage]);

  return (
    <Fragment>
      <div className="archives post post1">
        <BreadCrumb
          className="padding-top-30"
          title="English Books"
          link="/english-books"
          title2="Book"
        />
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
                          {englishBook?.name}
                        </h1>
                      </div>
                      <div className="space-20" />
                      {imagePreview(englishBook?.image)}
                      <div className="space-30" />
                      <div className="page_category">
                        <h4>Lessons</h4>
                      </div>
                      <div className="space-20" />

                      <div className="entertrainment_carousel">
                        <div className="entertrainment_item">
                          <div className="row">
                            <LessonsList
                              lessons={lessons}
                              englishBook={englishBook}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="padding20 menu_right">
                        {lessons && lessons?.length > 0 && (
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
};

export default EnglishBook;
