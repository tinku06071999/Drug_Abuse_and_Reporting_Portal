import api from './apiClient'

export const saveUserQuiz = (payload) => api.post("/user-quiz/save-quiz",payload);
export const getQuizResults = () => api.get("/user-quiz/get-quiz-result");
