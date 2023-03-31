export type UserReq = {
  nickname: string; // 길이 최소 1글자 최대 7글자 공백 안됨, 특수문자 안됨
  birthdate: number; //milliseconds
};
