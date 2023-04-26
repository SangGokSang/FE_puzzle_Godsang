import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import cookieStorage from 'src/core/lib/cookie-storage';
import { User } from './type';

export const authDefaultValue: User = {
  birthdate: 0,
  nickname: '',
  userId: null,
  isWithdrawUser: false,
  isSignUp: false,
  provider: '',
  email: '',
};

const { persistAtom } = recoilPersist({
  key: 'auth',
  storage: cookieStorage,
});

const auth = atom<User>({
  key: 'auth',
  default: authDefaultValue,
  effects: [persistAtom],
});

export default auth;
