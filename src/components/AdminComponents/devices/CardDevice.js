import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CDropdown,
  CDropdownToggle,
  CPlaceholder,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CRow,
} from "@coreui/react";
import ReactImg from "../../../assets/images/react.jpg";
import CLoadingButton from "../commons/CLoadingButton";
import DevicesFetch from "src/fetch/DevicesFetch";
import { validateIPaddress } from "../../../lib/util";

function CardDevice(props) {
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [device, setDevice] = useState(null);

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
        if (props.showToast) {
          props.showToast("Connect Device Failed", true);
        }
      });
    setButtonLoading(false);
  };

  useEffect(() => {
    setImage(props.image ?? ReactImg);
    setDevice(props.device);
    const pingDevice = async (ip_address) => {
      setIsLoading(true);
      await DevicesFetch.pingDevice(ip_address)

        .then((json) => {
          setStatus(json?.status ?? false);
          setIsLoading(false);
        })
        .catch((ex) => {
          if (props.showToast) {
            // props.showToast(
            // `Connect ${props?.device?.name} device failed \n with IP Address:  ${ip_address}`,
            // true
            // );
          }
          setIsLoading(false);
        });
    };

    const ipAddress = props?.device?.ip_address;
    if (ipAddress && validateIPaddress(ipAddress)) {
      pingDevice(props?.device?.ip_address);
    } else {
      // console.log(ipAddress);
    }
  }, [props]);

  return (
    <>
      {!isLoading && (
        <CCard>
          <CCardImage orientation="top" src={image} />
          <CCardBody>
            <CCardTitle>{device?.name} </CCardTitle>
            <CCardText>{device?.description}</CCardText>
            <CRow className="justify-content-between">
              <CCol>
                <CLoadingButton
                  color={status ? "success" : "danger"}
                  labelButton={status === true ? "On" : "Off"}
                  className="mb-3"
                  isLoading={buttonLoading}
                  onClick={() => {
                    actionDevice(device);
                  }}
                />
              </CCol>

              <CCol>
                <>
                  <CDropdown variant="btn-group">
                    <CDropdownToggle color={"info"} className="btn-color-white">
                      Options
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={props.onDefaultFuncAction}>
                        Default Function
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => {
                          checkDevice(device);
                        }}
                      >
                        Refresh
                      </CDropdownItem>
                      <CDropdownItem onClick={props?.onEditAction}>
                        Edit
                      </CDropdownItem>

                      <CDropdownDivider />
                      <CDropdownItem onClick={props.onDelAction}>
                        Delete
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      )}
      {isLoading && (
        <CCard className="mb-4">
          <CCardImage
            component="svg"
            orientation="top"
            width="100%"
            height="162"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>{device?.name}</title>
            <rect width="100%" height="100%" fill="#868e96"></rect>
          </CCardImage>
          <CCardBody>
            <CPlaceholder component={CCardTitle} animation="glow" xs={7}>
              <CPlaceholder xs={6} />
            </CPlaceholder>
            <CPlaceholder component={CCardText} animation="glow">
              <CPlaceholder xs={7} />
              <CPlaceholder xs={4} />
              <CPlaceholder xs={4} />
              <CPlaceholder xs={6} />
              <CPlaceholder xs={8} />
            </CPlaceholder>

            <CRow className="justify-content-between">
              <CCol xs={4}>
                <CPlaceholder
                  component={CButton}
                  disabled
                  href="#"
                  tabIndex={-1}
                  xs={8}
                  color="success"
                  aria-hidden="true"
                  style={{ border: 0 }}
                />
              </CCol>

              <CCol xs={4}>
                <CPlaceholder
                  component={CButton}
                  disabled
                  href="#"
                  tabIndex={-1}
                  xs={12}
                  style={{ border: 0 }}
                  aria-hidden="true"
                  color="info"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      )}
    </>
  );
}

export default CardDevice;
