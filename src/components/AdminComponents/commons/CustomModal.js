import React from "react";
import Modal from "react-bootstrap/Modal";

export default function CustomModal(props) {
  return (
    <Modal
      size={props.size ?? "md"}
      fullscreen={props.fullscreen ?? false}
      show={props?.visible}
      onHide={() => props?.onClose()}
    >
      <Modal.Header>
        <Modal.Title>{props?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props?.body}</Modal.Body>
      <Modal.Footer>{props?.footerModal}</Modal.Footer>
    </Modal>
  );
}
