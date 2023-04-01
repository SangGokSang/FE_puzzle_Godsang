import { atom } from 'recoil';
import { User } from './type';

const auth = atom<User>({
  key: 'auth',
  default: {
    birthdate: 0,
    nickname: '',
    isDeleted: false,
  },
});

export default auth;
