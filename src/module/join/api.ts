import api from 'src/core/api';
import { UserReq } from './types';

export async function postJoin(param: UserReq) {
  const { data } = await api({
    url: '/user',
    method: 'patch',
    data: param,
  });
  return data;
}
