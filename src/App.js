import React from 'react';
import './App.css';
import DragDropFileUpload from './dragDrop';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ethical LOD Checker</h1>
        <DragDropFileUpload />
      </header>
    </div>
  );
}

export default App;
