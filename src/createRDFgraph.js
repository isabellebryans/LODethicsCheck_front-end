import { graph, literal, Namespace, Fetcher, serialize, blankNode } from 'rdflib';


// Function to convert JSON to RDF triples
function jsonToRDF(jsonResponse) {
  const ontologyUri = 'https://purl.archive.org/net/ethics-assessment/ontology/';
  const store = graph();
  const fetcher = new Fetcher(store);

  // Define namespaces and ontology
  const ONTOLOGY = Namespace(ontologyUri);
  const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
  const EARL = Namespace('http://www.w3.org/ns/earl#');
  const VOID = Namespace('http://rdfs.org/ns/void#');
  const BIBO = Namespace('http://purl.org/ontology/bibo/');
  const DCTERMS = Namespace('http://purl.org/dc/terms/');

  const reportUri = blankNode();
  store.add(reportUri, RDF('type'), ONTOLOGY('EthicsReport'));

  const datasetUri = blankNode();
  // Add triples for the dataset, including its title and description
  store.add(datasetUri, RDF('type'), VOID('Dataset'));
  store.add(datasetUri, RDF('type'), EARL('TestSubject'));
  store.add(datasetUri, DCTERMS('title'), literal(jsonResponse.dataset_title));
  store.add(datasetUri, DCTERMS('description'), literal(jsonResponse.dataset_description));

  const testResultVulnerability = blankNode();
  const testResultDiscrimination = blankNode();
  const testResultSensitivity = blankNode();

  store.add(datasetUri, ONTOLOGY('hasTestResult'), testResultVulnerability);
  store.add(datasetUri, ONTOLOGY('hasTestResult'), testResultDiscrimination);
  store.add(datasetUri, ONTOLOGY('hasTestResult'), testResultSensitivity);

  store.add(testResultVulnerability, RDF('type'), ONTOLOGY('EthicsTestResult'));
  store.add(testResultDiscrimination, RDF('type'), ONTOLOGY('EthicsTestResult'));
  store.add(testResultSensitivity, RDF('type'), ONTOLOGY('EthicsTestResult'));

  // store.add(testResultVulnerability, EARL('subject'), datasetUri);
  // store.add(testResultVulnerability, EARL('subject'), datasetUri);
  // store.add(testResultVulnerability, EARL('subject'), datasetUri);

  store.add(testResultVulnerability, EARL('test'), ONTOLOGY('VulnerabilityTest'));
  store.add(testResultDiscrimination, EARL('test'), ONTOLOGY('DiscriminationTest'));
  store.add(testResultSensitivity, EARL('test'), ONTOLOGY('SensitivityTest'));

  const testResultVulnerability1 = blankNode();
  const testResultDiscrimination1 = blankNode();
  const testResultSensitivity1 = blankNode();

  store.add(testResultVulnerability1, RDF('type'), EARL('TestResult'));
  store.add(testResultDiscrimination1, RDF('type'), EARL('TestResult'));
  store.add(testResultSensitivity1, RDF('type'), EARL('TestResult'));

  store.add(testResultVulnerability, EARL('result'), testResultVulnerability1);
  store.add(testResultDiscrimination, EARL('result'), testResultDiscrimination1);
  store.add(testResultSensitivity, EARL('result'), testResultSensitivity1);

  if (jsonResponse.dataset_checks1.length === 0) {
    store.add(testResultVulnerability1, EARL('outcome'), EARL("passed"));
  } else{
    jsonResponse.dataset_checks1.forEach(check => {
      store.add(testResultVulnerability1, EARL('outcome'), EARL("failed"));
      store.add(testResultVulnerability1, ONTOLOGY('termFound'), literal(check));
    });
  }
  if (jsonResponse.dataset_checks2.length === 0) {
    store.add(testResultDiscrimination1, EARL('outcome'), EARL("passed"));
  } else{
    jsonResponse.dataset_checks2.forEach(check => {
      store.add(testResultDiscrimination1, EARL('outcome'), EARL("failed"));
      store.add(testResultDiscrimination1, ONTOLOGY('termFound'), literal(check));
    });
  }
  if (jsonResponse.dataset_checks3.length === 0) {
    store.add(testResultSensitivity1, EARL('outcome'), EARL("passed"));
  } else{
    jsonResponse.dataset_checks3.forEach(check => {
      store.add(testResultSensitivity1, EARL('outcome'), EARL("failed"));
      store.add(testResultSensitivity1, ONTOLOGY('termFound'), literal(check));
    });
  }
  
  jsonResponse.namespaces_tested.forEach(JSON_ns => {
    const nsBlanknode = blankNode();
    store.add(datasetUri, ONTOLOGY('hasNamespace'), nsBlanknode);
    namespaceToRDF(JSON_ns, store, nsBlanknode);
  });

  return store;
}

function namespaceToRDF(json_ns, store, ns_node){
  const ontologyUri = 'https://purl.archive.org/net/ethics-assessment/ontology/';
  const ONTOLOGY = Namespace(ontologyUri);
  const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
  const EARL = Namespace('http://www.w3.org/ns/earl#');
  const VOID = Namespace('http://rdfs.org/ns/void#');
  const BIBO = Namespace('http://purl.org/ontology/bibo/');
  const DCTERMS = Namespace('http://purl.org/dc/terms/');

  store.add(ns_node, RDF('type'), EARL('TestSubject'));
  store.add(ns_node, BIBO('uri'), literal(json_ns.ns_uri));
  store.add(ns_node, RDF('type'), ONTOLOGY('Namespace'));
  if(json_ns.ns_foops_overall_score){
    store.add(ns_node, ONTOLOGY('FAIRscore'), literal(json_ns.ns_foops_overall_score));
  }
  if(json_ns.ns_downloadable === true){
    store.add(ns_node, ONTOLOGY('isAvailable'), ONTOLOGY('True'));
  } else{
    store.add(ns_node, ONTOLOGY('isAvailable'), ONTOLOGY('False'));
  }

  // if(json_ns.ns_model_loaded == "standard"){
  //   allPassed(store, json_ns, ns_node);
  //   return;
  // }

  if (json_ns.ns_ontology){
    store.add(ns_node, DCTERMS('title'), literal(json_ns.ns_ontology.ontology_title));
    store.add(ns_node, DCTERMS('description'), literal(json_ns.ns_ontology.ontology_description));
    const testResultVulnerability = blankNode();
    const testResultDiscrimination = blankNode();
    const testResultSensitivity = blankNode();

    store.add(ns_node, ONTOLOGY('hasTestResult'), testResultVulnerability);
    store.add(ns_node, ONTOLOGY('hasTestResult'), testResultDiscrimination);
    store.add(ns_node, ONTOLOGY('hasTestResult'), testResultSensitivity);

    store.add(testResultVulnerability, RDF('type'), ONTOLOGY('EthicsTestResult'));
    store.add(testResultDiscrimination, RDF('type'), ONTOLOGY('EthicsTestResult'));
    store.add(testResultSensitivity, RDF('type'), ONTOLOGY('EthicsTestResult'));

    // store.add(testResultVulnerability, EARL('subject'), datasetUri);
    // store.add(testResultVulnerability, EARL('subject'), datasetUri);
    // store.add(testResultVulnerability, EARL('subject'), datasetUri);

    store.add(testResultVulnerability, EARL('test'), ONTOLOGY('VulnerabilityTest'));
    store.add(testResultDiscrimination, EARL('test'), ONTOLOGY('DiscriminationTest'));
    store.add(testResultSensitivity, EARL('test'), ONTOLOGY('SensitivityTest'));

    const testResultVulnerability1 = blankNode();
    const testResultDiscrimination1 = blankNode();
    const testResultSensitivity1 = blankNode();

    store.add(testResultVulnerability1, RDF('type'), EARL('TestResult'));
    store.add(testResultDiscrimination1, RDF('type'), EARL('TestResult'));
    store.add(testResultSensitivity1, RDF('type'), EARL('TestResult'));

    store.add(testResultVulnerability, EARL('result'), testResultVulnerability1);
    store.add(testResultDiscrimination, EARL('result'), testResultDiscrimination1);
    store.add(testResultSensitivity, EARL('result'), testResultSensitivity1);

    if (json_ns.ns_ontology.ontology_checks1.length === 0) {
      store.add(testResultVulnerability1, EARL('outcome'), EARL("passed"));
    } else{
      json_ns.ns_ontology.ontology_checks1.forEach(check => {
        store.add(testResultVulnerability1, EARL('outcome'), EARL("failed"));
        store.add(testResultVulnerability1, ONTOLOGY('termFound'), literal(check));
      });
    }
    if (json_ns.ns_ontology.ontology_checks2.length === 0) {
      store.add(testResultDiscrimination1, EARL('outcome'), EARL("passed"));
    } else{
      json_ns.ns_ontology.ontology_checks2.forEach(check => {
        store.add(testResultDiscrimination1, EARL('outcome'), EARL("failed"));
        store.add(testResultDiscrimination1, ONTOLOGY('termFound'), literal(check));
      });
    }
    if (json_ns.ns_ontology.ontology_checks3.length === 0) {
      store.add(testResultSensitivity1, EARL('outcome'), EARL("passed"));
    } else{
      json_ns.ns_ontology.ontology_checks3.forEach(check => {
        store.add(testResultSensitivity1, EARL('outcome'), EARL("failed"));
        store.add(testResultSensitivity1, ONTOLOGY('termFound'), literal(check));
      });
    }
  
  }


}

function allPassed(store){

}

export default jsonToRDF;
