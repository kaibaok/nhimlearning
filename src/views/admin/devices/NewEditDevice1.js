import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// COMPONENTS
import {
  CButton,
  CCol,
  CRow,
  CContainer,
  CForm,
  CFormInput,
  CCard,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import CLoadingButton from "src/components/AdminComponents/commons/CLoadingButton";
import { ToastContainer, toast } from "react-toastify";
import SimpleBar from "simplebar-react";
// CSS
import "react-toastify/dist/ReactToastify.css";
//FETCH
import DevicesFetch from "src/fetch/DevicesFetch";
import TypesDeviceFetch from "src/fetch/TypesDeviceFetch";
import DeviceFuncFetch from "src/fetch/DeviceFuncFetch";
import ServicesFetch from "src/fetch/ServicesFetch";
import AreasFetch from "src/fetch/AreasFetch";

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
  const [height, setHeight] = useState(500);

  const updateWindowDimensions = () => {
    setHeight(window.innerHeight);
  };

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
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
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
    <CContainer className="clearfix">
      <ToastContainer />

      <CRow className="mb-4">
        <CCol xs="12">
          <CButton
            color="dark"
            style={{ color: "#fff", marginRight: 10 }}
            onClick={() => navigate("/admin/devices")}
          >
            Back
          </CButton>
          <CLoadingButton
            isLoading={isLoading}
            color="success"
            style={{ color: "#fff" }}
            onClick={onSaveDevice}
            labelLoading="Saving..."
            labelButton="Save"
          />
        </CCol>
      </CRow>
      <SimpleBar style={{ padding: 20, maxHeight: height - 250 }}>
        <CForm className="row">
          <CCard className="p-3">
            <CRow className="mb-3">
              <CCol lg={4} xs={12} className="mb-3">
                <CFormLabel>Name</CFormLabel>
                <CFormInput
                  placeholder="Name device"
                  value={name}
                  onChange={(event) => {
                    setName(event?.target?.value);
                  }}
                />
              </CCol>

              <CCol xs={12} lg={8}>
                <CRow>
                  <CCol lg={6} xs={8}>
                    <CFormLabel>IP Address</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="IP"
                      value={ipAddress}
                      onChange={(event) => {
                        setIPAddress(event.target.value);
                      }}
                    />
                  </CCol>
                  <CCol lg={6} xs={4}>
                    <CRow>
                      <CFormLabel>Test IP</CFormLabel>
                    </CRow>

                    <CLoadingButton
                      isLoading={checkingIP}
                      labelButton="Check IP"
                      labelLoading="Checking..."
                      onClick={() => {
                        testIP();
                      }}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol lg={4} xs={12} className="mb-3">
                <CFormLabel>Type</CFormLabel>
                <CFormSelect
                  value={typeDevice}
                  onChange={(event) => {
                    setTypeDevice(event.target.value);
                  }}
                >
                  <option>Selection...</option>
                  {types &&
                    types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
              <CCol lg={4} xs={12}>
                <CFormLabel>Function ( Default )</CFormLabel>
                <CFormSelect
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
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol lg={4} xs={12} className="mb-3">
                <CFormLabel>Area</CFormLabel>
                <CFormSelect
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
                </CFormSelect>
              </CCol>
              <CCol lg={8} xs={12}>
                <CRow className="mb-3">
                  <CCol lg={6} xs={8}>
                    <CFormLabel>IP Address Output</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="IP"
                      value={ipAddressOutput}
                      onChange={(event) => {
                        setIPAddressOutput(event.target.value);
                      }}
                    />
                  </CCol>
                  <CCol lg={6} xs={4}>
                    <CRow>
                      <CFormLabel>Test IP</CFormLabel>
                    </CRow>
                    <CLoadingButton
                      isLoading={checkingIPOutput}
                      labelButton="Check IP"
                      labelLoading="Checking..."
                      onClick={() => {
                        testIPOutput();
                      }}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol lg={4} xs={12} className="mb-3">
                <CFormLabel>Test Function Output</CFormLabel>
                <SimpleBar style={{ height: 250, marginBottom: 20 }}>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {funcs &&
                        funcs.map((func) => (
                          <CTableRow key={func.id}>
                            <CTableHeaderCell scope="row">
                              {func.name}
                            </CTableHeaderCell>
                            <CTableDataCell>
                              <CButton
                                color="info"
                                style={{ color: "#fff" }}
                                onClick={() => {
                                  testFunction(ipAddressOutput, func.action);
                                }}
                              >
                                Test
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                    </CTableBody>
                  </CTable>
                </SimpleBar>
              </CCol>
              <CCol xs={12} lg={8}>
                <CRow>
                  <CCol lg={6} xs={12}>
                    <CFormLabel>Description</CFormLabel>
                    <CFormTextarea
                      rows="10"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                      style={{ resize: "none" }}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCard>
        </CForm>
      </SimpleBar>
    </CContainer>
  );
}

export default NewEditDevice;
