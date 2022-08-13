import React, { useState } from "react";
import PropTypes from "prop-types";
import AnswerDetailsFetch from "../../../fetch/AnswerDetailsFetch";
import { useEffect } from "react";
import AppConfig from "../../../AppConfig";
import Conversation from "./Conversation";
import IconQuestion from "../../../assets/images/icon/icon_question.png";

const QuestionListItem = (props) => {
  const {
    question,
    speak,
    voices,
    voiceQuestion,
    voiceAnswer,
    timeDelay,
    speaking,
  } = props;
  const [answers, setAnswers] = useState();
  const [visibleTab1, setVisibleTab1] = useState(false);

  useEffect(() => {
    const loadAnswerDetail = async (question_id) => {
      await AnswerDetailsFetch.getAll({ question_id: question_id })
        .then((json) => {
          setAnswers(json?.data);
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
    if (question) {
      loadAnswerDetail(question.id);
    }
  }, [question]);

  const previewImage = (url, name) => {
    if (!url) return <></>;

    return url.substring(0, 6) === "images" ? (
      <img
        className="thumb border rounded p-2 mb-2"
        src={AppConfig.storageUrl + url}
        onClick={() => readText({ text: name, isQuestion: false })}
        alt={url}
      />
    ) : (
      <img
        className="thumb border rounded p-2 mb-2"
        src={url}
        onClick={() => readText({ text: name, isQuestion: false })}
        alt={url}
      />
    );
  };

  const readText = ({ text, isQuestion = true }) => {
    let voice = isQuestion ? voices[voiceQuestion] : voices[voiceAnswer];
    speak({ text: text, voice: voice });
  };

  return (
    <div className="single_post">
      <h3 className="padding10 alert alert-primary">
        <img
          className="thumb p-2 me-2"
          src={IconQuestion}
          width={50}
          alt={IconQuestion}
        />
        {question.name}
      </h3>

      <div className="accordion mb-3">
        {question.description_arr && question.description_arr.length > 0 && (
          <div className="accordion-item">
            <span
              href="#"
              className={`accordion-head cursor_pointer ${
                visibleTab1 ? "" : "collapsed"
              }`}
              onClick={() => {
                setVisibleTab1(!visibleTab1);
              }}
            >
              <h6 className="title">Target Vocabulary</h6>
              <span className="accordion-icon"></span>
            </span>
            <div
              className={`accordion-body collapse ${visibleTab1 ? "show" : ""}`}
            >
              <div className="accordion-inner">
                <div className="row">
                  {question.description_arr.map((item, key) => {
                    if (!item) return "";
                    return (
                      <div
                        className="col-lg-3 col-md-4 col-xs-6 mb-2 cursor_pointer"
                        key={key}
                        onClick={() => {
                          readText({ text: item });
                        }}
                      >
                        <div className="alert alert-danger">{item}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="row">
        {answers &&
          answers.map((answer, index) => {
            return (
              <div className="col-lg-3 col-md-4 col-xs-12 mb-3" key={index}>
                <div className="card card-bordered">
                  <div className="card-inner">
                    {answer.name && (
                      <h5 className="card-title center font30">
                        {answer.name}
                      </h5>
                    )}
                    <div className="center">
                      {previewImage(answer.image, answer.name)}
                    </div>
                    {answer.description && (
                      <div className="mb-2">{answer.description}</div>
                    )}
                    <Conversation
                      questions={answer?.questions_arr}
                      answers={answer?.answers_arr}
                      readText={readText}
                      timeDelay={timeDelay}
                      speaking={speaking}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

QuestionListItem.propTypes = {
  question: PropTypes.object,
};

export default QuestionListItem;
