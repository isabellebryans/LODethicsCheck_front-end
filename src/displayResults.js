import React from 'react';

function DisplayResults({ data }) {
  return (
    <div className="display-results">
      <h2>Display Results</h2>
      <p><strong>Dataset Title:</strong> {data.dataset_title}</p>
      <p><strong>Dataset Description:</strong> {data.dataset_description}</p>
      
      <div>
        <strong>Dataset Checks:</strong>
        <ul>
          {data.dataset_checks1.map((check, index) => <li key={index}>{check}</li>)}
        </ul>
      </div>
      
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

      <h3>Tested Ontologies</h3>
      {data.ontologies_tested.map((ontology, index) => (
        <div key={index}>
          <p><strong>URI:</strong> <a href={ontology.ontology_uri}>{ontology.ontology_uri}</a></p>
          <p><strong>Title:</strong> {ontology.ontology_title}</p>
          <p><strong>Description:</strong> {ontology.ontology_description}</p>
          <p><strong>FOOPS Score:</strong> {ontology.foops_score}</p>
          <strong>Checks:</strong>
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

export default DisplayResults;
