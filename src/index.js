import './sass/main.scss';

const debounce = require('lodash.debounce');
import { defaultStack } from '@pnotify/core';

import countryListTemplate from './templates/country-list.hbs';
import countryInfoTemplate from './templates/country-info.hbs';

import getRefs from './js/refs.js';
import fetchCountries from './js/fetchCountries.js';
import {
  alertNoMatches,
  alertTooManyMatches,
  clearOutput,
} from './js/notification.js';
import { addSeparatorySpaces } from './js/utils.js';

const handleCountryData = data => {
  refs.outputLabel.classList.add('preloader-hidden');
  const queryFromCounryList = refs.output.querySelector('[data-query]');

  if (queryFromCounryList) {
    const countryListRef = [...refs.output.querySelectorAll('.country')];
    const index = countryListRef.findIndex(ref =>
      ref.hasAttribute('data-query'),
    );

    refs.input.value = countryListRef[index].textContent;

    renderCountryInfo([data[index]]);
    return;
  }

  if (data.length === 0) {
    refs.output.innerHTML = 'No countries found. Please try a proper query!';
    refs.output.classList.add('empty');
    return;
  }

  if (data.length > 10) {
    alertTooManyMatches();
    return;
  }

  refs.output.classList.remove('empty');

  if (data.length > 1) {
    renderCountryList(data);
    return;
  }

  renderCountryInfo(data);
  return;
};

const renderCountryInfo = data => {
  defaultStack.close();

  refs.output.innerHTML = countryInfoTemplate(...data);

  const populationDataRef = refs.output.querySelector('.js-population');
  populationDataRef.textContent = addSeparatorySpaces(
    populationDataRef.textContent,
  );
};

const renderCountryList = data => {
  defaultStack.close();

  refs.output.innerHTML = countryListTemplate(data);

  const countryInfoRef = refs.output.querySelector(
    '[data-value="country-list"]',
  );
  countryInfoRef.addEventListener('click', onCountryClick);
};

const onSearch = e => {
  const searchValue = e.target.value.trim();

  if (!searchValue) return;

  refs.outputLabel.classList.remove('preloader-hidden');

  fetchCountries(searchValue).then(handleCountryData).catch(alertNoMatches);
};

const onCountryClick = e => {
  const targetCountry = e.target;

  if (!targetCountry.classList.contains('country')) return;

  targetCountry.dataset.query = '';
  refs.input.dispatchEvent(new Event('input'));
};

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));
refs.input.addEventListener('focus', e => e.target.select());

clearOutput();
