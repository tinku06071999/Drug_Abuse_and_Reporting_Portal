// src/api/anxietyTestApi.js
import api from './apiClient';

export const saveAnxietyTest = (data, config) =>
  api.post('/api/anxiety-tests', data, config);