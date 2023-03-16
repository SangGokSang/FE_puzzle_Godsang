import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const MessageCard = styled.div`
  width: 280px;
  height: 280px;
  background-color: #f0edf2;
  border: 1px solid #000000;
  border-radius: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RecipientField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 18px;
  color: #000000;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;

export const TextBodyField = styled.div`
  margin: 18px;
  width: 100%;
  display: flex;
`;

export const SenderField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: absolute;
  bottom: 18px;
  right: 18px;
  color: #000000;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;
