import React, { useEffect, useState } from "react";
import DemoFuncFetch from "../../../fetch/DemoFuncFetch";
import SimpleBar from "simplebar-react";
import {
  Button,
  CustomModal,
} from "../../../components/AdminComponents/commons";

export function ImportDemoFuncDialog(props) {
  const { onSave, onClose, typeDemoFuncs, visible, title } = props;

  const [typeDemoFunc, setTypeDemoFunc] = useState(0);
  const [demoFuncs, setDemoFuncs] = useState(null);

  useEffect(() => {
    const loadDemoFuncs = async (typeDemoFunc) => {
      const criterias = {
        type_demo_func: typeDemoFunc,
      };
      await DemoFuncFetch.getAll(criterias)
        .then((json) => setDemoFuncs(json?.data))
        .catch((ex) => console.log(ex));
    };
    if (typeDemoFuncs) {
      loadDemoFuncs(typeDemoFunc);
    }
  }, [typeDemoFuncs, typeDemoFunc]);

  const displayBody = () => {
    return (
      <div className="row mb-3">
        <div className="col-xs-12 mb-3">
          <div className="form-group">
            <label className="form-label">Area</label>
            <div className="form-control-wrap ">
              <div className="form-control-select">
                <select
                  className="form-control"
                  value={typeDemoFunc}
                  onChange={(event) => {
                    setTypeDemoFunc(event?.target?.value);
                  }}
                >
                  <option key={0} value={0}>
                    Selection...
                  </option>
                  {typeDemoFuncs &&
                    typeDemoFuncs.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="form-group">
            <label className="form-label">Function</label>
            <SimpleBar style={{ maxHeight: 300, marginBottom: 20 }}>
              <ul className="list-group">
                {demoFuncs &&
                  demoFuncs.map((item) => (
                    <li
                      className="list-group-item list-group-item-primary"
                      key={item.id}
                    >
                      {item.name}
                    </li>
                  ))}
              </ul>
            </SimpleBar>
          </div>
        </div>
      </div>
    );
  };

  const footerDialog = () => {
    return (
      <>
        <Button
          label="Import"
          onClick={() => {
            if (onSave) {
              onSave(typeDemoFunc);
              setTypeDemoFunc(0);
            }
          }}
        />
        <Button
          label="Close"
          className="btn btn-secondary"
          onClick={() => {
            if (onClose) {
              onClose(false);
            }
          }}
        />
      </>
    );
  };

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title={title}
      body={displayBody()}
      footerModal={footerDialog()}
    />
  );
}
