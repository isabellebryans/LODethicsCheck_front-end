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
        <h3>Namespaces</h3>
        <table>
        <thead>
          <tr>
            <th>URI</th>
            <th>Downloadable</th>
            <th>FOOPS Score</th>
            <th>Ontology</th>
          </tr>
        </thead>
        <tbody>
        {data.namespaces_tested.map((ontology, index) => (
          <tr key={index}>
          <td><a href={ontology.ns_uri}>{ontology.ns_uri}</a></td>
          <td>{String(ontology.ns_downloadable)}</td>
          <td>{ontology.ns_foops_overall_score}</td>
          <td>{ontology.ns_ontology ? ontology.ns_ontology.ontology_title : ''}</td>
        </tr>
      ))}
    </tbody>
  </table>
          
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
