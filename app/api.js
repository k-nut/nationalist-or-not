import _ from "lodash";

export default function getPoliticians() {
    const query = `
SELECT distinct ?placeLabel ?image ?school ?foo

WHERE
{   
      { ?place wdt:P31 wd:Q3914 }
         UNION 
      { ?place wdt:P31 wd:Q40357 }
 
      ?place wdt:P18 ?image .
      ?place wdt:P31 ?buildingType
      BIND (?buildingType = wd:Q3914 AS ?school)
      SERVICE wikibase:label { bd:serviceParam wikibase:language "de, en" }
    }
LIMIT 200`;
    const url = `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${query}`;
    return window.fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn(`Looks like there was a problem. Status Code: ${response.status}`);
                    return;
                }
                return response.json().then(function (data) {
                    return _.sampleSize(data.results.bindings, 10);
                });
            }
        )
        .catch(function (err) {
            console.warn('Fetch Error :-S', err);
        });
}