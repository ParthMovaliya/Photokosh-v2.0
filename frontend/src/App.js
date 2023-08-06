import React from 'react';
// import axios from 'axios';
import './App.css';
import CaptureImage from './components/CaptureImage';
import UploadImage from './components/UploadImage';

function App() {

  return (
    <div>
      <h1>React Camera App</h1>
      <CaptureImage />
      <UploadImage />
      {/* <button onClick={handleCapture}>Capture Image</button> */}
    </div>
  );
}

export default App;
