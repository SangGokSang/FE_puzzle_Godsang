import api from 'src/core/api/api';
import { SendMessage } from './types';

export async function postDM(puzzleId: number, param: SendMessage): Promise<SendMessage> {
  const { data } = await api({
    url: `/api/puzzle/${puzzleId}`,
    method: 'post',
    data: param,
  });
  return data;
}