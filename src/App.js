import React, { useState } from 'react';
import './App.css';
import DragDropFileUpload from './dragDrop';
import exampleFileGroups from './fileGroups';

function App() {
  const [responseData, setResponseData] = useState(null);

  // Assuming you have a function to handle file upload that sets responseData...
  // Callback function to handle the response
  const handleUploadResponse = (response) => {
    try {
      // Parse the JSON string into an object
      ///const response = JSON.parse(responseString);
      console.log(response.dataset_title);
  
  
      setResponseData(response);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle parsing error
    }
  };
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ethical LOD Checker</h1>
        <div className="upload-and-examples-container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <DragDropFileUpload onUploadResponse={handleUploadResponse} />
          <div className="example-file-groups">
  <h2>Example Files</h2>
  <p>Select from the following groups of example files to download and then drag into the upload box:</p>
  {exampleFileGroups.map((group, index) => (
    <div key={index} className="file-group">
      <h3>{group.title}</h3>
      <p>{group.description}</p>
      <ul>
        {group.files.map((file, fileIndex) => (
          <li key={fileIndex}>
            <a href={`${process.env.PUBLIC_URL}${file.path}`} download>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>


        </div>
        {responseData && (
          <div className="response-data">
            <h2>Analysis Results</h2>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
            {/* Display your response data here */}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
