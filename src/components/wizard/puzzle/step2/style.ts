import styled from '@emotion/styled';

export const CategorySection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Badge = styled.button<{ isPressed: boolean }>`
  padding: 8px 18px;
  height: 40px;
  border-radius: 6px;
  font-size: 15px;
  color: ${({ isPressed }) => (isPressed ? '#FFFFFF' : '#000000')};
  border: 1px solid ${({ isPressed }) => (isPressed ? '#000000' : '#cecece')};
  background: ${({ isPressed }) => (isPressed ? '#9148da' : '#ffffff')};
`;
