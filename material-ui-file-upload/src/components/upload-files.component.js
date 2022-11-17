import React, { useState, useEffect } from "react";
import UploadService from "../services/upload-files.service";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default function UploadFiles(props) {

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [fileInfos, setFileInfos] = useState([]);
  
  const selectFile = (event) => {
    console.log(event);
    setSelectedFiles(event.target.files);
    
  }
  
  const parseFilesAndSetFileInfos = (filesApiResponse) => {
    try {
      setFileInfos(filesApiResponse.data);
    } catch (ex) {
      console.log(ex);
    }
  }
  
  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    UploadService.upload(currentFile, (event) => 
      setProgress(Math.round((100 * event.loaded) / event.total)))
      .then((response) => {
        setMessage(response.data.message);
        setIsError(false);
        return UploadService.getFiles();
      })
      .then(parseFilesAndSetFileInfos)
      .catch(() => {
        setProgress(0);
        setMessage('Could not upload the file!');
        setCurrentFile(undefined);
        setIsError(true);
      });

    setSelectedFiles(undefined);
  }
  
  useEffect(() => {
    UploadService.getFiles().then(parseFilesAndSetFileInfos);
  }, []);
  

  return (
    <div className="mg20">
      {currentFile && (
        <Box className="mb25" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
          </Box>
        </Box>)
      }
       <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          onChange={selectFile} />
        <Button
          className="btn-choose"
          variant="outlined"
          component="span" >
           Choose Files
        </Button>
      </label>
      <div className="file-name">
      {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
      </div>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!selectedFiles}
        onClick={upload}>
        Upload
      </Button>
       <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
        {message}
      </Typography>
       <Typography variant="h6" className="list-header">
        List of Files
        </Typography>
      <ul className="list-group">
        {fileInfos &&
          fileInfos.map((file, index) => (
            <ListItem
              divider
              key={index}>
              <div>
                {file.base64Data && <img src={"data:image/*;base64," + file.base64Data} alt='image'></img>}  
              </div>
              <strong>{file.filename}</strong>
            </ListItem>
          ))}
      </ul>
    </div >
  );
  
}


