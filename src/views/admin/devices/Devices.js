import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// COMPONENTS
import { ToastContainer, toast } from "react-toastify";
// FETCH
import DevicesFetch from "src/fetch/DevicesFetch";
import DeviceFuncFetch from "src/fetch/DeviceFuncFetch";
import ServicesFetch from "src/fetch/ServicesFetch";
import {
  Button,
  DataTable,
  CustomModal,
} from "src/components/AdminComponents/commons";
import ListDevice from "./ListDevice";

const columns = [
  { name: "ID", size: "sm", sort: true, key: "id" },
  { name: "Name", sort: true, key: "name" },
  { name: "Ip Address", size: "sm", sort: true, key: "ip_address" },
  {
    name: "Ip Address Output",
    size: "md",
    sort: true,
    key: "ip_address_output",
  },
  { name: "Status", size: "sm", key: "status" },
  { name: "Description", size: "sm", sort: true, key: "ip_address" },
  { name: "Action", size: "tools" },
];

function Devices() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [devices, setDevices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [bodyModal, setBodyModal] = useState();
  const [device, setDevice] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderField, setOrderField] = useState("id");
  const [orderDirection, setOrderDirection] = useState("desc");

  const loadDevices = async ({
    page = 1,
    limit = 20,
    order_field = "id",
    order_direction = "desc",
    name = "",
  }) => {
    setIsLoading(true);
    await DevicesFetch.getAll({
      limit: limit,
      page: page,
      order_field: order_field,
      order_direction: order_direction,
      name: name,
      full_name: name,
    })
      .then((json) => {
        setDevices(json?.data);
        setTotalPage(json?.last_page);
        setCurrentPage(json?.current_page);
      })
      .catch((ex) => {
        console.log(ex);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadDevices({
      order_field: orderField,
      order_direction: orderDirection,
      page: 1,
      name: name,
    });
    setCurrentPage(1);
  }, [orderField, orderDirection, name]);

  const nextPage = (nextPage) => {
    loadDevices({
      name: name,
      page: nextPage,
      order_field: orderField,
      order_direction: orderDirection,
    });
  };

  const editDevice = (id) => {
    navigate("/admin/edit-device/" + id);
  };

  const createDevice = (device) => {
    if (device) {
      navigate(`/admin/new-device`);
    }
  };

  const delDevice = (item) => {
    setTitleModal("Delete " + item.name);
    setBodyModal("Are you sure ?");
    setIsVisible(true);
    setDevice(item);
  };

  const onConfirmDelAction = async () => {
    if (device) {
      await DevicesFetch.delDevice(device.id)
        .then((json) => {
          showToast("Delete Successfully", false);
        })
        .catch((ex) => {
          console.log(ex);
          showToast("Delete Failed", false);
        });
      nextPage(1);
    }
    setIsVisible(false);
    setDevice(null);
  };

  const onDefaultFuncAction = async (item) => {
    await DeviceFuncFetch.getDeviceFunc(item.func_id).then(async (json) => {
      const data = json?.data;
      await testFunction(item?.ip_address_output, data?.action);
    });
  };

  const testFunction = async (ipAddress, action) => {
    console.log(ipAddress, action);
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

  const displayIconSort = (orderDirection) => {
    if (orderDirection === "asc") return "ni-sort-up-fill";
    if (orderDirection === "desc") return "ni-sort-down-fill";
    return "ni-sort-fill";
  };

  const changeorderDirection = (direction) => {
    if (direction === "") return "desc";
    else if (direction === "asc") return "";
    return "asc";
  };

  const handleChangeSort = (fieldName) => {
    if (fieldName === orderField)
      setOrderDirection(changeorderDirection(orderDirection));
    else {
      setOrderDirection("desc");
    }
    setOrderField(fieldName);
  };

  const showPages = () => {
    let listPage = [];
    const end = currentPage + 5 > totalPage ? totalPage : currentPage + 5;
    const first = end - 5 > 0 ? end - 5 : 1;
    for (let index = first; index <= end; index++) {
      let active = index === currentPage;
      listPage.push(
        <li className={`page-item ${active ? "active" : ""}`} key={index}>
          <Button
            disabled={active}
            className="page-link"
            onClick={() => {
              nextPage(index);
            }}
            label={index}
          />
        </li>
      );
    }
    return listPage;
  };

  const pagination = () => {
    return (
      <div className="card-inner">
        <div className="nk-block-between-md g-3">
          <div className="g">
            {!isLoading && devices?.length > 0 && (
              <ul className="pagination justify-content-center justify-content-md-start">
                <li className="page-item">
                  <Button
                    className="page-link"
                    icon={<em className="icon ni ni-chevrons-left" />}
                    disabled={currentPage === 1}
                    onClick={() => {
                      nextPage(currentPage === 1 ? 1 : currentPage - 1);
                    }}
                  />
                </li>

                {showPages()}

                <li className="page-item">
                  <Button
                    className="page-link"
                    icon={<em className="icon ni ni-chevrons-right"></em>}
                    disabled={currentPage === totalPage}
                    onClick={() => {
                      nextPage(currentPage + 1);
                    }}
                  />
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };

  const makeListItems = () => {
    return (
      <ListDevice
        items={devices}
        isLoading={isLoading}
        editDevice={editDevice}
        delDevice={delDevice}
        showToast={showToast}
        onDefaultFuncAction={onDefaultFuncAction}
      />
    );
  };

  const footerDialog = () => {
    return (
      <>
        <Button
          label="Confirm Delete"
          className="btn btn-danger"
          onClick={() => onConfirmDelAction()}
        />
        <Button
          label="close"
          className="btn btn-secondary"
          onClick={() => setIsVisible(false)}
        />
      </>
    );
  };

  return (
    <>
      <ToastContainer />
      <DataTable
        title="Devices"
        labelBtnCreate="Add Device"
        columns={columns}
        enableBtnCreate={true}
        onClickBtnCreate={createDevice}
        listItems={makeListItems()}
        pagination={pagination()}
        handleChangeSort={handleChangeSort}
        orderField={orderField}
        displayIconSort={displayIconSort}
        orderDirection={orderDirection}
        textSearch={name}
        changeTextSearch={setName}
        searchData={() => {
          nextPage(1);
        }}
        isLoading={isLoading}
      />
      <CustomModal
        visible={isVisible}
        onClose={setIsVisible}
        title={titleModal}
        body={bodyModal}
        footerModal={footerDialog()}
      />
    </>
    // <CContainer className="clearfix">
    //   <ToastContainer />
    //   <CRow className="mb-4">
    //     <CCol lg={2} xs={2}>
    //       <CButton
    //         color="info"
    //         style={{ color: "#fff" }}
    //         onClick={() => navigate("/admin/new-device")}
    //       >
    //         New Device
    //       </CButton>
    //     </CCol>
    //     {isLoading && <CSpinner component="span" color="info" />}
    //   </CRow>
    //   <SimpleBar style={{ padding: 20, maxHeight: height - 300 }}>
    //     <CRow>
    //       {devices &&
    //         devices.map((item, index) => (
    //           <CCol xs={12} lg={3} key={index} className="mb-4">
    //             <CardDevice
    //               device={item}
    //               ipAddress={item.ip_address}
    //               title={item.name}
    //               description={item.description}
    //               image={ReactImg}
    //               status={item.status}
    //               onEditAction={() => {
    //                 onEditAction(item);
    //               }}
    //               onDelAction={() => {
    //                 onDelAction(item);
    //               }}
    //               onDefaultFuncAction={() => {
    //                 onDefaultFuncAction(item);
    //               }}
    //               showToast={showToast}
    //             />
    //           </CCol>
    //         ))}
    //     </CRow>
    //   </SimpleBar>
    //   {!isLoading && devices?.length > 0 && (
    //     <CPagination align="end" aria-label="Page navigation ">
    //       <CPaginationItem
    //         disabled={currentPage === 1}
    //         onClick={() => {
    //           nextPage(currentPage === 1 ? 1 : currentPage - 1);
    //         }}
    //       >
    //         <span>&laquo;</span>
    //       </CPaginationItem>
    //       {showPages()}
    //       <CPaginationItem
    //         disabled={currentPage === totalPage}
    //         onClick={() => {
    //           nextPage(currentPage + 1);
    //         }}
    //       >
    //         <span>&raquo;</span>
    //       </CPaginationItem>
    //     </CPagination>
    //   )}
    //   <Modal
    //     visible={isVisible}
    //     onClose={setIsVisible}
    //     title={titleModal}
    //     body={bodyModal}
    //     onSave={onConfirmDelAction}
    //   />
    // </CContainer>
  );
}

export default Devices;
