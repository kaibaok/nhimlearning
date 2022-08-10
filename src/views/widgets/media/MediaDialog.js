import React, { useState } from "react";
import Media from "./Media";
import { Button, CustomModal } from "src/components/AdminComponents/commons";

export function MediaDialog(props) {
  const { visible, title, onFileSelected, onClose } = props;

  const [file, setFile] = useState("");

  const footerDialog = () => {
    return (
      <>
        <Button
          label="Choose"
          className="btn btn-info"
          onClick={() => {
            if (onFileSelected) {
              onFileSelected(file);
            }

            if (onClose) {
              onClose();
            }
          }}
        />
        <Button
          label="Cancel"
          className="btn btn-secondary"
          onClick={() => {
            setFile("");
            if (onFileSelected) {
              onFileSelected("");
            }
            if (onClose) {
              onClose();
            }
          }}
        />
      </>
    );
  };

  return (
    <CustomModal
      visible={visible}
      onClose={() => {
        if (onClose) {
          onClose();
        }
      }}
      title={title}
      body={<Media onFileSelected={setFile} fileSelected={file} />}
      footerModal={footerDialog()}
      size="lg"
      fullscreen={true}
    />
  );
}
