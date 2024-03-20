import { serialize } from 'rdflib';
import jsonToRDF from './createRDFgraph';

// Updated to return a promise
function provideRDFresults(json_data) {
    const store = jsonToRDF(json_data); // Your function to convert JSON to RDF
    const contentType = 'text/turtle';
    
    return new Promise((resolve, reject) => {
      serialize(undefined, store, undefined, contentType, (err, str) => {
        if (err) {
          console.error('Serialization error:', err);
          reject(err);
        } else {
          resolve(str);
        }
      });
    });
  }
  
  export default provideRDFresults;
