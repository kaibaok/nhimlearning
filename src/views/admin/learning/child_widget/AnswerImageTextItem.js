import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// COMPONENTS
import { MediaDialog } from "../../../widgets/media/MediaDialog";
import AppConfig from "../../../../AppConfig";
import { Button } from "../../../../components/AdminComponents/commons";

function AnswerImageTextItem(props) {
  const { answer, index, editAnswer, removeAnswer } = props;
  const [isVisible, setIsVisible] = useState(false);
  const isExternalImge = answer?.is_external_image ? true : false;

  const imagePreview =
    isExternalImge === true
      ? answer?.image
      : AppConfig.storageUrl + answer?.image;

  const openMedia = () => {
    setIsVisible(true);
  };

  const closeMedia = () => {
    setIsVisible(false);
  };

  const onFileSelected = (item) => {
    if (editAnswer) {
      editAnswer(item, index, "image");
    }
  };

  useEffect(() => {
    if (editAnswer && answer?.image) {
      if (answer?.image.substring(0, 6) === "images") {
        editAnswer(false, index, "is_external_image");
      } else {
        editAnswer(true, index, "is_external_image");
      }
    }
  }, [editAnswer, answer, index]);

  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-lg-4 col-md-12">
          <div className="row mb-3">
            <div className="col-xs-12 col-lg-12">
              <label className="form-label">Image name {index + 1}</label>

              <input
                className="form-control"
                placeholder="Name"
                value={answer?.name ?? ""}
                onChange={(event) => {
                  editAnswer(event?.target?.value, index, "name");
                }}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-xs-12 col-lg-12">
              <label className="form-label">Image</label>
            </div>
            <div className="col-xs-12 col-lg-8 mb-3">
              <input
                className="form-control"
                placeholder="Url"
                value={answer?.image ?? ""}
                onChange={(event) => {
                  editAnswer(event?.target?.value, index, "image");
                }}
              />
            </div>
            <div className="col-xs-12 col-lg-4">
              <Button
                onClick={() => {
                  openMedia();
                }}
                label="Browse"
              />
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-2">
          <div className="row">
            <label className="form-label">Image</label>
            <div
              className="col-xs-12 col-lg-12 mb-3"
              style={{ margin: "auto" }}
            >
              {imagePreview && (
                <img
                  className="thumb border rounded"
                  src={imagePreview}
                  alt={imagePreview}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 mb-3">
          <label className="form-label">Questions</label>
          <textarea
            className="form-control no-resize"
            rows="6"
            value={answer?.questions ?? ""}
            onChange={(event) => {
              editAnswer(event?.target?.value, index, "questions");
            }}
          />
        </div>
        <div className="col-xs-12 col-lg-3 col-md-12 mb-3">
          <label className="form-label">Answers</label>
          <div className="row">
            <div className="col-lg-10">
              <textarea
                className="form-control no-resize"
                rows="6"
                value={answer?.answers ?? ""}
                onChange={(event) => {
                  editAnswer(event?.target?.value, index, "answers");
                }}
              />
            </div>
            <div className="col-lg-2">
              <em
                role="button"
                className="icon ni ni-cross-circle fs-2 text-danger"
                onClick={() => {
                  removeAnswer(index);
                }}
              ></em>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-12 mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control no-resize"
            rows="2"
            value={answer?.description ?? ""}
            onChange={(event) => {
              editAnswer(event?.target?.value, index, "description");
            }}
          />
        </div>
      </div>
      <MediaDialog
        title="Media"
        visible={isVisible}
        onClose={closeMedia}
        fileSelected={answer?.image ?? ""}
        onFileSelected={onFileSelected}
      />
    </>
  );
}

AnswerImageTextItem.propTypes = {
  answer: PropTypes.object,
  index: PropTypes.number,
  editAnswer: PropTypes.func,
  removeAnswer: PropTypes.func,
};

export default AnswerImageTextItem;
