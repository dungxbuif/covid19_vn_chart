import axios from './axiosClient';

export const getDetailVnLocal = () => axios.get('/api/detail-local-vn');

export const getReportByCountry = () => axios.get('/api/history');

export const getReportPerDay = () => axios.get('/api/history-per-day');

export const getVaccines = () => axios.get('/api/vaccine-details');
