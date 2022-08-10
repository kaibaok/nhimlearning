import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// FETCH
import QuestionTypeFetch from "src/fetch/QuestionTypeFetch";
// COMPONENTS
import { ToastContainer, toast } from "react-toastify";
import {
  DataTable,
  Button,
  CustomModal,
} from "src/components/AdminComponents/commons";
import ListQuestionTypes from "./ListQuestionTypes";

const columns = [
  { name: "ID", size: "sm", sort: true, key: "id" },
  { name: "Name", sort: true, key: "name" },
  { name: "Description", size: "md", sort: true, key: "description" },
  { name: "Action", size: "tools" },
];

function QuestionTypeAdmin(props) {
  let navigate = useNavigate();
  const [questionTypes, setQuestionTypes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [bodyModal, setBodyModal] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionType, setQuestionType] = useState(null);
  const [orderField, setOrderField] = useState("id");
  const [orderDirection, setOrderDirection] = useState("desc");
  const [name, setName] = useState("");

  const loadQuestionTypes = async ({
    page = 1,
    limit = 20,
    order_field = "id",
    name = "",
    order_direction = "desc",
  }) => {
    setIsLoading(true);
    await QuestionTypeFetch.getAll({
      limit: limit,
      page: page,
      order_field: order_field,
      order_direction: order_direction,
      name: name,
    })
      .then((json) => {
        setQuestionTypes(json?.data);
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
    loadQuestionTypes({
      order_field: orderField,
      order_direction: orderDirection,
      page: 1,
      name: name,
    });
    setCurrentPage(1);
  }, [orderField, orderDirection, name]);

  const nextPage = (nextPage) => {
    loadQuestionTypes({
      name: name,
      page: nextPage,
      order_field: orderField,
      order_direction: orderDirection,
    });
  };

  const createQuestionType = () => {
    navigate("/admin/new-question-type");
  };

  const editQuestionType = (id) => {
    navigate("/admin/edit-question-type/" + id);
  };

  const delQuestionType = (item) => {
    setTitleModal("Delete " + item.name);
    setBodyModal("Are you sure ?");
    setIsVisible(true);
    setQuestionType(item);
  };

  const onConfirmDelAction = async () => {
    if (questionType) {
      await QuestionTypeFetch.delQuestionType(questionType.id)
        .then((json) => {
          showToast("Delete Successfully", false);
        })
        .catch((ex) => {
          showToast("Delete Failed", false);
        });
      nextPage(1);
    }
    setIsVisible(false);
    setQuestionType(null);
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
            {!isLoading && questionTypes?.length > 0 && (
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
      <ListQuestionTypes
        items={questionTypes}
        isLoading={isLoading}
        editQuestionType={editQuestionType}
        delQuestionType={delQuestionType}
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
        title="Question Types"
        labelBtnCreate="Add Type"
        columns={columns}
        enableBtnCreate={true}
        onClickBtnCreate={createQuestionType}
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

export default QuestionTypeAdmin;
