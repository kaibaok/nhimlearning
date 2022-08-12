import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingButton } from "../../../components/AdminComponents/commons";
import DevicesFetch from "../../../fetch/DevicesFetch";
import { validateIPaddress } from "../../../lib/util";

function ListDeviceItem(props) {
  const { editDevice, delDevice, showToast, onDefaultFuncAction } = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [device, setDevice] = useState(null);
  const [visible, setIsVisible] = useState(false);

  const checkDevice = async (device) => {
    const ipAddress = device.ip_address;
    if (ipAddress) {
      setButtonLoading(true);
      await DevicesFetch.pingDevice(ipAddress)
        .then((json) => setStatus(json?.status ?? false))
        .catch((ex) => setStatus(false));
      setButtonLoading(false);
    }
  };

  const actionDevice = async (device) => {
    const idDevice = device.id;
    setButtonLoading(true);

    await DevicesFetch.actionDevice(idDevice, {
      action: status ? "off" : "on",
    })
      .then((json) => {
        setStatus(json?.status ?? false);
      })
      .catch((ex) => {
        if (showToast) {
          showToast("Connect Device Failed", true);
        }
      });
    setButtonLoading(false);
  };

  useEffect(() => {
    setDevice(props.device);
    const pingDevice = async (ip_address) => {
      await DevicesFetch.pingDevice(ip_address)
        .then((json) => {
          setStatus(json?.status ?? false);
        })
        .catch((ex) => {
          if (props.showToast) {
          }
        });
    };

    const ipAddress = props?.device?.ip_address;
    if (ipAddress && validateIPaddress(ipAddress)) {
      pingDevice(props?.device?.ip_address);
    }
  }, [props]);

  return (
    <div className="nk-tb-item">
      <div className="nk-tb-col tb-col-sm">
        <div className="tb-sub">
          <span className="tb-sub">{device?.id}</span>
        </div>
      </div>
      <div className="nk-tb-col tb-col-sm">
        <span className="tb-product">
          <span className="title">{device?.name}</span>
        </span>
      </div>
      <div className="nk-tb-col tb-col-sm">
        <div className="tb-sub">
          <span className="tb-sub">{device?.ip_address}</span>
        </div>
      </div>
      <div className="nk-tb-col tb-col-sm">
        <div className="tb-sub">
          <span className="tb-sub">{device?.ip_address_output}</span>
        </div>
      </div>
      <div className="nk-tb-col tb-col-sm">
        <div className="tb-sub">
          <span className="m-2">
            <LoadingButton
              color={status ? "success" : "danger"}
              label={status === true ? "On" : "Off"}
              className={`btn ${status ? "btn-success" : "btn-danger"}`}
              labelLoading={"Checking..."}
              isLoading={buttonLoading}
              onClick={() => {
                actionDevice(device);
              }}
            />
          </span>

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsVisible(true)}
            >
              Action
            </button>
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              onClick={() => setIsVisible(true)}
            >
              <em className="icon ni ni-chevron-down"></em>
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <div className={`dropdown-menu ${visible ? "show" : ""}`}>
              <ul className="link-list-opt no-bdr">
                <li>
                  <Link
                    to=""
                    onClick={() => {
                      checkDevice(device);
                      setIsVisible(false);
                    }}
                  >
                    Refresh
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    onClick={() => {
                      onDefaultFuncAction(device);
                      setIsVisible(false);
                    }}
                  >
                    Default Function
                  </Link>
                </li>
                <li className="divider"></li>
                <li>
                  <Link to="" onClick={() => setIsVisible(false)}>
                    Cancel
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="nk-tb-col">
        <span className="tb-sub">
          {device?.description && device?.description.length > 30
            ? device?.description.substring(0, 30) + "..."
            : device?.description}
        </span>
      </div>
      <div className="nk-tb-col nk-tb-col-tools">
        <span className="tb-sub">
          <em
            role="button"
            className="icon ni ni-edit"
            style={{ marginRight: 10 }}
            onClick={() => {
              if (editDevice) editDevice(device?.id);
            }}
          />
          |
          <em
            role="button"
            className="icon ni ni-trash"
            style={{ marginLeft: 10 }}
            onClick={() => {
              if (delDevice) delDevice(device);
            }}
          />
        </span>
      </div>
    </div>
  );
}
export default ListDeviceItem;
