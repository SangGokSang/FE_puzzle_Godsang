import { atom } from 'recoil';
import { User } from './type';

const auth = atom<User>({
  key: `auth-key-${Date.now()}`,
  default: {
    birthdate: 0,
    nickname: '',
    isDeleted: false,
  },
});

export default auth;
