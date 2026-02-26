import api from './apiClient';

export const saveStudentResponse = (payload) => api.post("/college_support/save_response",payload);
export const getAllResponses = () => api.get("/college_support/get_all_responses");