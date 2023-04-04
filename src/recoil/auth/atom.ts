import { atom } from 'recoil';
import { User } from './type';

export const authDefaultValue = {
  birthdate: 0,
  nickname: '',
  userId: null,
  isWithdrawUser: false,
};

const auth = atom<User>({
  key: `auth-key-${Date.now()}`,
  default: authDefaultValue,
});

export default auth;
