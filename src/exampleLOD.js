const exampleFileGroups = [
    {
      title: "Camden London Open Data",
      description: "LOD from Camden Borough in London from the data.gov.uk Open Data Portal.",
      files: [
        { name: "camden Street Crime", path: "/streetCrimeCamden.rdf" },
        { name: "Camden Food Hygiene", path: "/camdenFoodHygiene.rdf" },
        // Add more files as needed
      ],
    },
    {
      title: "Czech Republic Open Data",
      description: "LOD from the Czech Republic government found on the LOD cloud.",
      files: [
        { name: "Unemployment Rate", path: "/czso-unemployment-rate.rdf" },
        { name: "Unemployment Rate Ontology", path: "/czso-unemployment-rate-ontology.rdf" },
        { name: "Average Salaries", path: "/czso-average-salaries.rdf" },
        { name: "Average Salaries Ontology", path: "/czso-avg-salaries-ontology.rdf" }
        { name: "Deaths by Cause of Death", path: "/czso-deaths-by-cause.rdf" },
        { name: "Deaths by Cause of Death Ontology", path: "/czso-deaths-by-cause-ontology.rdf" }
        // Add more files as needed
      ],
    },
    // Add more groups as needed
  ];
export default exampleFileGroups;