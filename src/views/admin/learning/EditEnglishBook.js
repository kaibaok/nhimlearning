import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
//FETCH
import LessonFetch from "../../../fetch/LessonFetch";
import EnglishBookDetailsFetch from "../../../fetch/EnglishBookDetailsFetch";
import EnglishBookFetch from "../../../fetch/EnglishBookFetch";
// COMPONENTS
import { ToastContainer, toast } from "react-toastify";
import GroupLesson from "./child_widget/GroupLesson";
import AppConfig from "../../../AppConfig";
import { MediaDialog } from "../../../views/widgets/media/MediaDialog";
import { Button } from "../../../components/AdminComponents/commons";

function EditEnglishBook() {
  // get query params
  let { id } = useParams();

  let navigate = useNavigate();
  const [, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [orderNumber, setOrderNumber] = useState(0);
  const [height, setHeight] = useState(500);
  const [listLessons, setListLessons] = useState([]);
  const [listLessonsChosen, setListLessonsChosen] = useState([]);
  const [lessonName, setLessonName] = useState("");
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
    loadLessons();
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  async function loadLessons(name = "") {
    await LessonFetch.getAll({ name: name }).then((json) => {
      setListLessons(json?.data);
    });
  }

  const handleChangeLessonName = async (name) => {
    setLessonName(name);
    await loadLessons(name);
  };

  const addLesson = (lesson) => {
    setListLessonsChosen([...listLessonsChosen, lesson]);
  };

  const removeLesson = (index) => {
    let lessons = listLessonsChosen;
    if (index !== -1) {
      lessons.splice(index, 1);
      setListLessonsChosen([...lessons]);
    }
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

  const loadEnglishBook = async (id) => {
    await EnglishBookFetch.getEnglishBook(id)
      .then(async (json) => {
        const book = json?.data;
        if (book) {
          setName(book?.name);
          setDescription(book?.description ?? "");
          setImage(book?.image ?? "");
          setOrderNumber(book?.order_number ?? 0);

          await EnglishBookDetailsFetch.getAll({ english_book_id: book?.id })
            .then((jsonD) => {
              const englishBookDetails = jsonD?.data;
              let details = [];
              if (englishBookDetails) {
                details = englishBookDetails.map((item) => {
                  return item?.lesson;
                });
              }
              setListLessonsChosen(details);
            })
            .catch((exD) => console.log(exD));
        }
      })
      .catch((ex) => console.log(ex));
  };

  useEffect(() => {
    if (id) loadEnglishBook(id);
  }, [id]);

  const onSaveEnglishBook = async () => {
    setIsLoading(true);
    if (!id) {
      await EnglishBookFetch.createEnglishBook({
        name: name,
        description: description,
        lessons: listLessonsChosen,
        image: image,
        order_number: orderNumber,
      })
        .then((json) => {
          showToast("Create Successfully", false);
          setTimeout(() => navigate("/admin/english-books"), 1000);
        })
        .catch((ex) => {
          showToast("Create Failed", true);
        });
    } else {
      await EnglishBookFetch.editEnglishBook(id, {
        name: name ?? "",
        description: description ?? "",
        lessons: listLessonsChosen,
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

  const showToast = (title, error) => {
    error ? toast.error(title) : toast.success(title);
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <ul class="nk-sticky-toolbar">
        <li class="demo-layout">
          <a
            className="toggle tipinfo cursor_pointer"
            onClick={onSaveEnglishBook}
          >
            <em className="icon ni ni-save"></em>
          </a>
        </li>
        <li class="demo-thumb">
          <a
            className="toggle tipinfo cursor_pointer"
            data-target="demoUC"
            onClick={() => navigate("/admin/english-books")}
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
                  {`${id ? "Edit" : "New"} English Book`}
                </h3>
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
                <GroupLesson
                  maxHeight={height}
                  listLessons={listLessons}
                  listLessonsChosen={listLessonsChosen}
                  addLesson={addLesson}
                  removeLesson={removeLesson}
                  lessonName={lessonName}
                  setLessonName={handleChangeLessonName}
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

EditEnglishBook.propTypes = {
  id: PropTypes.number,
};

export default EditEnglishBook;
