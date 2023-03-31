import api from 'src/core/api/api';
import { KeyInfo } from './types';

export async function getKeyInfo(): Promise<KeyInfo> {
  const { data } = await api({
    url: `/user/key`,
    method: 'get',
  });
  return data;
}

export async function patchKey(puzzleId: number, messageId: number): Promise<KeyInfo> {
  const { data } = await api({
    url: `/puzzle/${puzzleId}/message/${messageId}`,
  });
  return data;
}
