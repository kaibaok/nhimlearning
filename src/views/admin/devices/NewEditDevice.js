import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
//FETCH
import DevicesFetch from "src/fetch/DevicesFetch";
import TypesDeviceFetch from "src/fetch/TypesDeviceFetch";
import DeviceFuncFetch from "src/fetch/DeviceFuncFetch";
import ServicesFetch from "src/fetch/ServicesFetch";
import AreasFetch from "src/fetch/AreasFetch";
// COMPONENTS
import { ToastContainer, toast } from "react-toastify";
import SimpleBar from "simplebar-react";

// CSS
import "react-toastify/dist/ReactToastify.css";
import { Button, LoadingButton } from "src/components/AdminComponents/commons";

function NewEditDevice() {
  // get query params
  let { id } = useParams();

  let navigate = useNavigate();
  const [checkingIP, setCheckingIP] = useState(false);
  const [checkingIPOutput, setCheckingIPOutput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [ipAddress, setIPAddress] = useState("");
  const [ipAddressOutput, setIPAddressOutput] = useState("");
  const [description, setDescription] = useState("");
  const [funcID, setFuncID] = useState(0);
  const [areaID, setAreaID] = useState(0);
  const [typeDevice, setTypeDevice] = useState(0);
  const [device, setDevice] = useState(0);

  const [types, setTypes] = useState(null);
  const [funcs, setFuncs] = useState(null);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    const loadTypesDevice = async () => {
      await TypesDeviceFetch.getAll()
        .then((json) => {
          const types = json?.data;
          setTypes(types);
        })
        .catch((ex) => console.log("error load type device : ", ex));
    };

    const loadAreas = async () => {
      await AreasFetch.getAll()
        .then((json) => {
          setAreas(json?.data);
        })
        .catch((ex) => {
          console.log("error load areas ", ex);
        });
    };

    loadTypesDevice();
    loadAreas();
  }, []);

  useEffect(() => {
    const loadDevice = async (id) => {
      await DevicesFetch.getDevice(id)
        .then((json) => {
          const data = json?.data;
          setDevice(data);
          if (data) {
            setName(data?.name);
            setIPAddress(data?.ip_address);
            setTypeDevice(data?.device_type);
            setFuncID(data?.func_id);
            setDescription(data?.description);
            setIPAddressOutput(data?.ip_address_output);
            setAreaID(data?.area_id);
          }
        })
        .catch((ex) => console.log(ex));
    };

    if (id) loadDevice(id);
  }, [id]);

  useEffect(() => {
    const loadDeviceFunc = async (criterias) => {
      await DeviceFuncFetch.getAll(criterias)
        .then((json) => {
          setFuncs(json?.data);
        })
        .catch((ex) => console.log(ex));
    };

    if (typeDevice) {
      loadDeviceFunc({ device_type_id: typeDevice });
    }
  }, [typeDevice, setTypeDevice, device]);

  const testIP = async () => {
    setCheckingIP(true);
    if (ipAddress) {
      await DevicesFetch.pingDevice(ipAddress)
        .then((json) => {
          showToast("IP DEVICE WORK", false);
        })
        .catch((ex) => {
          showToast("IP DEVICE NOT WORK", true);
        });
    }
    setCheckingIP(false);
  };

  const testIPOutput = async () => {
    setCheckingIPOutput(true);
    if (ipAddressOutput) {
      await DevicesFetch.pingDevice(ipAddressOutput)
        .then((json) => {
          showToast("IP DEVICE WORK", false);
        })
        .catch((ex) => {
          showToast("IP DEVICE NOT WORK", true);
        });
    }
    setCheckingIPOutput(false);
  };

  const onSaveDevice = async () => {
    setIsLoading(true);
    if (!id) {
      await DevicesFetch.createDevice({
        name: name,
        device_type: typeDevice,
        func_id: funcID,
        ip_address: ipAddress,
        description: description,
        ip_address_output: ipAddressOutput,
        area_id: areaID,
      })
        .then((json) => {
          showToast("Create Successfully", false);
          setTimeout(() => navigate("/admin/devices"), 1000);
        })
        .catch((ex) => {
          showToast("Create Failed", true);
        });
    } else {
      await DevicesFetch.editDevice(id, {
        name: name ?? "",
        device_type: typeDevice ?? 0,
        func_id: funcID ?? 0,
        ip_address: ipAddress ?? 0,
        description: description ?? "",
        ip_address_output: ipAddressOutput ?? "",
        area_id: areaID ?? 0,
      })
        .then((json) => {
          showToast("Edit Successfully", false);
        })
        .catch((ex) => {
          showToast("Edit Failed", true);
        });
    }
    setIsLoading(false);
  };

  const testFunction = async (ipAddress, action) => {
    if (ipAddress && action) {
      await ServicesFetch.testFunc({
        ip_address: ipAddress,
        action: action,
      })
        .then((json) => {
          // showToast("Test Func Successfully", false);
        })
        .catch((ex) => {
          console.log(ex);
          showToast("Test Func failed", true);
        });
    } else {
      showToast("Test Func failed", true);
    }
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
                  {`${id ? "Edit" : "New"} Device`}
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
                          onClick={onSaveDevice}
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
                          onClick={() => navigate("/admin/devices")}
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
                    <div className="col-lg-4 col-xs-12 mb-3">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        placeholder="Name device"
                        value={name}
                        onChange={(event) => {
                          setName(event?.target?.value);
                        }}
                      />
                    </div>

                    <div className="col-lg-8 col-xs-12">
                      <div className="row">
                        <div className="col-lg-6 col-xs-8 mb-3">
                          <label className="form-label">IP Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={ipAddress}
                            onChange={(event) => {
                              setIPAddress(event.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-6 col-xs-4">
                          <div>
                            <label className="form-label me-3">Test IP</label>
                          </div>
                          <LoadingButton
                            isLoading={checkingIP}
                            label="Check IP"
                            labelLoading="Checking..."
                            onClick={() => {
                              testIP();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-4 col-xs-12 mb-3">
                      <label className="form-label">Type</label>
                      <div className="form-control-select">
                        <select
                          className="form-control"
                          value={typeDevice}
                          onChange={(event) => {
                            setTypeDevice(event.target.value);
                          }}
                        >
                          {types &&
                            types.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-xs-12">
                      <label className="form-label">Function ( Default )</label>
                      <div className="form-control-select">
                        <select
                          className="form-control"
                          value={funcID}
                          onChange={(event) => {
                            setFuncID(event.target.value);
                          }}
                        >
                          <option>Selection...</option>
                          {funcs &&
                            funcs.map((func) => (
                              <option key={func.id} value={func.id}>
                                {func.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4 col-xs-12 mb-3">
                      <label className="form-label">Area</label>
                      <div className="form-control-select">
                        <select
                          className="form-control"
                          value={areaID}
                          onChange={(event) => {
                            setAreaID(event.target.value);
                          }}
                        >
                          <option>Selection...</option>
                          {areas &&
                            areas.map((area) => (
                              <option key={area.id} value={area.id}>
                                {area?.full_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-8 col-xs-12 mb-3">
                      <div className="row mb-3">
                        <div className="col-lg-6 col-xs-8 mb-3">
                          <label className="form-label">Area</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="IP"
                            value={ipAddressOutput}
                            onChange={(event) => {
                              setIPAddressOutput(event.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-6 col-xs-4">
                          <div>
                            <label className="form-label me-3">Test IP</label>
                          </div>
                          <LoadingButton
                            isLoading={checkingIPOutput}
                            label="Check IP"
                            labelLoading="Checking..."
                            onClick={() => {
                              testIPOutput();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4 col-xs-12 mb-3">
                      <label className="form-label">Test Function Output</label>
                      <SimpleBar style={{ height: 250, marginBottom: 20 }}>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {funcs &&
                              funcs.map((func, index) => (
                                <tr key={func.id}>
                                  <th scope="row">{func.name}</th>
                                  <td>
                                    <Button
                                      label="Test"
                                      className="btn btn-info"
                                      onClick={() => {
                                        testFunction(
                                          ipAddressOutput,
                                          func.action
                                        );
                                      }}
                                    />
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </SimpleBar>
                    </div>
                    <div className="col-lg-8 col-xs-12">
                      <div className="row">
                        <div className="col-lg-6 col-xs-12">
                          <label className="form-label">Description</label>
                          <textarea
                            rows="10"
                            className="form-control"
                            value={description}
                            onChange={(event) => {
                              setDescription(event.target.value);
                            }}
                            style={{ resize: "none" }}
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

NewEditDevice.propTypes = {
  id: PropTypes.number,
};

export default NewEditDevice;
