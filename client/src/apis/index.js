import axios from 'axios';

export const getDetailVnLocal = () => axios.get('/api/detail-local-vn');

export const getReportByCountry = () => axios.get('/api/history');

export const getReportPerDay = () => axios.get('/api/history-per-day');

export const getProvineVaccineAllocate = () =>
   axios.get(
      'https://tiemchungcovid19.gov.vn/api/public/dashboard/vaccine-allocate/province-detail/reality'
   );

export const getProvineVaccineDetail = () =>
   axios.get(
      'https://tiemchungcovid19.gov.vn/api/public/dashboard/vaccination-statistics/all'
   );

export const getMapDataByCountryId = (countryId) =>
   import(
      `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
   );
