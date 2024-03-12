import React, { useState } from 'react';
import './App.css';
import DragDropFileUpload from './dragDrop';
import exampleFileGroups from './exampleLOD';
import DisplayResults from './displayResults';

function App() {
  const [responseData, setResponseData] = useState(null);

  // Callback function to handle the response
  const handleUploadResponse = (response) => {
    try {
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
        <DragDropFileUpload onUploadResponse={handleUploadResponse} />
        <div style={{ marginTop: '20px' }}> {/* Adjust the margin as needed */}
          <div className='examples'>
            <h3>Example LOD</h3>
            <p>Select from the following groups of example files to download and then drag into the upload box:</p>
            <div className="example-file-groups">
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
        </div>
        {responseData && <DisplayResults data={responseData} />}
      </header>
    </div>
  );
}

export default App;
