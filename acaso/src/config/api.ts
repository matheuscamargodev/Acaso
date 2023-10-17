const API_BASE_URL = 'https://sua-api.com/api'; // Substitua pelo URL da sua API

export const API_URLS = {
  signup: `${API_BASE_URL}/auth/signup`,
  confirmSignUp: `${API_BASE_URL}/auth/v2/confirm-sign-up`,
  resendConfirmationCode: `${API_BASE_URL}/auth/resend-confirmation-code`,
  login: `${API_BASE_URL}/auth/v2/login`,
  refreshToken: `${API_BASE_URL}/auth/refresh-token`,
  userProfile: `${API_BASE_URL}/user/profile`,
} as const;