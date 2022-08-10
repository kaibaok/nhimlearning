import React, { useEffect, useState } from "react";
// FETCH
import FilesFetch from "src/fetch/FilesFetch";
// CSS
import "react-tabs/style/react-tabs.css";
// CONFIG
import AppConfig from "src/AppConfig";
// COMPONENTS
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Card,
  LoadingButton,
} from "src/components/AdminComponents/commons";

function Media(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imagesDelete, setImagesDelete] = useState([]);
  const [videosDelete, setVideosDelete] = useState([]);
  const { fileSelected, onFileSelected } = props;

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": ["png", "jpeg", "jpg", "gif"],
      "video/*": ["mp4"],
    },
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  const uploadFiles = async () => {
    setIsLoading(true);
    setTimeout(function () {}, 500);

    let formData = new FormData();
    for (var index = 0; index < files.length; index++) {
      formData.append("file" + index, files[index]);
    }

    await FilesFetch.upload(formData)
      .then((json) => {
        showToast(json?.message, false);
      })
      .catch((ex) => {
        showToast("Upload failed", true);
      });

    setIsLoading(false);
    setFiles([]);
    refetchMedia();
  };

  const loadListImages = async () => {
    await FilesFetch.listImages()
      .then((json) => {
        setImages(json?.images);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const loadListVideos = async () => {
    await FilesFetch.listVideos()
      .then((json) => {
        setVideos(json?.videos);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const removeItem = (index) => {
    var newFiles = [...files];
    if (index !== -1) {
      newFiles.splice(index, 1);
      setFiles(newFiles);
    }
  };

  const deleteItems = async (items) => {
    if (items.length > 0) {
      await FilesFetch.deleteItems({ files: items })
        .then((json) => {
          showToast(json?.message, false);
          refetchMedia();
          setImagesDelete([]);
          setVideosDelete([]);
        })
        .catch((ex) => {
          showToast("Delete files failed", true);
        });
    }
  };

  const thumbs = files.map((file, index) => (
    <div className="col-xs-12 col-lg-3 col-md-4 mb-3" key={"thumb" + index}>
      <Card
        className="p-2"
        image={file.type !== "video/mp4" ? URL.createObjectURL(file) : ""}
        video={
          file.type === "video/mp4" && file ? URL.createObjectURL(file) : ""
        }
        closeButton={true}
        onClickCloseButton={() => removeItem(index)}
      />
    </div>
  ));

  const onImagesDelete = (status, item) => {
    let selectedImages = imagesDelete;
    if (status) {
      selectedImages.push(item);
    } else {
      const index = selectedImages.indexOf(item);
      if (index !== -1) {
        selectedImages.splice(index, 1);
      }
    }
    setImagesDelete([...selectedImages]);
  };

  const onVideosDelete = (status, item) => {
    let selectedVideos = videosDelete;
    if (status) {
      selectedVideos.push(item);
    } else {
      const index = selectedVideos.indexOf(item);
      if (index !== -1) {
        selectedVideos.splice(index, 1);
      }
    }
    setVideosDelete([...selectedVideos]);
  };

  const showImages = (images) => {
    return (
      images &&
      images.map((item, index) => (
        <div className="col-xs-12 col-lg-3 col-md-4 mb-3" key={"image" + index}>
          <Card
            className={`p-2 ${fileSelected === item ? "bg-warning" : ""}`}
            onClick={(event) => {
              if (onFileSelected) {
                if (fileSelected !== "" && fileSelected === item) {
                  onFileSelected("");
                } else {
                  onFileSelected(item);
                }
              }
            }}
            checkButton={true}
            onChange={(event) => onImagesDelete(event?.target?.checked, item)}
            isChecked={imagesDelete.includes(item) ? true : false}
            image={AppConfig.storageUrl + item}
            closeButton={true}
            onClickCloseButton={() => deleteItems([item])}
          />
        </div>
      ))
    );
  };

  const showVideos = (videos) => {
    return (
      videos &&
      videos.map((item, index) => (
        <div className="col-xs-12 col-lg-3 col-md-4 mb-3" key={"video" + index}>
          <Card
            className="p-2"
            checkButton={true}
            onChange={(event) => {
              onVideosDelete(event?.target?.checked, item);
            }}
            isChecked={videosDelete.includes(item) ? true : false}
            closeButton={true}
            onClickCloseButton={() => deleteItems([item])}
            video={item ? AppConfig.storageUrl + item : ""}
          />
        </div>
      ))
    );
  };

  const showButton = (tabIndex) => {
    if (tabIndex === 0) {
      return (
        <>
          <LoadingButton
            style={{ position: "absolute", right: 0, top: -5, zIndex: 100 }}
            label="Upload Files"
            labelLoading="Uploading..."
            isLoading={isLoading}
            disabled={files?.length > 0 ? false : true}
            onClick={() => {
              uploadFiles();
            }}
          />
          <Button
            className="btn btn-warning"
            style={{
              position: "absolute",
              right: 150,
              top: -5,
            }}
            onClick={() => {
              setFiles([]);
            }}
            disabled={files?.length > 0 ? false : true}
            label="Clear"
          />
        </>
      );
    } else if (tabIndex === 1) {
      return (
        <Button
          className="btn btn-danger"
          style={{ position: "absolute", right: 0, top: -5 }}
          onClick={() => {
            deleteItems(imagesDelete);
          }}
          label="Delete Images"
        />
      );
    } else {
      return (
        <Button
          className="btn btn-danger"
          style={{ position: "absolute", right: 0, top: -5 }}
          onClick={() => {
            deleteItems(videosDelete);
          }}
          label="Delete Video"
        />
      );
    }
  };

  const showToast = (title, error) => {
    error ? toast.error(title) : toast.success(title);
  };

  function refetchMedia() {
    loadListImages();
    loadListVideos();
  }

  useEffect(() => {
    loadListImages();
    loadListVideos();
  }, []);
  return (
    <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <ToastContainer />

      <TabList style={{ position: "relative" }}>
        <Tab>Add New</Tab>
        <Tab>Images</Tab>
        <Tab>Videos</Tab>
        {showButton(tabIndex)}
      </TabList>
      <TabPanel>
        <Card
          getProps={getRootProps({ className: "dropzone mb-3" })}
          body={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
                padding: "40px 0",
              }}
            >
              <input {...getInputProps()} /> Drag & drop some files here, or
              click to select files
            </div>
          }
        />
        <div className="row">{thumbs}</div>
      </TabPanel>
      <TabPanel>
        <div className="row">{showImages(images)}</div>
      </TabPanel>
      <TabPanel>
        <div className="row">{showVideos(videos)}</div>
      </TabPanel>
    </Tabs>
  );
}

export default Media;
