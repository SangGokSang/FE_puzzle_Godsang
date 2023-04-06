import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { AUTH_KEY } from 'src/core/api/auth';
import cookieStorage from 'src/core/lib/cookie-storage';
import { User } from './type';

export const authDefaultValue = {
  birthdate: 0,
  nickname: '',
  userId: null,
  isWithdrawUser: false,
};

const { persistAtom } = recoilPersist({
  key: AUTH_KEY,
  storage: cookieStorage,
});

const auth = atom<User>({
  key: AUTH_KEY,
  default: authDefaultValue,
  effects: [persistAtom],
});

export default auth;
