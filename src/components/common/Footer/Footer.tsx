import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: gray;
  opacity: 0.8;
`;

export default function Footer() {
  return <Wrapper>this is footer</Wrapper>;
}
