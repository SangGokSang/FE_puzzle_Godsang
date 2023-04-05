import Cookies from 'js-cookie';
import { PersistStorage } from 'recoil-persist';

const cookieStorage: PersistStorage = {
  setItem: (key: string, value: string) => {
    Cookies.set(key, value, {
      path: '/',
      domain: document.location.hostname,
      sameSite: 'Strict',
      secure: true,
    });
  },
  getItem: (key: string) => {
    return Cookies.get(key) || null;
  },
};

export default cookieStorage;
