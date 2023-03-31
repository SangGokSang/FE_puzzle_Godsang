import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Description = styled.pre`
  min-height: 35px;
  margin: 0;
  margin-top: 26px;
  color: #000000;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  white-space: pre-wrap;
`;

export const Container = styled.section`
  width: 100%;
  /* height: calc(100% - 20px); */

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export const Field = styled.div`
  width: 100%;
  margin-top: 12px;
  & .label {
    height: 22px;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
  }
`;

export const errorCss = css`
  margin-left: 12px;
  font-size: 11.5px;
  color: red;
`;

export const annotateCss = css`
  margin-top: 6px;
  margin-bottom: 30px;
  line-height: 20px;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: -0.002em;
  color: #727272;
`;
