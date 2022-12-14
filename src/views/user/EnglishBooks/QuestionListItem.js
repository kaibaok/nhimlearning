import React, { useState } from "react";
import PropTypes from "prop-types";
import AnswerDetailsFetch from "../../../fetch/AnswerDetailsFetch";
import { useEffect } from "react";
import AppConfig from "../../../AppConfig";
import Conversation from "./Conversation";
import IconQuestion from "../../../assets/images/icon/icon_question.png";
import { Card } from "../../../components/AdminComponents/commons";

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
  const [visibleTab2, setVisibleTab2] = useState(false);

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
        className="card-img-top cursor_pointer"
        src={AppConfig.storageUrl + url}
        onClick={() => readText({ text: name, isQuestion: false })}
        alt={url}
      />
    ) : (
      <img
        className="card-img-top cursor_pointer"
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

  const displayTargetVocabulary = () => {
    if (!question.description) return null;
    const descriptions_arr = question.description.split("\n");

    return (
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
        <div className={`accordion-body collapse ${visibleTab1 ? "show" : ""}`}>
          <div className="accordion-inner">
            <div className="row">
              {descriptions_arr.map((item, key) => {
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
    );
  };

  const displayVideos = () => {
    if (!question.videos) return null;
    const videos_arr = question.videos.split("\n");

    return (
      <div className="accordion-item">
        <span
          href="#"
          className={`accordion-head cursor_pointer ${
            visibleTab2 ? "" : "collapsed"
          }`}
          onClick={() => {
            setVisibleTab2(!visibleTab2);
          }}
        >
          <h6 className="title">Videos</h6>
          <span className="accordion-icon"></span>
        </span>
        <div className={`accordion-body collapse ${visibleTab2 ? "show" : ""}`}>
          <div className="accordion-inner">
            <div className="row">
              {videos_arr.map((item, key) => {
                if (!item) return "";
                return (
                  <div
                    className="col-lg-4 col-md-4 col-xs-6 mb-2 cursor_pointer"
                    key={key}
                    onClick={() => {
                      readText({ text: item });
                    }}
                  >
                    <div className="alert alert-danger p-1">
                      {<Card video={item} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="single_post">
      <div className="accordion mb-3">{displayTargetVocabulary()}</div>
      <div className="accordion mb-3">{displayVideos()}</div>

      <div className="row">
        {answers &&
          answers.map((answer, index) => {
            return (
              <div className="col-lg-3 col-md-4 col-xs-12 mb-4" key={index}>
                <div class="card">
                  {previewImage(answer.image, answer.name)}
                  <div class="card-inner">
                    <h5 class="card-title center font30">{answer.name}</h5>
                    <p class="card-text mb-2">{answer.description}</p>
                    <Conversation
                      questions={answer?.questions_arr}
                      answers={answer?.answers_arr}
                      readText={readText}
                      timeDelay={timeDelay}
                      speaking={speaking}
                    />
                  </div>
                </div>

                {/* <div className="card card-bordered">
                  <div className="card-inner">
                  
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
                </div> */}
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
