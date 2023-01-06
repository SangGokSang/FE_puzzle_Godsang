import React, { ReactNode, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from '../Header';
import { useSetRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';
import isMobile from 'src/core/recoil/isMobile';

interface ILayout {
  children: ReactNode;
}

const Wrapper = styled.div`
  width: 768px;
  min-height: 100vh;
  margin: 0 auto;
  background: url('/assets/images/iphone-background.jpeg');

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Body = styled.main`
  width: 100%;
  height: calc(100vh - 160px);
  opacity: 0.8;
`;

export default function Layout({ children }: ILayout) {
  const isMobileSize = useMediaQuery({ minWidth: 768 });
  const setIsMobile = useSetRecoilState(isMobile);

  console.log('isMobileSize(MediaQuery)', isMobileSize);

  useEffect(() => {
    setIsMobile(isMobileSize);
  }, [isMobileSize]);
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
    </Wrapper>
  );
}
