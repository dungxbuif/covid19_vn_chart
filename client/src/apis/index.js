import axios from 'axios';

export const getDetailVnLocal = () => axios.get('/api/detail-local-vn');

export const getReportByCountry = () => axios.get('/api/history');

export const getReportPerDay = () => axios.get('/api/history-per-day');

export const getVaccines = () => axios.get('/api/vaccine-details');

export const getMapDataByCountryId = (countryId) =>
   import(
      `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
   );
