import sampleSize from "lodash/sampleSize";
import {stringify} from 'query-string';
import createFetch from 'fetch-ponyfill';
const {fetch} = createFetch();

export default function getPoliticians() {
    const query = `
SELECT distinct ?personLabel ?partyLabel ?image ?nationalist 
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
    const endpoint = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'
    const url = endpoint + '?' + stringify({format: 'json', query});

    return fetch(url)
    .then(function (res) {
        if (!res.ok) {
            throw new Error(`Looks like there was a problem. Status Code: ${res.status}`);
        }
        return res.json();
    })
    .then(function (data) {
        return sampleSize(data.results.bindings, 10);
    });
}