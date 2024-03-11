import React from 'react';
import './App.css';
import DragDropFileUpload from './dragDrop';
import exampleFileGroups from './fileGroups';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ethical LOD Checker</h1>
        <DragDropFileUpload />
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
      </header>
    </div>
  );
}

export default App;
