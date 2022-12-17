import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../../components/UserComponents/BreadCrumb";
import FontAwesome from "../../../components/UserComponents/uiStyle/FontAwesome";
import { Link, useParams } from "react-router-dom";
import EnglishBookFetch from "../../../fetch/EnglishBookFetch";
import EnglishBookDetailsFetch from "../../../fetch/EnglishBookDetailsFetch";
import AppConfig from "../../../AppConfig";
import LessonsList from "./LessonsList";
import english_book from "../../../assets/images/common/english_book.jpg";

const EnglishBook = (props) => {
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
      await EnglishBookFetch.getEnglishBook(id)
        .then(async (json) => {
          const book = json?.data;
          setEnglishBook(book);
          if (book?.id) {
            await loadLessons({ english_book_id: book?.id });
          }
        })
        .catch((ex) => console.log(ex));
    };

    const loadLessons = async ({ page = 1, limit = 20, english_book_id }) => {
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
    };

    if (nextPage === 1) loadEnglishBook();
    else loadLessons({ page: nextPage, english_book_id: id });
  }, [id, nextPage]);

  return (
    <div className="container-fluid ">
      <div className="nk-content-inner">
        <div className="nk-content-body ">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
              <div className="nk-block-head-content">
                <h3 className="nk-block-title page-title">Books</h3>
              </div>
            </div>
          </div>
          <div className="nk-block">
            <BreadCrumb
              className="padding-top-30"
              title="English Books"
              link="/english-books"
              title2="Books"
            />
            <div className="space-30"></div>
            <div className="row">
              <LessonsList lessons={lessons} englishBook={englishBook} />
            </div>

            {lessons && lessons?.length > 0 && (
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
};

export default EnglishBook;
