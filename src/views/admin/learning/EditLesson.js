import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
//FETCH
import LessonFetch from "../../../fetch/LessonFetch";
// COMPONENTS
import { ToastContainer, toast } from "react-toastify";
import GroupQuestion from "./child_widget/GroupQuestion";
// CSS
import QuestionFetch from "../../../fetch/QuestionFetch";
import LessonDetailsFetch from "../../../fetch/LessonDetailsFetch";
import AppConfig from "../../../AppConfig";
import { MediaDialog } from "../../../views/widgets/media/MediaDialog";
import { Button } from "../../../components/AdminComponents/commons";

function EditLesson() {
  // get query params
  let { id } = useParams();

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [orderNumber, setOrderNumber] = useState(0);
  const [height, setHeight] = useState(500);
  const [listQuestions, setListquestions] = useState([]);
  const [listQuestionsChosen, setListquestionschosen] = useState([]);
  const [questionName, setQuestionName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const imagePreview = (image) => {
    if (!image) return <></>;
    return image.substring(0, 6) === "images" ? (
      <img
        height={200}
        className="thumb border rounded"
        src={AppConfig.storageUrl + image}
        alt={image}
      />
    ) : (
      <img
        height={200}
        className="thumb border rounded"
        src={image}
        alt={image}
      />
    );
  };

  const updateWindowDimensions = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    loadQuestions();
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    if (id) loadLesson(id);
  }, [id]);

  async function loadQuestions(name) {
    await QuestionFetch.getAll({ name: name }).then((json) => {
      setListquestions(json?.data);
    });
  }

  const searchQuestionName = async (name) => {
    setQuestionName(name);
    await loadQuestions(name);
  };

  const openMedia = () => {
    setIsVisible(true);
  };

  const closeMedia = () => {
    setIsVisible(false);
  };

  const onFileSelected = (item) => {
    setImage(item);
  };

  const loadLesson = async (id) => {
    await LessonFetch.getLesson(id)
      .then(async (json) => {
        const lesson = json?.data;
        if (lesson) {
          setName(lesson?.name);
          setDescription(lesson?.description ?? "");
          setImage(lesson?.image ?? "");
          setOrderNumber(lesson?.order_number ?? 0);
          await LessonDetailsFetch.getAll({ lesson_id: lesson?.id })
            .then((jsonD) => {
              const questionDetails = jsonD?.data;
              let details = [];
              if (questionDetails) {
                details = questionDetails.map((item) => item?.question);
              }

              setListquestionschosen(details);
            })
            .catch((exD) => console.log(exD));
        }
      })
      .catch((ex) => console.log(ex));
  };

  const onSaveLesson = async () => {
    setIsLoading(true);
    if (!id) {
      await LessonFetch.createLesson({
        name: name,
        questions: listQuestionsChosen,
        description: description,
        image: image,
        order_number: orderNumber,
      })
        .then((json) => {
          showToast("Create Successfully", false);
          setTimeout(() => navigate("/admin/lessons"), 1000);
        })
        .catch((ex) => {
          showToast("Create Failed", true);
        });
    } else {
      await LessonFetch.editLesson(id, {
        name: name,
        questions: listQuestionsChosen,
        description: description,
        image: image,
        order_number: orderNumber,
      })
        .then((json) => {
          showToast("Edit Successfully", false);
        })
        .catch((ex) => {
          console.log(ex);
          showToast("Edit Failed", true);
        });
    }
    setIsLoading(false);
  };

  const addQuestion = (question) => {
    setListquestionschosen([...listQuestionsChosen, question]);
  };

  const removeQuestion = (index) => {
    let questions = listQuestionsChosen;
    if (index !== -1) {
      questions.splice(index, 1);
      setListquestionschosen([...questions]);
    }
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
                  {`${id ? "Edit" : "New"} Lesson`}
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
                          onClick={onSaveLesson}
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
                          onClick={() => navigate("/admin/lessons")}
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
                      <div className="col-xs-12 col-lg-12">
                        <label className="form-label">Url</label>
                      </div>
                      <div className="col-xs-12 col-lg-9 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          value={image ?? ""}
                          onChange={(event) => {
                            setImage(event?.target?.value);
                          }}
                        />
                      </div>
                      <div className="col-xs-12 col-lg-3 ">
                        <Button
                          label="Browse"
                          onClick={() => {
                            openMedia();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xs-12">
                    <div className="row mb-3">
                      <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                          <label className="form-label">Image</label>
                          <div className="form-control-wrap">
                            {imagePreview(image)}
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
                <GroupQuestion
                  maxHeight={height}
                  listQuestions={listQuestions}
                  listQuestionsChosen={listQuestionsChosen}
                  addQuestion={addQuestion}
                  removeQuestion={removeQuestion}
                  questionName={questionName}
                  setQuestionName={searchQuestionName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MediaDialog
        title="Media"
        visible={isVisible}
        onClose={closeMedia}
        fileSelected={image ?? ""}
        onFileSelected={onFileSelected}
      />
    </div>
  );
}

EditLesson.propTypes = {
  id: PropTypes.number,
};

export default EditLesson;
