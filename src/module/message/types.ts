export type SendMessage = {
  from: string;
  to: string;
  content: string;
};

export type SendMessageRequest = {
  puzzleId: number;
  message: SendMessage;
};
