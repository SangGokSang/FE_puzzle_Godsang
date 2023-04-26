import api from 'src/core/api';
import { DeleteMessageRequset, SendMessageRequest } from './types';
import { Puzzles } from '../puzzles';

export async function postDM({ puzzleId, message }: SendMessageRequest): Promise<Puzzles> {
  const { data } = await api({
    url: `/puzzles/${puzzleId}`,
    method: 'post',
    data: message,
  });
  return data;
}

export async function deleteDM({ puzzleId, messageId }: DeleteMessageRequset): Promise<Puzzles> {
  const { data } = await api({
    url: `/puzzles/${puzzleId}/messages/${messageId}`,
    method: 'delete',
  });
  return data;
}
