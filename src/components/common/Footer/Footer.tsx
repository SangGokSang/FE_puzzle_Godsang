import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface IFooter {}

const Wrapper = styled.footer`
  /* width: 100vw; */
  height: 80px;
`;

export default function Footer(props: IFooter) {
  return <Wrapper>this is footer</Wrapper>;
}
