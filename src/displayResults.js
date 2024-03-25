import React, { useState } from 'react';
import './displayResults.css';
import OverallResults from './OverallResults';

function DisplayDatasetData({ data }) {
  const [isVulnerabilityModalOpen, setIsVulnerabilityModalOpen] = useState(false);
  const [isDiscriminationModalOpen, setIsDiscriminationModalOpen] = useState(false);
  const [isSensitivityModalOpen, setIsSensitivityModalOpen] = useState(false);

  // Toggle functions for each modal
  const toggleVulnerabilityModal = () => setIsVulnerabilityModalOpen(!isVulnerabilityModalOpen);
  const toggleDiscriminationModal = () => setIsDiscriminationModalOpen(!isDiscriminationModalOpen);
  const toggleSensitivityModal = () => setIsSensitivityModalOpen(!isSensitivityModalOpen);

  // Find results for each test
  const vulnerabilityTestResults = data.dataset_ethics_tests.find(test => test.test_name === "Vulnerability Test")?.test_results || [];
  const discriminationTestResults = data.dataset_ethics_tests.find(test => test.test_name === "Discrimination Test")?.test_results || [];
  const sensitivityTestResults = data.dataset_ethics_tests.find(test => test.test_name === "Sensitivity Test")?.test_results || [];


  return (
    <div className='dataset-container'>
      <div className='dataset-info'>
        <p><strong>File Name:</strong> {data.file_name}</p>
        <p><strong>Dataset Title:</strong> {data.dataset_title}</p>
        <p><strong>Dataset Description:</strong> {data.dataset_description}</p>
        
      </div>
      <strong>Dataset Checks</strong>
      
      <div className='dataset-checks-container'>
        
        <div className='dataset-check'>
          <strong>Vulnerability Test</strong>
          <span onClick={toggleVulnerabilityModal} style={{ cursor: 'pointer', marginLeft: '10px' }}>ℹ️</span>
          {/* Info text and modal toggle */}
          <p>This tests for the presence of vulnerable groups in the data.</p>
         
          <h1>Results</h1>
          {vulnerabilityTestResults.length > 0 ? (
            <>
              <p>Problematic Terms found:</p>
              <p>{vulnerabilityTestResults.join(', ')}</p> {/* Display checks horizontally */}
            </>
          ) : (
            <p>No problematic terms found.</p>
          )}
          {isVulnerabilityModalOpen && (
            <div className='modal'>
              <div className='modal-content'>
                <span className='close' onClick={toggleVulnerabilityModal}>&times;</span>
                <p><strong>Test Description:</strong> The Vulnerability Test examines datasets to identify the presence of information pertaining to vulnerable individuals or groups. It searches for keywords indicating the inclusion of data about children, minors, the youth, schools, homeless individuals, the elderly, retirees, migrants, refugees, asylum seekers, immigrants, individuals with criminal records, people with disabilities or impairments, and economically disadvantaged groups.</p>
                <p><strong>Importance:</strong> This test is crucial for ensuring that data handling practices do not inadvertently expose vulnerable populations to further risks. These groups often face heightened challenges and discrimination, and their data requires careful consideration to prevent misuse, stigmatization, or harm. By identifying datasets that include or pertain to these vulnerable groups, data integrators can apply stricter ethical standards and protections, ensuring that any analysis or integration does not exacerbate their vulnerability.</p>
              </div>
            </div>
          )}
        </div>
        <div className='dataset-check'>
          <strong>Discrimination Test</strong>
          <span onClick={toggleDiscriminationModal} style={{ cursor: 'pointer', marginLeft: '10px' }}>ℹ️</span>
          <p>This test detects if the data is distinguished based on potentially discriminatory factors.</p> 
          <h1>Results</h1>
          {discriminationTestResults.length > 0 ? (
            <>
              <p>Problematic Terms found:</p>
              <p>{discriminationTestResults.join(', ')}</p> {/* Display checks horizontally */}
            </>
          ) : (
            <p>No problematic terms found.</p>
          )}
          {isDiscriminationModalOpen && (
            <div className='modal'>
              <div className='modal-content'>
                <span className='close' onClick={toggleDiscriminationModal}>&times;</span>
                <p><strong>Test Description:</strong> The Discriminatory Test is designed to detect if datasets make distinctions based on potentially discriminatory factors such as sex, gender, age, ethnicity, race, religion, and nationality. It looks for keywords that could indicate that the data is categorized or could be used to differentiate individuals or groups along these sensitive lines.</p>
                <p><strong>Importance:</strong> This test addresses the risk of discrimination that could arise from the misuse of data. By identifying datasets that distinguish individuals based on these factors, it helps data integrators to be aware of the potential for biased interpretations or applications. This awareness is essential for preventing the reinforcement of stereotypes, biases, and systemic inequalities through data integration practices. It promotes the responsible use of data that respects diversity and supports equality.</p>
               </div>
            </div>
          )}
        </div>
        <div className='dataset-check'>
          <strong>Sensitivity Test</strong>
          <span onClick={toggleSensitivityModal} style={{ cursor: 'pointer', marginLeft: '10px' }}>ℹ️</span>
          <p>This test scans the data for the inclusion of or reference to sensitive topics. </p> 
          <h1>Results</h1>
          {sensitivityTestResults.length > 0 ? (
            <>
              <p>Problematic Terms found:</p>
              <p>{sensitivityTestResults.join(', ')}</p> {/* Display checks horizontally */}
            </>
          ) : (
            <p>No problematic terms found.</p>
          )}
          {isSensitivityModalOpen && (
            <div className='modal'>
              <div className='modal-content'>
                <span className='close' onClick={toggleSensitivityModal}>&times;</span>
                <p><strong>Test Description:</strong> The Sensitivity Test scans datasets for the inclusion of or reference to sensitive topics. This encompasses a wide range of areas including medical, health, psychiatric conditions, addictions, treatments, diseases, disorders, financial information (income, debt, credit, poverty, wealth, salary, unemployment), criminal records (crime, conviction, arrest, incarceration), sexual orientation, political affiliations, and education.</p>
                <p><strong>Importance:</strong> Sensitive topics require careful handling due to their potential impact on individuals' privacy, dignity, and well-being. The presence of such data can raise significant ethical considerations, from the risk of personal information exposure to the potential for misuse in ways that could affect individuals' lives profoundly. The Sensitivity Test helps ensure that datasets containing sensitive topics are identified early in the data integration process, enabling measures to be taken to safeguard privacy, ensure consent, and mitigate any potential harm.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DisplayOntologyData({ data }) {
  const [isFoopsModalOpen, setIsFoopsModalOpen] = useState(false);
  const [isModelLoadedModalOpen, setIsModelLoadedModalOpen] = useState(false);


  const toggleFoopsModal = () => setIsFoopsModalOpen(!isFoopsModalOpen);
  const toggleModelLoadedModal = () => setIsModelLoadedModalOpen(!isModelLoadedModalOpen);


    return (
      <div>
        <h3>Dataset Ontologies</h3>
        <table className="table">
        <thead>
          <tr>
            <th>Namespace URI</th>
            <th>Downloaded</th>
            <th style={{ position: 'relative' }}>RDF Graph Loaded 
              <span onClick={toggleModelLoadedModal} style={{ cursor: 'pointer', position: 'absolute', top: 10, right: 10, fontSize: '20px' }}>ℹ️</span>
            </th>
            <th style={{ position: 'relative' }}>FAIR Score 
              <span onClick={toggleFoopsModal} style={{ cursor: 'pointer', position: 'absolute', top: 10, right: 10, fontSize: '20px' }}>ℹ️</span>
            </th><th>Title</th>
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
          <td style={{ color: namespace.ns_model_loaded === 'false' ? 'red' : 'inherit' }}>
            {namespace.ns_model_loaded}
          </td>
          <td>{namespace.ns_foops_overall_score}</td>
          <td>{namespace.ns_ontology ? namespace.ns_ontology.ontology_title : ''}</td>
          <td>{namespace.ns_ontology ? namespace.ns_ontology.ontology_description : ''}</td>
          <td>
                {namespace.ns_ontology && namespace.ns_ontology.ontology_ethics_tests
                  ? namespace.ns_ontology.ontology_ethics_tests
                      .find(test => test.test_name === "Vulnerability Test")
                      ?.test_results.join(', ') || 'N/A'
                  : (<span style={{ color: 'green' }}>Passed</span>)}
              </td>
              <td>
                {namespace.ns_ontology && namespace.ns_ontology.ontology_ethics_tests
                  ? namespace.ns_ontology.ontology_ethics_tests
                      .find(test => test.test_name === "Discrimination Test")
                      ?.test_results.join(', ') || 'N/A'
                  : (<span style={{ color: 'green' }}>Passed</span>)}
              </td>
              <td>
                {namespace.ns_ontology && namespace.ns_ontology.ontology_ethics_tests
                  ? namespace.ns_ontology.ontology_ethics_tests
                      .find(test => test.test_name === "Sensitivity Test")
                      ?.test_results.join(', ') || 'N/A'
                  : (<span style={{ color: 'green' }}>Passed</span>)}
              </td>
          
        
        </tr>
      ))}
    </tbody>
  </table>
  {isFoopsModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={toggleFoopsModal}>&times;</span>
            <h2>FAIR Score Information:</h2>
            <p>The FAIR score of the ontology describes its position in adhering to the FAIR principles: its Findability, Accessibility, Interoperability and Reusability. This is calculated using the <strong>FOOPS</strong> tool (Ontology Pitfall Scanner for FAIR principles). This tool assesses the "fairness" of the ontology from its URI based on the principles:
            </p>
            <ul>
            <li><strong>Findability:</strong> How easily the ontology can be discovered by both humans and computers.</li>
            <li><strong>Accessibility:</strong> The ease with which it can be accessed, including considerations for authorization and authentication where necessary.</li>
            <li><strong>Interoperability:</strong> The ontology's ability to integrate and work seamlessly with other datasets and systems.</li>
            <li><strong>Reusability:</strong> Its suitability for use in diverse research settings beyond its original purpose, facilitated by clear documentation and licensing.</li>
            </ul>
            <h3>References:</h3> 
            <ol>
            <li>FAIR principles - <a href={'https://www.nature.com/articles/sdata201618'}>{'https://www.nature.com/articles/sdata201618'}</a></li>
            <li>FOOPS tool - <a href={'https://foops.linkeddata.es/about.html'}>{'https://foops.linkeddata.es/about.html'}</a></li>
            </ol>
          </div>
        </div>
      )}
      {isModelLoadedModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={toggleModelLoadedModal}>&times;</span>
            <p>This field indicates if the RDF graph of the ontology was loaded and tested in the application from the downloaded file (if downloaded successfully). 
              If the ontology is a standard ontology, the application does not test the ontology as it is unproblematic, and "standard" is displayed in this field.
            </p>
            
          </div>
        </div>
      )}
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
