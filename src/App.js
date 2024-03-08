import React from 'react';
import './App.css';
import DragDropFileUpload from './dragDrop';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ethical LOD Checker</h1>
        <DragDropFileUpload />
        <div className="example-files">
          <h2>Example Files</h2>
          <p>Download and drag these example files into the upload box:</p>
          <ul>
            <li><a href={`${process.env.PUBLIC_URL}/streetCrimeCamden.rdf`} download="streetCrimeCamden.rdf">Example File 1</a></li>
            {/* Add more files as needed */}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
