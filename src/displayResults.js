import React from 'react';
import './displayResults.css';

function DisplayDatasetData({ data }) {
  return (
    <div className='dataset-container'>
      <div className='dataset-info'>
        <p><strong>File Name:</strong> {data.file_name}</p>
        <p><strong>Dataset Title:</strong> {data.dataset_title}</p>
        <p><strong>Dataset Description:</strong> {data.dataset_description}</p>
        <div>
          <strong>Namespaces:</strong>
          <ul>
            {data.dataset_namespaces.map((namespace, index) => <li key={index}>{namespace}</li>)}
          </ul>
        </div>
        <div>
          <strong>Unavailable Namespaces:</strong>
          <ul>
            {data.dataset_unavailable_namespaces.map((namespace, index) => <li key={index}>{namespace}</li>)}
          </ul>
        </div>
      </div>
      
      
      <div className='dataset-checks-container'>
        <strong>Dataset Checks:</strong>
        <div className='dataset-check'><strong>Vulnerability Check</strong>
        <p>Terms found:</p>
          <ul>
            {data.dataset_checks1.map((check, index) => <li key={index}>{check}</li>)}
          </ul>
        </div>
        <div className='dataset-check'><strong>Discrimination Check</strong>
        <p>Terms found:</p>
          <ul>
            {data.dataset_checks2.map((check, index) => <li key={index}>{check}</li>)}
          </ul>
        </div>
        <div className='dataset-check'><strong>Sensitivity Check</strong>
        <p>Terms found:</p>
          <ul>
            {data.dataset_checks3.map((check, index) => <li key={index}>{check}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DisplayOntologyData({ data }) {
    return (
      <div>
        <h3>Tested Ontologies</h3>
        {data.ontologies_tested.map((ontology, index) => (
          <div key={index} className='ontology'>
            <h4>Ontology {index + 1}</h4>
            <p><strong>URI:</strong> <a href={ontology.ontology_uri}>{ontology.ontology_uri}</a></p>
            <p><strong>Title:</strong> {ontology.ontology_title}</p>
            <p><strong>Description:</strong> {ontology.ontology_description}</p>
            <p><strong>FOOPS Score:</strong> {ontology.foops_score}</p>
            <p><strong>Words found:</strong></p>
            <ul>
              {ontology.ontology_checks1.map((check, i) => <li key={i}>{check}</li>)}
              {ontology.ontology_checks2.map((check, i) => <li key={`check2-${i}`}>{check}</li>)}
              {ontology.ontology_checks3.map((check, i) => <li key={`check3-${i}`}>{check}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  }


function DisplayResults({ data }) {
    return (
        <div className="results">
        <h2>Results</h2>
        <div className='display-results'>

        <DisplayDatasetData data={data} />
        <DisplayOntologyData data={data} />
        </div>
        </div>
    );
    }

export default DisplayResults;
