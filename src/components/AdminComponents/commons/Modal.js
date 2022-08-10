import React from "react";
const {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} = require("@coreui/react");

export function Modal(props) {
  return (
    <CModal
      alignment="center"
      visible={props.visible}
      onClose={() => props.onClose()}
    >
      <CModalHeader>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{props.body}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.onClose()}>
          Close
        </CButton>
        <CButton color="primary" onClick={() => props.onSave()}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
