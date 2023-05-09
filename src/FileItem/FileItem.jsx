import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import './FileItem.scss'

const FileItem = ({ file, deleteFile, btnDisable}) => {
    return (
        <>
            <li
                className="file-item"
                key={file.name}>
                <FontAwesomeIcon icon={faFileAlt} />
                <p>{file.name}</p>
                <div className="actions">
                    <div className="loading"></div>
                    {file.isUploading && <FontAwesomeIcon
                        icon={faSpinner} className="fa-spin"
                        />
                    }
                    {!file.isUploading &&
                        <FontAwesomeIcon icon={faTrash} 
                        style={btnDisable ? {opacity:'0.5', color:'grey'} :{color:'#e35d5d'}}
                            onClick={() => {if(!btnDisable){deleteFile(file.name)}}} />
                    }
                </div>
            </li>
        </>
    )
}

export default FileItem
