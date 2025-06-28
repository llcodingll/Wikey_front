import axios from 'axios';

export interface SurveySubmitRequest {
  email: string;
  region: string;
  body: number;
  sweetness: number;
  smoky: number;
  fruity: number;
  floral: number;
}

export interface SurveyRecommendResponse {
  recommendedWhiskies: string[];
}

export interface SimilarUserCountResponse {
  similarUserCount: number;
  similarityThreshold: number;
}

export interface SimilarUsersResponse {
  similarUserCount: number;
  similarityThreshold: number;
}

// 설문 제출
export const submitSurvey = async (request: SurveySubmitRequest): Promise<SurveyRecommendResponse> => {
  const response = await axios.post('/api/survey/submit', request);
  return response.data;
};

// 최신 설문 결과 기반 추천
export const getLastRecommendation = async (): Promise<SurveyRecommendResponse> => {
  const response = await axios.get('/api/survey/result');
  return response.data;
};

// 사용자별 설문 결과 기반 추천
export const getRecommendationByUser = async (email: string): Promise<SurveyRecommendResponse> => {
  const response = await axios.get(`/api/survey/result/user?email=${email}`);
  return response.data;
};

// 유사한 사용자 기반 추천
export const getRecommendationBySimilarUsers = async (
  email: string, 
  maxRecommendations: number = 5
): Promise<SurveyRecommendResponse> => {
  const response = await axios.get(
    `/api/survey/result/similar-users?email=${email}&maxRecommendations=${maxRecommendations}`
  );
  return response.data;
};

// 유사한 사용자 수 조회
export const getSimilarUserCount = async (
  email: string, 
  similarityThreshold: number = 0.6
): Promise<SimilarUserCountResponse> => {
  const response = await axios.get(
    `/api/survey/similar-users/similar-count?email=${email}&similarityThreshold=${similarityThreshold}`
  );
  return response.data;
};

// 유사한 사용자 정보 조회
export const getSimilarUsers = async (
  email: string, 
  similarityThreshold: number = 0.6
): Promise<SimilarUsersResponse> => {
  const response = await axios.get(
    `/api/survey/similar-users/similar-users?email=${email}&similarityThreshold=${similarityThreshold}`
  );
  return response.data;
}; 