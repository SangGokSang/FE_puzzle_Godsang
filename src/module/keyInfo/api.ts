import api from 'src/core/api';
import { KeyInfo } from './types';

export async function getKeyInfo(): Promise<KeyInfo> {
  const { data } = await api({
    url: `/user/key`,
    method: 'get',
  });
  return data;
}

// 메세지 읽기 위한 키 사용시
export async function patchKey(puzzleId: number, messageId: number): Promise<KeyInfo> {
  const { data } = await api({
    url: `/puzzle/${puzzleId}/message/${messageId}`,
  });
  return data;
}

export async function petchKey(): Promise<void> {
  await api({
    url: `/user/key`,
    method: 'patch',
  });
}
