import React, { useEffect, useState } from "react";
import FileUpload from "../FileUpload/FileUpload";
import FileList from "../FileList/FileList";

const DragandDrop = () => {
  const [files, setFiles] = useState([]);

  const handleCallback = (childData) =>{
      setFiles( childData)
  }

  return (
    <div className="file-card">
      <FileUpload files={files} setFiles={handleCallback} />
      <FileList files={files} setFiles={handleCallback} />
    </div>
      

  );
};
export default DragandDrop;
