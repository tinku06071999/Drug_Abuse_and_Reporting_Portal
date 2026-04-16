
import api from './apiClient';

export const saveAnxietyTest = (payload) =>api.post('/api/anxiety-tests/save-test-report', payload);
