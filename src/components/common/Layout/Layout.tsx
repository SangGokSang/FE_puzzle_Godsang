import React, { ReactNode, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from '../Header';
import { useSetRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';
import isMobile from 'src/core/recoil/isMobile';
import Footer from '../Footer';

interface ILayout {
  children: ReactNode;
}

const Wrapper = styled.div`
  position: relative;
  width: 768px;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;
  padding-top: 5px;
  /* background: url('/assets/images/iphone-background.jpeg'); */
  background-color: #f8ede3;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-top: 15px;
  }
`;

const Body = styled.main`
  width: 80%;
  height: calc(100% - 80px);
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: calc(100% - 75px);
  }
`;

export default function Layout({ children }: ILayout) {
  const isMobileSize = useMediaQuery({ minWidth: 768 });
  const setIsMobile = useSetRecoilState(isMobile);

  useEffect(() => {
    setIsMobile(isMobileSize);
  }, [isMobileSize]);
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
      {/* <Footer /> */}
    </Wrapper>
  );
}
