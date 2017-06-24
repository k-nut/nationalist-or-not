import _ from "lodash";

export default function getPoliticians() {
    const query = `
SELECT distinct ?personLabel ?partyLabel ?image ?nationalist ?foo

WHERE
{
    values ?ideology {wd:Q189280  wd:Q852739} 
    ?party wdt:P1142 ?ideology;
    BIND (?ideology = wd:Q852739 AS ?nationalist)
    
    ?person wdt:P102 ?party .
    ?person wdt:P18 ?image .
    ?person wdt:P1412 wd:Q188 .
    OPTIONAL {
       ?person wdt:P570 ?dod
    }
    FILTER ( !bound(?dod) ) .
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