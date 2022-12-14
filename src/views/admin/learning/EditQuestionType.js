import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
//FETCH
import QuestionTypeFetch from "../../../fetch/QuestionTypeFetch";
// COMPONENTS
import { ToastContainer, toast } from "react-toastify";
// CSS
import "react-toastify/dist/ReactToastify.css";

function EditQuestionType() {
  // get query params
  let { id } = useParams();

  let navigate = useNavigate();
  const [, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [, setQuestionType] = useState(null);

  useEffect(() => {
    if (id) loadQuestionType(id);
  }, [id]);

  const loadQuestionType = async (id) => {
    await QuestionTypeFetch.getQuestionType(id)
      .then(async (json) => {
        const questionType = json?.data;
        if (questionType) {
          setName(questionType?.name);
          setDescription(questionType?.description ?? "");
          setQuestionType(questionType);
        }
      })
      .catch((ex) => console.log(ex));
  };

  const onSaveQuestionType = async () => {
    setIsLoading(true);
    if (!id) {
      await QuestionTypeFetch.createQuestionType({
        name: name,
        description: description,
      })
        .then((json) => {
          showToast("Create Successfully", false);
          setTimeout(() => navigate("/admin/question-types"), 1000);
        })
        .catch((ex) => {
          showToast("Create Failed", true);
        });
    } else {
      await QuestionTypeFetch.editQuestionType(id, {
        name: name ?? "",
        description: description ?? "",
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

  const showToast = (title, error) => {
    error ? toast.error(title) : toast.success(title);
  };

  return (
    <div className="container-fluid ">
      <ToastContainer />
      <ul class="nk-sticky-toolbar">
        <li class="demo-layout">
          <a
            className="toggle tipinfo cursor_pointer"
            onClick={onSaveQuestionType}
          >
            <em className="icon ni ni-save"></em>
          </a>
        </li>
        <li class="demo-thumb">
          <a
            className="toggle tipinfo cursor_pointer"
            data-target="demoUC"
            onClick={() => navigate("/admin/question-types")}
          >
            <em className="icon ni ni-back-arrow-fill"></em>
          </a>
        </li>
      </ul>
      <div className="nk-content-inner">
        <div className="nk-content-body ">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
              <div className="nk-block-head-content">
                <h3 className="nk-block-title page-title">
                  {`${id ? "Edit" : "New"} Question Type`}
                </h3>
              </div>
            </div>
          </div>
          <div className="nk-block nk-block-lg">
            <div className="card card-bordered card-preview">
              <div className="card-inner">
                <div className="preview-block">
                  <div className="row gy-4 mb-3">
                    <div className="col-lg-4 col-xs-12">
                      <div className="form-group">
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
                  <div className="row gy-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}

EditQuestionType.propTypes = {
  id: PropTypes.number,
};

export default EditQuestionType;
