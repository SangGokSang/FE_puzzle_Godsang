import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const MessageCard = styled.form`
  width: 320px;
  height: 320px;
  background-color: #f0edf2;
  border: 1px solid #000000;
  border-radius: 6px;
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
`;

export const RecipientField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px;
  color: #000000;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  .to {
    background: none;
  }
`;

export const TextBodyField = styled.div`
  width: 100%;
  max-height: 260px;
  padding: 0 18px;
  display: flex;
  flex: 1;
  .content {
    background: none;
    width: 100%;
    height: 100%;
  }
`;

export const SenderField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  padding: 18px;
  color: #000000;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  .from {
    background: none;

    & .MuiInputBase-input {
      text-align: end;
    }
  }
`;

export const letterInterfaceCss = css`
  display: flex;
  gap: 10px;
`;
