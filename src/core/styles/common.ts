import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ButtonSection = styled.section`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
`;

export const buttonHoverCss = css`
  cursor: pointer;
`;

export const backButton = css`
  position: absolute;
`;

export const CustomLink = styled.a`
  width: max-content;
  background-color: transparent;
  border: none;
  color: #9148da;
  font-weight: 500;
  font-size: 13px;
  line-height: 28px;
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`;
