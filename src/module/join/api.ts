import api from 'src/core/api/api';
import { UserInfo } from './types';

export async function postJoin(param: UserInfo): Promise<UserInfo> {
  const { data } = await api({
    url: `/api/join`,
    method: 'post',
    data: param,
  });
  return data;
}
