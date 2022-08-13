import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
//FETCH
import QuestionTypeFetch from "../../../fetch/QuestionTypeFetch";
// COMPONENTS
import { ToastContainer, toast } from "react-toastify";
// CSS
import QuestionFetch from "../../../fetch/QuestionFetch";
import { Button } from "../../../components/AdminComponents/commons";
import QuestionWidget from "./child_widget/QuestionWidget";
import AnswerDetailsFetch from "../../../fetch/AnswerDetailsFetch";

function EditQuestion() {
  // get query params
  let { id } = useParams();

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [orderNumber, setOrderNumber] = useState(0);
  // const [question, setQuestion] = useState(null);
  const [questionType, setQuestionType] = useState(1);
  const [types, setTypes] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [height, setHeight] = useState(500);

  const updateWindowDimensions = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    const loadQuestionTypes = async () => {
      await QuestionTypeFetch.getAll()
        .then((json) => {
          const types = json?.data;
          setTypes(types);
        })
        .catch((ex) => console.log("error load question type : ", ex));
    };

    loadQuestionTypes();

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    if (id) loadQuestion(id);
  }, [id]);

  useEffect(() => {
    if (questionType) {
      setAnswers([]);
    }
  }, [questionType, setAnswers]);

  const addMoreAnswers = () => {
    let listAnswers = answers;
    listAnswers.push({
      name: "",
      image: "",
      questions: "",
      answers: "",
      is_external_image: false,
      description: "",
    });
    setAnswers([...listAnswers]);
  };

  const loadQuestion = async (id) => {
    await QuestionFetch.getQuestion(id)
      .then(async (json) => {
        const question = json?.data;
        if (question) {
          setName(question?.name);
          setDescription(question?.description ?? "");
          // setQuestion(question);
          setQuestionType(question?.question_type_id ?? 0);
          setOrderNumber(question?.order_number ?? 0);
          // load list answers
          await AnswerDetailsFetch.getAll({
            question_id: id,
            order_field: "id",
            order_direction: "asc",
          })
            .then((json) => {
              const answersList = json?.data.map((item) => {
                return {
                  image: item?.image ?? "",
                  is_external_image: item?.is_external_image ?? false,
                  name: item?.name ?? "",
                  questions: item?.questions ?? "",
                  answers: item?.answers ?? "",
                  description: item?.description ?? "",
                };
              });
              setAnswers(answersList);
            })
            .catch((ex) => {
              console.log(ex);
            });
        }
      })
      .catch((ex) => console.log(ex));
  };

  const onSaveQuestion = async () => {
    setIsLoading(true);
    if (!id) {
      await QuestionFetch.createQuestion({
        name: name,
        description: description,
        question_type_id: questionType,
        order_number: orderNumber,
      })
        .then(async (json) => {
          if (json.question) {
            await AnswerDetailsFetch.createAnswers(
              { answers: answers },
              json.question?.id
            )
              .then((jsonA) => {
                console.log(jsonA);
              })
              .catch((exA) => {
                console.log(exA);
              });
          }

          showToast("Create Successfully", false);
          setTimeout(() => navigate("/admin/questions"), 1000);
        })
        .catch((ex) => {
          showToast("Create Failed", true);
        });
    } else {
      await QuestionFetch.editQuestion(id, {
        name: name ?? "",
        description: description ?? "",
        question_type_id: questionType ?? "",
        order_number: orderNumber ?? "",
      })
        .then(async (json) => {
          showToast("Edit Successfully", false);
          await AnswerDetailsFetch.createAnswers({ answers: answers }, id)
            .then((jsonA) => {
              console.log(jsonA);
            })
            .catch((exA) => {
              console.log(exA);
            });
        })
        .catch((ex) => {
          console.log(ex);
          showToast("Edit Failed", true);
        });
    }
    setIsLoading(false);
  };

  const showToast = (title, error) => {
    error ? toast.error(title) : toast.success(title);
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="nk-content-inner">
        <div className="nk-content-body ">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
              <div className="nk-block-head-content">
                <h3 className="nk-block-title page-title">
                  {`${id ? "Edit" : "New"} Question`}
                </h3>
              </div>
              <div className="nk-block-head-content">
                <div className="toggle-wrap nk-block-tools-toggle">
                  <div className="toggle-expand-content">
                    <ul className="nk-block-tools g-3">
                      <li className="nk-block-tools-opt">
                        <Button
                          label="Save"
                          className="btn btn-info"
                          icon={<em className="icon ni ni-save"></em>}
                          onClick={onSaveQuestion}
                          disabled={isLoading}
                        />
                      </li>
                      <li className="nk-block-tools-opt">
                        <Button
                          label="Cancel"
                          className="btn btn-secondary"
                          icon={
                            <em className="icon ni ni-back-arrow-fill"></em>
                          }
                          onClick={() => navigate("/admin/questions")}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nk-block">
            <div className="card card-bordered">
              <div className="card-inner">
                <div className="row">
                  <div className="col-lg-4 col-xs-12">
                    <div className="row mb-3">
                      <div className="col-xs-12 col-lg-12">
                        <div className="form-group mb-3">
                          <label className="form-label">Name</label>
                          <div className="form-control-wrap">
                            <input
                              type="text"
                              className="form-control"
                              value={name}
                              onChange={(event) => {
                                setName(event?.target?.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xs-12">
                    <div className="row mb-3">
                      <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                          <label className="form-label">Type</label>
                          <div className="form-control-wrap ">
                            <div className="form-control-select">
                              <select
                                className="form-control"
                                value={questionType}
                                onChange={(event) => {
                                  setQuestionType(event.target.value);
                                }}
                              >
                                <option value="0">Selection...</option>
                                {types &&
                                  types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                      {type.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                          <label className="form-label">Order Number</label>

                          <input
                            type="number"
                            className="form-control"
                            value={orderNumber}
                            onChange={(event) => {
                              setOrderNumber(event?.target?.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-xs-12">
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <div className="form-control-wrap">
                        <textarea
                          className="form-control no-resize"
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                          value={description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nk-block">
            <div className="card card-bordered card-preview">
              <div className="card-inner">
                <QuestionWidget
                  questionType={questionType}
                  answers={answers}
                  addMoreAnswers={addMoreAnswers}
                  setAnswers={setAnswers}
                  maxHeight={height}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EditQuestion.propTypes = {
  id: PropTypes.number,
};

export default EditQuestion;
