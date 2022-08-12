import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// COMPONENTS
import { ToastContainer, toast } from "react-toastify";
// FETCH
import AreasFetch from "../../../fetch/AreasFetch";
import ListAreas from "./ListAreas";
import { CustomModal } from "../../../components/AdminComponents/commons";
import { DataTable } from "../../../components/AdminComponents/commons";
import { Button } from "../../../components/AdminComponents/commons";

const columns = [
  { name: "ID", size: "sm", sort: true, key: "id" },
  { name: "Name", sort: true, key: "name" },
  { name: "FullName", size: "sm", sort: true, key: "full_name" },
  { name: "Action", size: "tools" },
];

function Areas(props) {
  let navigate = useNavigate();
  const [areas, setAreas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [bodyModal, setBodyModal] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [area, setArea] = useState(null);
  const [orderField, setOrderField] = useState("id");
  const [orderDirection, setOrderDirection] = useState("desc");
  const [name, setName] = useState("");

  const loadAreas = async ({
    page = 1,
    limit = 20,
    order_field = "id",
    order_direction = "desc",
    name = "",
  }) => {
    setIsLoading(true);
    await AreasFetch.getAll({
      limit: limit,
      page: page,
      order_field: order_field,
      order_direction: order_direction,
      name: name,
      full_name: name,
    })
      .then((json) => {
        setAreas(json?.data);
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
    loadAreas({
      order_field: orderField,
      order_direction: orderDirection,
      page: 1,
      name: name,
      full_name: name,
    });
    setCurrentPage(1);
  }, [orderField, orderDirection, name]);

  const nextPage = (nextPage) => {
    loadAreas({
      name: name,
      full_name: name,
      page: nextPage,
      order_field: orderField,
      order_direction: orderDirection,
    });
  };

  const createArea = () => {
    navigate("/admin/new-area");
  };

  const editArea = (id) => {
    navigate("/admin/edit-area/" + id);
  };

  const delArea = (item) => {
    setTitleModal("Delete " + item.name);
    setBodyModal("Are you sure ?");
    setIsVisible(true);
    setArea(item);
  };

  const onConfirmDelAction = async () => {
    if (area) {
      await AreasFetch.delArea(area.id)
        .then((json) => {
          showToast("Delete Successfully", false);
        })
        .catch((ex) => {
          showToast("Delete Failed", false);
        });
      nextPage(1);
    }
    setIsVisible(false);
    setArea(null);
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
            {!isLoading && areas?.length > 0 && (
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

  const makeListItems = () => {
    return (
      <ListAreas
        items={areas}
        isLoading={isLoading}
        editArea={editArea}
        delArea={delArea}
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
        title="Areas"
        labelBtnCreate="Add Area"
        columns={columns}
        enableBtnCreate={true}
        onClickBtnCreate={createArea}
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
  );
}

export default Areas;
