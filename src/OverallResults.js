import React, { useState } from 'react';
import './displayResults.css';

function OverallResults({ data }) {
    const [isNamespaceModalOpen, setIsNamespaceModalOpen] = useState(false);
    // Toggle functions for each modal
    const toggleNamespaceModal = () => setIsNamespaceModalOpen(!isNamespaceModalOpen);
      // Helper function to format check results or show 'Passed'
      const formatCheckResults = (checks) => {
        return checks.length > 0 ? (
          <span style={{ color: 'red' }}>
            {checks.join(', ')}
          </span>
        ) : 'Passed';
      };
    
      // Summary of dataset checks
      const datasetChecksFailed = {
        'Vulnerability Test': data.dataset_checks1,
        'Discrimination Test': data.dataset_checks2,
        'Sensitivity Test': data.dataset_checks3,
      };
    
      const datasetChecksSummary = (
        <div>
          <h2>Issues Found in Dataset:</h2>
          {Object.entries(datasetChecksFailed).map(([testName, checks], index) => (
            checks.length > 0 && (
              <div key={index}>
                <div><strong>{testName} - </strong>
                Problematic term(s) found:  {formatCheckResults(checks)}</div>
              </div>
            )
          ))}
        </div>
      );
    
     
    // Function to generate a summary for each failed test within an ontology
    const generateOntologyTestSummary = (ontology, nsUri) => {
      const tests = [
        { name: 'Vulnerability Test', checks: ontology.ontology_checks1 },
        { name: 'Discrimination Test', checks: ontology.ontology_checks2 },
        { name: 'Sensitivity Test', checks: ontology.ontology_checks3 },
      ];
  
      const failedTests = tests.filter(test => test.checks.length > 0);
  
      if (failedTests.length === 0) return null; // Skip ontologies that passed all tests
  
      return (
        <div key={nsUri}>
          <h4>Ontology in Namespace {nsUri}:</h4>
          {failedTests.map((test, index) => (
            <div key={index}>
              <strong>{test.name}:</strong> Problematic terms found: {formatCheckResults(test.checks)}
            </div>
          ))}
        </div>
      );
    };
  
    // Generate display for each ontology
    const ontologyChecksDisplay = data.namespaces_tested
      .filter(namespace => namespace.ns_ontology)
      .map(namespace => generateOntologyTestSummary(namespace.ns_ontology, namespace.ns_uri))
      .filter(summary => summary !== null); // Filter out ontologies that passed all tests
  
    
      // Summarize unavailable namespaces
      const unavailableNamespacesSummary = (
        <div>
          <strong>Unavailable Namespaces:</strong>
          <span onClick={toggleNamespaceModal} style={{ cursor: 'pointer', marginLeft: '10px' }}>ℹ️</span>
          <ul>
            {data.dataset_unavailable_namespaces.map((namespace, index) => (
              <li key={index}>{namespace}</li>
            ))}
          </ul>
          {isNamespaceModalOpen && (
              <div className='modal'>
                <div className='modal-content'>
                  <span className='close' onClick={toggleNamespaceModal}>&times;</span>
                  <p>These are namespaces used in the dataset which cannot be tested using the 3 ethical tests. Either they cannot be downloaded or an RDF model cannot be extracted from the data. These namespaces have not been tested for problematic terms and should be manually explored. </p>
                  </div>
              </div>
            )}
        </div>
        
      );
    
      return (
        <div className="overall-results">
          <h1>Overall Results Summary</h1>
          {unavailableNamespacesSummary}
          {datasetChecksSummary}
          <h2>Issues Found in Tested Ontologies:</h2>
          {ontologyChecksDisplay.length ? ontologyChecksDisplay : <p>No ontology issues found.</p>}
        </div>
      );
    }
    
    export default OverallResults;