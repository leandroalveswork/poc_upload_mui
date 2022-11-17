import logo from './logo.svg';
import './App.css';
import { Typography } from "@material-ui/core";

import UploadFiles from "./components/upload-files.component";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="mg20">
          <Typography variant="h6">Material UI File Upload</Typography>
        </div>
  
        <UploadFiles />
      </div>
    </div>
  );
}

export default App;
