import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

export const aiApi = {
  generateSummary: (lessonId) =>
    apiClient.post(API_ENDPOINTS.AI.SUMMARY(lessonId)),

  generateMCQs: (lessonId) =>
    apiClient.post(API_ENDPOINTS.AI.MCQS(lessonId)),

  generateQnA: (lessonId, question) =>
    apiClient.post(API_ENDPOINTS.AI.QNA(lessonId), { question }),
};
