// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gallery-rpl-api.sinaukode.my.id/api',
});

export default api;
