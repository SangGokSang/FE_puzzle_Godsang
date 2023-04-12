import api from 'src/core/api';
import { SendMessageRequest } from './types';

export async function postDM({ puzzleId, message }: SendMessageRequest): Promise<void> {
  const { data } = await api({
    url: `/puzzles/${puzzleId}`,
    method: 'post',
    data: message,
  });
  return data;
}
