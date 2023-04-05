import api from 'src/core/api';
import { SendMessage } from './types';

export async function postDM(puzzleId: number, param: SendMessage): Promise<SendMessage> {
  const { data } = await api({
    url: `/puzzle/${puzzleId}`,
    method: 'post',
    data: param,
  });
  return data;
}
