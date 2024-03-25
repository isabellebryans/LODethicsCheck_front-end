import React, { useState, useEffect} from 'react';
import './App.css';
import DragDropFileUpload from './dragDrop';
import exampleFileGroups from './exampleLOD';
import DisplayResults from './displayResults';
import provideRDFresults from './provideRDFresults';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [rdfBlobUrl, setRdfBlobUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Callback function to handle the response
  const handleUploadResponse = (response) => {
    try {
      console.log(response.dataset_title);
      setResponseData(response);
      provideRDFresults(response).then(serializedGraph => {
        const blob = new Blob([serializedGraph], { type: 'text/turtle' });
        const url = URL.createObjectURL(blob);
        setRdfBlobUrl(url); // Store the blob URL for download
        setIsLoading(false);
      }).catch(error => {
        console.error('Error serializing RDF:', error);
        setIsLoading(false);
      });
      
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle parsing error
    }
  };
  // Cleanup blob URL on component unmount
  useEffect(() => {
    return () => {
      if (rdfBlobUrl) {
        URL.revokeObjectURL(rdfBlobUrl);
      }
    };
  }, [rdfBlobUrl]);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>LODethicsCheck</h1>
        <DragDropFileUpload 
          onUploadResponse={handleUploadResponse} 
          onLoadingChange={setIsLoading} // Pass the setIsLoading function as a prop
        />
        {isLoading && <div className="loader">Loading...</div>}
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
        <h3>Download RDF results</h3>
        <div className="download-link-container">
        
        {rdfBlobUrl && (
          <a href={rdfBlobUrl} download="results.ttl" style={{ marginTop: '20px' }}>
            results.ttl
          </a>
        )}</div>
      </header>
    </div>
  );
}

export default App;
