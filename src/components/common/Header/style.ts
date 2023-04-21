import styled from '@emotion/styled';

export const Wrapper = styled.header`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AuthButton = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 50px;
  line-height: 20px;
  font-weight: 400;
  font-size: 13px;
  background: #ffffff;
  border: 1px solid #000000;
  color: #000;
  padding: 4px;
  cursor: pointer;
`;
