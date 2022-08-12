import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//FETCH
import TypesDeviceFetch from "../../../fetch/TypesDeviceFetch";
import DeviceFuncFetch from "../../../fetch/DeviceFuncFetch";
import TypeDemoFuncFetch from "../../../fetch/TypdeDemoImportFetch";
import DemoFuncFetch from "../../../fetch/DemoFuncFetch";
// COMPONENTS
import { ToastContainer, toast } from "react-toastify";
import { EditDeviceFuncDialog } from "./EditDeviceFuncDialog";
import { ImportDemoFuncDialog } from "./ImportDemoFuncDialog";
import DeviceFuncs from "./DeviceFuncs";
// CSS
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  CustomModal,
} from "../../../components/AdminComponents/commons";
import SimpleBar from "simplebar-react";

function EditTypesDevice() {
  // get query params
  let { id } = useParams();

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [typesDevice, setTypesDevice] = useState(null);
  const [deviceFuncs, setDeviceFuncs] = useState(null);
  const [titleModal, setTitleModal] = useState("title");
  const [isVisible, setIsVisible] = useState(false);
  const [deviceFunc, setDeviceFunc] = useState(null);
  const [isVisibleDelteDialog, setIsVisibleDelteDialog] = useState(false);
  const [isVisibleImportDemoDialog, setIsVisibleImportDemoDialog] =
    useState(false);
  const [typeDemoFuncs, setTypeDemoFuncs] = useState(null);

  useEffect(() => {
    if (id) loadTypesDevice(id);

    const loadTypeDemoFuncs = async () => {
      await TypeDemoFuncFetch.getAll()
        .then((json) => setTypeDemoFuncs(json?.data))
        .catch((ex) => {
          console.log(ex);
        });
    };

    loadTypeDemoFuncs();
  }, [id]);

  const loadTypesDevice = async (id) => {
    await TypesDeviceFetch.getTypesDevice(id)
      .then(async (json) => {
        const typesDevice = json?.data;
        if (typesDevice) {
          setName(typesDevice?.name);
          setTypesDevice(typesDevice);
          await DeviceFuncFetch.getAll({
            device_type_id: typesDevice.id,
          })
            .then((json) => {
              setDeviceFuncs(json?.data);
            })
            .catch((ex) => {
              console.log(ex);
            });
        }
      })
      .catch((ex) => console.log(ex));
  };

  const onSaveTypesDevice = async () => {
    setIsLoading(true);
    if (!id) {
      await TypesDeviceFetch.createTypesDevice({
        name: name,
      })
        .then((json) => {
          showToast("Create Successfully", false);
          setTimeout(() => navigate("/admin/types-device"), 1000);
        })
        .catch((ex) => {
          showToast("Create Failed", true);
        });
    } else {
      await TypesDeviceFetch.editTypesDevice(id, {
        name: name ?? "",
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

  // save create/edit function
  const onSaveEditDeviceFunc = async (idFunc, payload) => {
    // update
    if (idFunc) {
      await DeviceFuncFetch.editDeviceFunc(idFunc, payload)
        .then((json) => {
          loadTypesDevice(id);
          showToast("Edit Successfully", false);
        })
        .catch((ex) => {
          showToast("Edit Failed", true);
        });
    } else {
      await DeviceFuncFetch.createDeviceFunc(payload)
        .then((json) => {
          loadTypesDevice(id);
          showToast("Create Successfully", false);
        })
        .catch((ex) => {
          showToast("Create Failed", true);
        });
    }
    setIsVisible(false);
  };

  // save delete func
  const onSaveDeleteDeviceFunc = async () => {
    await DeviceFuncFetch.delDeviceFunc(deviceFunc?.id)
      .then((json) => {
        showToast("Delete Successfully", false);
      })
      .catch((ex) => showToast("Delete failed", true));

    setIsVisibleDelteDialog(false);
    loadTypesDevice(id);
  };

  // save import demo func
  const onSaveImportDemoFunc = async (typeDemoFunc) => {
    const criterias = {
      device_type_id: typesDevice?.id,
      type_demo_func: typeDemoFunc,
    };

    await DemoFuncFetch.importDemoFuncs(criterias)
      .then((json) => {
        showToast(json?.message, false);
        loadTypesDevice(id);
      })
      .catch((ex) => showToast("Import demo functions failed", true));

    setIsVisibleImportDemoDialog(false);
  };

  // open dialog and create
  const onOpenCreateDeviceFuncDialog = () => {
    setTitleModal("Create new function");
    setIsVisible(true);
    setDeviceFunc(null);
  };

  // open dialog and edit
  const onOpenEditDeviceFuncDialog = (deviceFunc) => {
    setDeviceFunc(deviceFunc);
    setTitleModal("Edit function");
    setIsVisible(true);
  };

  // open dialog delete
  const onDeletDeviceFuncDialog = (deviceFunc) => {
    setIsVisibleDelteDialog(true);
    setDeviceFunc(deviceFunc);
  };

  // open dialog import demo functions
  const onImportDemoFuncDialog = () => {
    setIsVisibleImportDemoDialog(true);
  };

  const showToast = (title, error) => {
    error ? toast.error(title) : toast.success(title);
  };

  const footerDialog = () => {
    return (
      <>
        <Button
          label="Delete"
          className="btn btn-danger"
          onClick={() => onSaveDeleteDeviceFunc()}
        />
        <Button
          label="close"
          className="btn btn-secondary"
          onClick={() => setIsVisibleDelteDialog(false)}
        />
      </>
    );
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
                  {`${id ? "Edit" : "New"} Types Device`}
                </h3>
              </div>
              <div className="nk-block-head-content">
                <div className="toggle-wrap nk-block-tools-toggle">
                  <div className="toggle-expand-content">
                    <ul className="nk-block-tools g-3">
                      <li className="nk-block-tools-opt">
                        <Button
                          label="Save"
                          className="btn btn-info d-none d-md-inline"
                          icon={<em className="icon ni ni-save"></em>}
                          onClick={onSaveTypesDevice}
                          disabled={isLoading}
                        />
                      </li>
                      <li className="nk-block-tools-opt">
                        <Button
                          label="Cancel"
                          className="btn btn-secondary d-none d-md-inline"
                          icon={
                            <em className="icon ni ni-back-arrow-fill"></em>
                          }
                          onClick={() => navigate("/admin/types-device")}
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
                </div>
              </div>
            </div>
          </div>
          {typesDevice && (
            <div className="nk-block">
              <div className="card card-bordered card-preview">
                <div className="card-inner">
                  <div className="row mb-3">
                    <div className="col-lg-6 col-xs-12">
                      <label className="form-label">Functions</label>
                    </div>
                    <div className="col-lg-6 col-xs-12 d-flex justify-content-end">
                      <Button
                        label="Import Sample Functions"
                        className="btn btn-secondary me-3"
                        onClick={onImportDemoFuncDialog}
                      />
                      <Button
                        label="Create new function"
                        className="btn btn-info"
                        onClick={onOpenCreateDeviceFuncDialog}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-xs-12">
                      <SimpleBar style={{ maxHeight: 500, marginBottom: 20 }}>
                        <DeviceFuncs
                          items={deviceFuncs}
                          onOpenEditDeviceFuncDialog={
                            onOpenEditDeviceFuncDialog
                          }
                          onDeletDeviceFuncDialog={onDeletDeviceFuncDialog}
                        />
                      </SimpleBar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <EditDeviceFuncDialog
        visible={isVisible}
        onClose={setIsVisible}
        title={titleModal}
        deviceFunc={deviceFunc}
        onSave={onSaveEditDeviceFunc}
        deviceTypeId={id}
      />

      <CustomModal
        visible={isVisibleDelteDialog}
        onClose={setIsVisibleDelteDialog}
        title={deviceFunc ? "Delete " + deviceFunc.name : ""}
        body={"Are you sure ?"}
        footerModal={footerDialog()}
      />

      <ImportDemoFuncDialog
        visible={isVisibleImportDemoDialog}
        onClose={setIsVisibleImportDemoDialog}
        title={"Import Sample Functions"}
        onSave={onSaveImportDemoFunc}
        typeDemoFuncs={typeDemoFuncs}
      />
    </div>
  );
}

export default EditTypesDevice;
