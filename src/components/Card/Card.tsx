import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

//height 는 반응형 고려해야함
const CardWrap = styled.div`
  width: 100%;
  padding: 10px 20px;
  height: 80px;
  font-size: 24px;
  font-weight: 500;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;

  @media screen and (max-width: 768px) {
    height: 50px;
    font-size: 14px;
  }
`;

type CardProps = {
  children: ReactNode;
  cardCss?: SerializedStyles;
};

function Card({ children, cardCss }: CardProps) {
  return <CardWrap css={cardCss}>{children}</CardWrap>;
}

export default Card;
