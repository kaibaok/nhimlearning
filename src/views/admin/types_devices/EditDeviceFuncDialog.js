import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CustomModal,
} from "../../../components/AdminComponents/commons";

export function EditDeviceFuncDialog(props) {
  const { deviceFunc, deviceTypeId, visible, onClose, onSave, title } = props;

  const [name, setName] = useState("");
  const [action, setAction] = useState("");

  useEffect(() => {
    if (deviceFunc) {
      setName(deviceFunc?.name ?? "");
      setAction(deviceFunc?.action ?? "");
    } else {
      setName("");
      setAction("");
    }
  }, [deviceFunc]);

  const footerDialog = () => {
    return (
      <>
        <Button
          label="Save"
          onClick={() => {
            if (onSave) {
              const idFunc = deviceFunc ? deviceFunc.id : "";
              onSave(idFunc, {
                name: name,
                action: action,
                device_type_id: deviceTypeId,
              });
            }
          }}
        />
        <Button
          label="close"
          className="btn btn-secondary"
          onClick={() => onClose()}
        />
      </>
    );
  };

  const displayBody = () => {
    return (
      <div className="row mb-3">
        <div className="col-xs-12 mb-3">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-xs-12">
          <div className="form-group">
            <label className="form-label">Function</label>
            <input
              type="text"
              className="form-control"
              value={action}
              onChange={(event) => {
                setAction(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
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

EditDeviceFuncDialog.propTypes = {
  isLoading: PropTypes.bool,
  deviceFunc: PropTypes.object,
  deviceTypeId: PropTypes.string,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};
