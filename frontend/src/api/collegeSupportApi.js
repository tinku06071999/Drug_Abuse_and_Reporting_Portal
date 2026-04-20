import api from './apiClient';

export const saveStudentResponse = (payload) => api.post("/college-support/save-response",payload);
export const getAllResponses = () => api.get("/college-support/get-all-responses");