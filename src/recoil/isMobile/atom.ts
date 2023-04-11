import { atom } from 'recoil';

const key = `${Date.now()}.isMobile`;
const isMobile = atom<boolean>({
  key,
  default: true,
});

export default isMobile;
