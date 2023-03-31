import api from 'src/core/api/api';
import { UserReq } from './types';

export async function postJoin(param: UserReq) {
  await api({
    url: '/user',
    method: 'patch',
    data: param,
  });
}
