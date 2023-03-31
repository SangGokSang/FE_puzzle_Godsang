export type Provider = 'naver' | 'kakao' | 'google' | 'facebook';

export type LoginRequest = {
  providerId: string;
  provider: Provider;
  email: string;
  nickname: string;
};

export type Token = {
  accessToken: string;
};
