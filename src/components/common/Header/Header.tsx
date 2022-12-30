import React from 'react';
import styled from '@emotion/styled';

interface IHeader {}

const Wrapper = styled.header`
  width: 100vw;
  height: 80px;
`;

export default function Header(props: IHeader) {
  return <Wrapper>this is header</Wrapper>;
}
