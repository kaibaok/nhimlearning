import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/UserComponents/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import QuestionList from "./QuestionList";
import LessonFetch from "../../../fetch/LessonFetch";
import LessonDetailsFetch from "../../../fetch/LessonDetailsFetch";
import EnglishBookFetch from "../../../fetch/EnglishBookFetch";
import { VoiceDialog } from "../../../components/UserComponents/VoiceDialog";
import AppStore from "../../../fetch/AppFetch";
import { Button } from "../../../components/AdminComponents/commons";

const EnglishBook = (props) => {
  const { voices, speak, speaking } = props;
  let { id, english_book_id } = useParams();

  const [lesson, setLesson] = useState();
  const [book, setBook] = useState();
  const [questions, setQuestions] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [isVisibleVoiceDialog, setIsVisibleVoiceDialog] = useState(false);
  const [voiceQuestion, setVoiceQuestion] = useState(0);
  const [voiceAnswer, setVoiceAnswer] = useState(0);
  const timeDelay = 1200;

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
    onRefreshVoices();
  }, []);

  const onRefreshVoices = () => {
    const defaultVoices = AppStore.fetchVoices();
    if (defaultVoices) {
      setVoiceQuestion(defaultVoices?.voiceQuestion);
      setVoiceAnswer(defaultVoices?.voiceAnswer);
    }
  };

  useEffect(() => {
    const loadEnglishBook = async (english_book_id) => {
      await EnglishBookFetch.getEnglishBook(english_book_id)
        .then(async (json) => {
          setBook(json?.data);
        })
        .catch((ex) => console.log(ex));
    };

    const loadLesson = async () => {
      await LessonFetch.getLesson(id)
        .then(async (json) => {
          const lessonData = json?.data;
          setLesson(lessonData);
          if (lessonData?.id) {
            await loadEnglishBook(english_book_id);
            await loadQuestions({ lesson_id: lessonData?.id });
          }
        })
        .catch((ex) => console.log(ex));
    };

    const loadQuestions = async ({ page = 1, limit = 1, lesson_id }) => {
      await LessonDetailsFetch.getAll({
        lesson_id: lesson_id,
        page: page,
        limit: limit,
      })
        .then((json) => {
          let lessonDetail = json?.data;
          setTotalPage(json?.last_page);
          setCurrentPage(json?.current_page);
          let details = [];
          if (lessonDetail) {
            details = lessonDetail.map((item) => {
              return item.question;
            });
          }

          setQuestions(details);
        })
        .catch((ex) => console.log(ex));
    };

    if (nextPage === 1) loadLesson();
    else loadQuestions({ page: nextPage, lesson_id: id });
  }, [id, nextPage, english_book_id]);

  return (
    <div className="container-fluid ">
      <div className="nk-content-inner">
        <div className="nk-content-body ">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
              <div className="nk-block-head-content">
                <h3 className="nk-block-title page-title">{lesson?.name}</h3>
              </div>
            </div>
          </div>
          <div className="nk-block">
            <BreadCrumb
              className="padding-top-30"
              title="English Books"
              link="/english-books"
              title2={book?.name}
              link2={`/english-book/${english_book_id}`}
              title3={lesson?.name}
            />
            <div className="col-xs-12">
              <div className=" d-flex justify-content-start pt-3">
                <Button
                  onClick={(event) => {
                    setIsVisibleVoiceDialog(true);
                  }}
                  icon={<em className="icon ni ni-mic"></em>}
                  className="btn btn-primary"
                />
              </div>
            </div>
            <div className="space-30"></div>
            <div className="row">
              <QuestionList
                questions={questions}
                speak={speak}
                voices={voices}
                voiceQuestion={voiceQuestion}
                voiceAnswer={voiceAnswer}
                timeDelay={timeDelay}
                speaking={speaking}
              />
            </div>

            {questions && questions?.length > 0 && (
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
      <VoiceDialog
        title="Setting Voices"
        speak={speak}
        voices={voices}
        visible={isVisibleVoiceDialog}
        onClose={setIsVisibleVoiceDialog}
        onRefresh={onRefreshVoices}
      />
    </div>
  );
};

export default EnglishBook;
