import { atom } from 'recoil';

const isMobile = atom<boolean>({
  key: 'isMobile',
  default: true,
});

export default isMobile;
