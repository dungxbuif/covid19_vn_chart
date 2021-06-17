import axios from "axios";

export const getCountries = () => 
  axios.get('https://api.covid19api.com/countries');

export const getDetailVnLocal = () => 
  axios.get('/api/detail-local-vn');

export const getReportByCountry = (country) => 
  axios.get('/api/history');

export const getMapDataByCountryId = (countryId) =>
  import(
    `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
  );