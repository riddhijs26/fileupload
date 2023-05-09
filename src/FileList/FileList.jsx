import axios from "axios";
import React, { useEffect, useState } from "react";
import FileItem from "./../FileItem/FileItem";
import "./FileList.scss";
const FileList = ({ files, setFiles }) => {
  const [btnDisable, setBtnDisable] = useState(false);

  const deleteFileHandler = (e) => {
    console.error(e);
    removeFile(e);
  };

  useEffect(() => {
    setBtnDisable(false);
    files.forEach((value) => {
      if (value.isUploading) {
        setBtnDisable(true);
      }
    });
  }, [files]);

  const removeFile = (uploadedFiles) => {
    const removedfiles = files.filter((e) => uploadedFiles != e.name);
    setFiles(removedfiles);
  };
  return (
    <ul className="filelist">
      {files &&
        files.length > 0 &&
        files.map((f) => (
          <FileItem
            key={f.name}
            file={f}
            deleteFile={deleteFileHandler}
            btnDisable={btnDisable}
          />
        ))}
    </ul>
  );
};

export default FileList;
