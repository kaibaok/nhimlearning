import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CPlaceholder,
  CRow,
} from "@coreui/react";
import ReactImg from "../../assets/images/react.jpg";

function Card(props) {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(props.title);
    setDescription(props.description);
    setImage(props.image ?? ReactImg);
    setIsLoading(props.isLoading);
    setStatus(props.status ?? false);
  }, [props]);

  return (
    <>
      {!isLoading && (
        <CCard className="mb-4">
          <CCardImage orientation="top" src={image} />
          <CCardBody>
            <CCardTitle>{title} </CCardTitle>
            <CCardText>{description}</CCardText>
            <CRow className="justify-content-between">
              <CCol>
                {status && (
                  <CButton
                    href="#"
                    color="success"
                    size="sm"
                    style={{ color: "#fff" }}
                    onClick={props.onAction}
                  >
                    On
                  </CButton>
                )}

                {!status && (
                  <CButton
                    href="#"
                    color="danger"
                    size="sm"
                    style={{ color: "#fff" }}
                    onClick={props.onAction}
                  >
                    Off
                  </CButton>
                )}
              </CCol>

              <CCol>
                <CButton
                  href="#"
                  color="warning"
                  size="sm"
                  style={{ color: "#fff" }}
                  onClick={props.detailAction}
                >
                  Detail
                </CButton>
              </CCol>
              <CCol>
                <CButton
                  color="danger"
                  size="sm"
                  style={{ color: "#fff" }}
                  onClick={props.onDelAction}
                >
                  Del
                </CButton>
              </CCol>

              <CCol>
                <CButton
                  color="info"
                  size="sm"
                  style={{ color: "#fff" }}
                  onClick={props?.onEditAction}
                >
                  Edit
                </CButton>
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
            <title>Placeholder</title>
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
                  xs={8}
                  aria-hidden="true"
                  color="danger"
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

export default Card;
