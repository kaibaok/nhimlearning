import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
// FETCH
import AreasFetch from "../../../fetch/AreasFetch";
// CSS
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../../components/AdminComponents/commons";
import { ToastContainer, toast } from "react-toastify";

function EditArea() {
  // get query params
  let { id } = useParams();

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const loadArea = async (id) => {
      await AreasFetch.getArea(id)
        .then((json) => {
          const area = json?.data;
          if (area) {
            setName(area?.name);
            setFullName(area?.full_name);
          }
        })
        .catch((ex) => console.log(ex));
    };

    if (id) loadArea(id);
  }, [id]);

  const onSaveArea = async () => {
    setIsLoading(true);
    if (!id) {
      await AreasFetch.createArea({
        name: name,
        full_name: fullName,
      })
        .then((json) => {
          showToast("Create Successfully", false);
          setTimeout(() => navigate("/admin/areas"), 1000);
        })
        .catch((ex) => {
          showToast("Create Failed", true);
          console.log(ex);
        });
    } else {
      await AreasFetch.editArea(id, {
        name: name ?? "",
        full_name: fullName ?? "",
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
      <div className="nk-content-inner">
        <div className="nk-content-body ">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
              <div className="nk-block-head-content">
                <h3 className="nk-block-title page-title">
                  {`${id ? "Edit" : "New"} Area`}
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
                          onClick={onSaveArea}
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
                          onClick={() => navigate("/admin/areas")}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
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
                        <label className="form-label">Full Name</label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            value={fullName}
                            onChange={(event) => {
                              setFullName(event?.target?.value);
                            }}
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

EditArea.propTypes = {
  id: PropTypes.number,
};

export default EditArea;
