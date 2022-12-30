import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Footer from '../Footer';
import Header from '../Header';

interface ILayout {
  children: ReactNode;
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Body = styled.main`
  width: 100vw;
  height: calc(100vh - 160px);
`;

export default function Layout({ children }: ILayout) {
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Wrapper>
  );
}
