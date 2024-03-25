import { graph, literal, Namespace, namedNode, Fetcher, serialize, blankNode } from 'rdflib';


// Function to convert JSON to RDF triples
function jsonToRDF(jsonResponse) {
  const ontologyUri = 'https://purl.org/ethics-assessment/ontology/';
  const store = graph();
  const fetcher = new Fetcher(store);

  // Define namespaces and ontology
  const ONTOLOGY = Namespace(ontologyUri);
  const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
  const EARL = Namespace('http://www.w3.org/ns/earl#');
  const VOID = Namespace('http://rdfs.org/ns/void#');
  const BIBO = Namespace('http://purl.org/ontology/bibo/');
  const DCTERMS = Namespace('http://purl.org/dc/terms/');

  const reportUri = namedNode('http://example.org/report');
  store.add(reportUri, RDF('type'), ONTOLOGY('EthicsReport'));

  const datasetUri = namedNode('http://example.org/dataset');
  
  // Add triples for the dataset, including its title and description
  store.add(datasetUri, RDF('type'), VOID('Dataset'));
  store.add(datasetUri, RDF('type'), EARL('TestSubject'));
  store.add(datasetUri, DCTERMS('title'), literal(jsonResponse.dataset_title));
  store.add(datasetUri, DCTERMS('description'), literal(jsonResponse.dataset_description));

  jsonResponse.dataset_ethics_tests.forEach(test => {
    const testResultNode = blankNode();
    store.add(datasetUri, ONTOLOGY('hasTestResult'), testResultNode);
    store.add(testResultNode, RDF('type'), ONTOLOGY('EthicsTestResult'));
    store.add(testResultNode, EARL('test'), ONTOLOGY(test.test_name.replace(/\s+/g, '')));
    const outcomeNode = blankNode();
    store.add(testResultNode, EARL('result'), outcomeNode);
    store.add(outcomeNode, RDF('type'), EARL('TestResult'));
    if (test.test_results.length === 0) {
      store.add(outcomeNode, EARL('outcome'), EARL("passed"));
    } else {
      test.test_results.forEach(term => {
        store.add(outcomeNode, EARL('outcome'), EARL("failed"));
        store.add(outcomeNode, ONTOLOGY('termFound'), literal(term));
      });
    }
  });

  
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
    json_ns.ns_ontology.ontology_ethics_tests.forEach(test => {
      const testResultNode = blankNode();
      store.add(ns_node, ONTOLOGY('hasTestResult'), testResultNode);
      store.add(testResultNode, RDF('type'), ONTOLOGY('EthicsTestResult'));
      store.add(testResultNode, EARL('test'), ONTOLOGY(test.test_name.replace(/\s+/g, '')));
      const outcomeNode = blankNode();
      store.add(testResultNode, EARL('result'), outcomeNode);
      store.add(outcomeNode, RDF('type'), EARL('TestResult'));
      if (test.test_results.length === 0) {
        store.add(outcomeNode, EARL('outcome'), EARL("passed"));
      } else {
        test.test_results.forEach(term => {
          store.add(outcomeNode, EARL('outcome'), EARL("failed"));
          store.add(outcomeNode, ONTOLOGY('termFound'), literal(term));
        });
      }
    });
  
  }


}

export default jsonToRDF;
