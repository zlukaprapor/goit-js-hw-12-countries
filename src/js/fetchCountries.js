import { alertSearchError } from './notification.js';

const RESOURCE_ENDPOINT = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountries(searchQuery) {
  return fetch(RESOURCE_ENDPOINT + searchQuery)
    .then(response => response.json())
    .catch(alertSearchError);
}
