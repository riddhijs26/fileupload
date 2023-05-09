import React, { useEffect, useState } from "react";
import "./FileUpload.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUpload,
  faFileText,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SubmitDialog from "../SubmitDialog/SubmitDialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileUpload = ({ files, setFiles }) => {
  const [submitOpen, setsubmitOpen] = React.useState(false);

  const CustodianSubmited = () => {
    setFiles([]);
  };

  const handleClose = () => {
    setsubmitOpen(false);
  };

  const handleClickOpen = () => {
    let anyLoading = false;
    files.forEach((value) => {
      if (value.isUploading) {
        anyLoading = true;
      }
    });
    if (anyLoading) {
      toast("Wait for all file to upload in Folder!!", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    if (!anyLoading) {
      setsubmitOpen(true);
    }
  };

  const postData = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/fileupload", data);
      if (res) {
        data.forEach((file) => (file.isUploading = false));
        setFiles([...files, ...data]);
        console.log(files);
      }
    } catch (err) {
      console.error(err);
      const removeFiles = Object.values(data).map((val) => val.name);
      removeFiles.forEach((e) => removeFile(e));
    }
  };

  const removeFile = (uploadedFiles) => {
    const removedfiles = files.filter((e) => uploadedFiles != e.name);
    setFiles(removedfiles);
  };

  const uploadHandler = (event) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const allfiles = Object.values(files).map((val) => val.name);
    const uploadedFiles = Object.entries(selectedFiles)
      .filter(function ([k, v]) {
        return allfiles.indexOf(v.name) < 0;
      })
      .map(([k, v]) => v);
    if (uploadedFiles.length > 0) {
      uploadedFiles.map((file) => (file.isUploading = true));
      setFiles([...files, ...uploadedFiles]);
      postData(uploadedFiles);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="">
        {files.length === 0 && (
          <div className="file-inputs">
            <input type="file" onChange={uploadHandler} multiple />
            <p class="pointer-none">
              <i>
                <FontAwesomeIcon size="6x" icon={faFileText} />
              </i>
              <br />
              <b>Drag and drop</b> files here <br /> or{" "}
              <a href="" id="triggerFile">
                browse
              </a>{" "}
              to begin the upload
            </p>
          </div>
        )}
        {files && files.length > 0 && (
          <div className="">
            <div className="grid-container">
              <div className="grid-child">
                <div className="file-inputs">
                  <input type="file" onChange={uploadHandler} multiple />
                  <button className="nxtBtn">
                    <i>
                      <FontAwesomeIcon icon={faPlus} />
                    </i>
                    Upload More
                  </button>
                </div>
              </div>

              <div className="grid-child">
                <div className="file-inputs">
                  <button className="nxtBtn" onClick={handleClickOpen}>
                    <i>
                      <FontAwesomeIcon icon={faUpload} />
                    </i>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <SubmitDialog
        CustodianSubmited={CustodianSubmited}
        open={submitOpen}
        handleClose={handleClose}
        NumberofFile={files.length}
      />
    </>
  );
};

export default FileUpload;
