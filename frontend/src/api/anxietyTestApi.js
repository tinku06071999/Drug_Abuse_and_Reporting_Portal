import api from './apiClient';
export const saveAnxietyTest = (payload) =>api.post('/anxiety-tests/save-test-report', payload);
export const getUserAllResult = () =>api.get('/anxiety-tests/get-all-results')

