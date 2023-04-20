export type LoginPayload = {
  provider: string;
  providerId: string;
  nickname: string;
  email: string;
};

export type LoginResponse = {
  userId: number;
  nickname: string;
  birthdate: number;
  isWithdrawUser: boolean;
  accessToken: string;
  isSignUp: boolean;
};
