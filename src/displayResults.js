import React from 'react';
import './displayResults.css';

function DisplayDatasetData({ data }) {
  return (
    <div className='dataset-container'>
      <div className='dataset-info'>
        <p><strong>File Name:</strong> {data.file_name}</p>
        <p><strong>Dataset Title:</strong> {data.dataset_title}</p>
        <p><strong>Dataset Description:</strong> {data.dataset_description}</p>
        
      </div>
      <strong>Dataset Checks</strong>
      
      <div className='dataset-checks-container'>
        
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
        <table className="table">
        <thead>
          <tr>
            <th>URI</th>
            <th>Downloaded</th>
            <th>FOOPS Score</th>
            <th>Title</th>
            <th>Description</th>
            <th>Vulnerability Test Results</th>
            <th>Discrimination Test Results</th>
            <th>Sensitivity Test Results</th>
          </tr>
        </thead>
        <tbody>
        {data.namespaces_tested.map((namespace, index) => (
          <tr key={index}>
          <td><a href={namespace.ns_uri}>{namespace.ns_uri}</a></td>
          <td style={{ color: namespace.ns_downloadable ? 'inherit' : 'red' }}>
                {String(namespace.ns_downloadable)}
              </td>
          <td>{namespace.ns_foops_overall_score}</td>
          <td>{namespace.ns_ontology ? namespace.ns_ontology.ontology_title : 'None'}</td>
          <td>{namespace.ns_ontology ? namespace.ns_ontology.ontology_description : 'None'}</td>
          <td>{namespace.ns_ontology ? <ul>
            {namespace.ns_ontology.ontology_checks1.map((check, index) => <li key={index}>{check}</li>)}
          </ul> : ''}</td>
          <td>{namespace.ns_ontology ? <ul>
            {namespace.ns_ontology.ontology_checks2.map((check, index) => <li key={index}>{check}</li>)}
          </ul> : ''}</td>
          <td>{namespace.ns_ontology ? <ul>
            {namespace.ns_ontology.ontology_checks3.map((check, index) => <li key={index}>{check}</li>)}
          </ul> : ''}</td>
        </tr>
      ))}
    </tbody>
  </table>
          
      </div>
    );
  }

  function OverallResults({ data }) {
    // Summarize unavailable namespaces
    const unavailableNamespacesSummary = (
      <div>
        <strong>Unavailable Namespaces:</strong>
        <ul>
          {data.dataset_unavailable_namespaces.map((namespace, index) => (
            <li key={index}>{namespace}</li>
          ))}
        </ul>
      </div>
    );
  
    // Aggregate and deduplicate terms found in all checks
    const aggregateChecks = (checks1, checks2, checks3) => {
      const allTerms = [...checks1, ...checks2, ...checks3];
      return [...new Set(allTerms)]; // Remove duplicates
    };
  
    const datasetChecksSummary = (
      <div>
        <strong>Terms Found in Dataset Checks:</strong>
        <ul>
          {aggregateChecks(data.dataset_checks1, data.dataset_checks2, data.dataset_checks3).map((check, index) => (
            <li key={index}>{check}</li>
          ))}
        </ul>
      </div>
    );
  
    // Assume ontology checks are stored similarly to dataset checks in your data structure
    const ontologyChecksSummary = data.namespaces_tested
      .filter(namespace => namespace.ns_ontology)
      .flatMap(namespace => [
        ...namespace.ns_ontology.ontology_checks1,
        ...namespace.ns_ontology.ontology_checks2,
        ...namespace.ns_ontology.ontology_checks3,
      ]);
  
    const uniqueOntologyChecks = [...new Set(ontologyChecksSummary)]; // Deduplicate
  
    const ontologyChecksDisplay = (
      <div>
        <strong>Terms Found in Ontology Checks:</strong>
        <ul>
          {uniqueOntologyChecks.map((check, index) => (
            <li key={index}>{check}</li>
          ))}
        </ul>
      </div>
    );
  
    return (
      <div className="overall-results">
        <h3>Overall Results Summary</h3>
        {unavailableNamespacesSummary}
        {datasetChecksSummary}
        {ontologyChecksDisplay}
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
        <OverallResults data={data}/>
        </div>
        </div>
    );
    }

export default DisplayResults;
