import { Button } from "../commons";

function DataTable(props) {
  return (
    <div className="container-fluid ">
      <div className="nk-content-inner">
        <div className="nk-content-body ">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
              <div className="nk-block-head-content">
                <h3 className="nk-block-title page-title">{props?.title}</h3>
              </div>

              <div className="nk-block-head-content">
                <div className="toggle-wrap nk-block-tools-toggle">
                  <div className="toggle-expand-content">
                    <ul className="nk-block-tools g-3">
                      <li>
                        <div className="form-control-wrap">
                          <div className="form-icon form-icon-right">
                            <em
                              className="icon ni ni-search"
                              onClick={(event) => {
                                props?.searchData();
                              }}
                            ></em>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Quick search by name"
                            value={props?.textSearch}
                            onChange={(event) => {
                              props?.changeTextSearch(event?.target?.value);
                            }}
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                props?.searchData();
                              }
                            }}
                          />
                        </div>
                      </li>
                      {props?.enableBtnCreate && (
                        <li className="nk-block-tools-opt">
                          <Button
                            className="btn btn-icon btn-primary d-md-none"
                            icon={<em className="icon ni ni-plus"></em>}
                            onClick={props?.onClickBtnCreate}
                          />
                          <Button
                            label={props.labelBtnCreate}
                            className="btn btn-primary"
                            icon={<em className="icon ni ni-plus"></em>}
                            onClick={props?.onClickBtnCreate}
                          />
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nk-block">
            <div className="card card-bordered">
              <div className="card-inner-group">
                <div className="card-inner p-0">
                  <div className="nk-tb-list">
                    <div className="nk-tb-item nk-tb-head">
                      {props?.columns &&
                        props?.columns.map((item, index) => (
                          <div
                            key={index}
                            className={`nk-tb-col ${
                              item.size === "sm"
                                ? "tb-col-sm"
                                : item.size === "md"
                                ? "tb-col-md"
                                : item.size === "lg"
                                ? "tb-col-lg"
                                : item.size === "tools"
                                ? "nk-tb-col-tools"
                                : ""
                            }`}
                          >
                            <span>{item.name}</span>
                            {item.sort && (
                              <em
                                role="button"
                                className={`icon ni ${
                                  props?.orderField === item.key
                                    ? props?.displayIconSort(
                                        props?.orderDirection
                                      )
                                    : "ni-sort-fill"
                                }`}
                                onClick={() =>
                                  props?.handleChangeSort(item.key)
                                }
                              />
                            )}
                          </div>
                        ))}
                    </div>
                    {!props.isLoading && <>{props?.listItems}</>}
                  </div>
                  {props.isLoading && (
                    <div className="text-center p-2">
                      <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </div>
                {props?.pagination}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DataTable;
